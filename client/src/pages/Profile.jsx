import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../util/UserContext";
import { Link, NavLink } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("property/myproperties", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setProperties(response.data);
      } else {
        console.error("Failed to fetch properties:", response.data);
      }
    } catch (error) {
      console.error("Network error during fetchProperties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="my-10">
      {user && (
        <div className="flex flex-col gap-2 text-3xl font-semibold mb-3">
          Hello {user.name} 👋
        </div>
      )}

      <div className="mb-4 font-medium text-xl">
        {properties.length === 0 && (
          <p>
            You have not added any property 🏠 listings yet.{" "}
            <Link to="/addPlace" className="text-primary underline ">
              Add a new property
            </Link>
          </p>
        )}
        {properties.length > 0 && (
          <p>You have {properties.length} property 🏠 listings.</p>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {properties.map((property) => (
          <NavLink
            to={`/updatePlace/${property.id}`}
            key={property.id}
            className="flex border border-gray-200 rounded-3xl bg-background hover:shadow-lg transition duration-300 ease-in-out h-[220px]"
          >
            <img
              src={property.Image[0].url}
              alt={property.name}
              className="w-[350px] h-full object-cover rounded-l-xl"
            />

            <div className="mt-2 ml-6 py-4">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-500 line-clamp-6 text-justify pr-4">
                {property.description}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
