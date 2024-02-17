import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../util/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Import useNavigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false); // Add redirect state
  const { setUser } = useContext(UserContext);

  if (Cookies.get("token")) {
    return <Navigate to="/profile" />; // Redirect to home page
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUser({
        name: response.data.name,
      });
      // toast.success("Logged In Succesfully!");
      Cookies.set("token", response.data.token);
      navigate("/"); // Set redirect to true after successful login
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />; // Redirect to home page after successful login
  }
  return (
    <div className="flex grow mt-12 items-center justify-around flex-col md:px-[280px] px-[100px]">
      <h1 className="text-4xl text-center pt-8 pb-5">Login!</h1>
      <form className="w-full mx-auto" onSubmit={login}>
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
        <button className="primary hover:bg-green-500">Sign in</button>
        <div className="text-center mt-4 text-gray-500">
          Create an account.{" "}
          <Link to="/register" className="text-primary underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
