import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../util/UserContext";
import { Link } from "react-router-dom";
import BookingComponent from "../components/BookingComponent";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
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
        setBookings(bookingsWithProperty);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
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
    <div>
      <h1 className="mt-6 font-semibold text-3xl">Bookings</h1>
      <div className="mt-4 flex flex-col gap-8">
        {bookings.map((booking) => (
          <BookingComponent booking={booking} key={booking.id} />
        ))}
      </div>
    </div>
  );
}
