import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../util/UserContext";
import { Link } from "react-router-dom";

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
        <div className="">Please login to view your bookings</div>
        <Link to="/login" className="text-lg text-accent underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-6 font-semibold text-xl">Bookings</h1>
      <div className="mt-4 flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            className="w-full flex gap-4 bg-gray-100 shadow-sm rounded-xl overflow-hidden "
            key={booking.id}
          >
            <img
              src={booking.property.Image[0].url}
              alt={booking.property.title}
              className="w-48 rounded-l-md"
            />
            <div className="py-2 flex flex-col h-full items-start justify-center my-auto">
              <h2 className="text-xl text-primary font-semibold">
                {booking.property.title}
              </h2>
              <div className="leading-tight">
                <p>Address: {booking.property.address}</p>
                <p>
                  Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                </p>
                <p>
                  Check-out: {new Date(booking.checkOut).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
