import { NavLink } from "react-router-dom";
import logo from "/icons/getaway-logo.png";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="md:px-48 px-[20px] border-b shadow-sm py-6 flex justify-between items-center">
      <NavLink to="/" className="flex items-center gap-1  ">
        <img src={logo} className="w-8 mr-2" alt="" />
        <span className="font-bold text-2xl  text-primary">Getaway</span>
      </NavLink>

      <div className="flex font-semibold border gap-3 text-sm pl-5 items-center rounded-full border-gray-300 py-2 px-2 shadow-sm shadow-gray-300 trasition duration-300 ease-in-out hover:shadow-lg">
        <div>Bookings</div>
        <div className="border-l h-5 border-gray-300"></div>
        <NavLink to="/addPlace">Add Place</NavLink>
        <div className="border-l h-5 border-gray-300"></div>
        <div>Search</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <div className="flex border gap-2 items-center rounded-full border-gray-300 py-2 px-4 shadow-sm shadow-gray-300 trasition duration-300 ease-in-out hover:shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <NavLink to="/login" className="flex items-center gap-2">
          <div className="bg-gray-600 text-white rounded-full border border-gray-600 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {user && <div>{user.name}</div>}
        </NavLink>
      </div>
    </div>
  );
}
