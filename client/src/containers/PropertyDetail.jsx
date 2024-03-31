import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HeaderDetails,
  ImageDetails,
  ExtraInfo,
} from "../components/propertyDetails/index";
import { Link } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const propertyId = property?.id;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Failed to fetch property", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="container text-center mt-20 text-3xl font-bold w-fit flex mx-auto border border-gray-300 py-20 px-12 rounded-xl shadow-lg flex-col text-white">
        <div className="">Please login to see property details 🔒</div>
        <Link to="/login" className="text-lg text-accent underline">
          Login
        </Link>
      </div>
    );
  }

  const bookPlace = async () => {
    if (!checkIn || !checkOut) {
      console.error("Check-in and check-out dates are required");
      toast.error("Check-in and check-out dates are required");
      return;
    }

    if (!propertyId) {
      console.error("Property ID is not available");
      return;
    }

    // Convert checkIn and checkOut to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Calculate the difference in time between checkOut and checkIn in milliseconds
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();

    // Convert the time difference to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Calculate the total price
    const totalPrice = diffDays * property.price;

    const checkInDateTime = `${checkIn}T00:00:00Z`;
    const checkOutDateTime = `${checkOut}T00:00:00Z`;

    try {
      const response = await axios.post(`/booking/add/${propertyId}`, {
        checkIn: checkInDateTime,
        checkOut: checkOutDateTime,
      });

      console.log(response.data);
      toast.success("Property booked successfully");
    } catch (error) {
      console.error(error);
      toast.error("Login to book this property.");
    }
  };

  return (
    <div className="mt-14 flex flex-col gap-7">
      <HeaderDetails property={property} />

      <ImageDetails property={property} />

      <div className="flex w-full justify-between h-[330px]">
        <div className="w-[52%] overflow-y-auto scrollbar-hide py-5 px-4">
          <h1 className="font-semibold text-2xl mb-2">Description</h1>
          <p>{property.description}</p>
        </div>

        <div className="w-[45%] shadow-lg bg-background font-semibold rounded-2xl py-5 px-4 flex flex-col gap-4">
          <h1 className=" text-xl text-center">
            Price: Rs{property.price} per night
          </h1>

          <div className="flex flex-col gap-2">
            <label>Check In:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <button className="primary" onClick={bookPlace}>
            Book this place
          </button>
        </div>
      </div>

      <ExtraInfo property={property} />
    </div>
  );
}
