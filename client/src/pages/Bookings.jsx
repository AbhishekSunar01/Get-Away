import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../util/UserContext";
import { Link } from "react-router-dom";
import BookingComponent from "../components/BookingComponent";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(UserContext);

  const handleDelete = (bookingId) => {
    axios
      .delete(`booking/delete`, { data: { bookingId: bookingId } })
      .then(() => {
        toast.success("Booking deleted");
        setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetching of bookings
      })
      .catch((error) => {
        toast.error("Failed to delete booking");
        console.error(error);
      });
  };

  const initiatePayment = async (
    purchase_order_id,
    purchase_order_name,
    amount
  ) => {
    try {
      const response = await axios.post("/khalti", {
        purchase_order_id,
        purchase_order_name,
        amount,
      });
      console.log(response.data);
      console.log(response.data.data.payment_url);
      window.location.href = response.data.data.payment_url;
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  const handlePopup = () => {
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("booking")
      .then((response) => {
        const bookings = response.data;
        return Promise.all(
          bookings.map((booking) =>
            axios.get(`property/${booking.propertyId}`).then((response) => ({
              ...booking,
              property: response.data,
            }))
          )
        );
      })
      .then((bookingsWithProperty) => {
        const futureBookings = bookingsWithProperty.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          const today = new Date();
          return checkInDate >= today;
        });
        setBookings(futureBookings);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, refresh]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container text-center mt-20 text-3xl font-bold w-fit flex mx-auto border border-gray-300 py-20 px-12 rounded-xl shadow-lg flex-col text-white">
        <div className="">Please login to view your bookings 🔒</div>
        <Link to="/login" className="text-lg text-accent underline">
          Login
        </Link>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container text-center mt-20 text-3xl font-bold w-fit flex mx-auto border border-gray-300 py-20 px-12 rounded-xl shadow-lg flex-col text-white">
        <div className="">You have no bookings</div>
        <Link to="/" className="text-lg text-accent underline">
          Book a property
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mt-6 font-semibold text-3xl">Bookings</h1>
      <div className="mt-4 flex flex-col gap-10">
        {bookings.map((booking) => (
          <BookingComponent
            handlePopup={handlePopup}
            handleDelete={handleDelete}
            initiatePayment={initiatePayment}
            booking={booking}
            key={booking.id}
          />
        ))}
      </div>
    </div>
  );
}
