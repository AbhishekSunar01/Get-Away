import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

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
  }, []);

  return (
    <div>
      <h1 className="mt-6 font-semibold text-xl">Bookings</h1>
      <div className="mt-4">
        {bookings.map((booking) => (
          <div className="w-full bg-gray-100 rounded-lg p-2" key={booking.id}>
            <h2>{booking.property.title}</h2>
            <p>Address: {booking.property.address}</p>
            <p>Check-in: {booking.checkIn}</p>
            <p>Check-out: {booking.checkOut}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
