import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const createUser = () => {
  //   axios
  //     .post("http://localhost:4000/api/user/register", {
  //       name: userName,
  //       email: email,
  //       password: password,
  //     })
  //     .then(console.log("User has been created"));
  // };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("user/register", {
        name: userName,
        email: email,
        password: password,
      });
      console.log("User has been created");
      alert("User has been created");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        alert(error.response.data.error);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        alert.log("Error", error.message);
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
