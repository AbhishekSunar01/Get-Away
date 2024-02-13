import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("user/register", {
        name: userName,
        email: email,
        password: password,
      });
      console.log("User has been created");
      toast.success("Registered Succesfully!");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex grow mt-12 items-center justify-around flex-col md:px-[280px] px-[100px]">
        <h1 className="text-4xl text-center pt-8 pb-5">Register</h1>
        <form className="w-full mx-auto" onSubmit={createUser}>
          <input
            type="text"
            placeholder={"your name"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder={"your@email.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="primary bg-primary hover:bg-purple-700">
            Sign Up
          </button>
          <div className="text-center mt-4 text-gray-500">
            Already have an account ?{" "}
            <NavLink to="/login" className="text-black underline">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
