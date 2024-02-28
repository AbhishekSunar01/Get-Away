import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../util/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  if (Cookies.get("token")) {
    return <Navigate to="/profile" />;
  }

  const validateEmail = () => {
    if (!email) {
      setEmailError("Please enter your email.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter your password.");
      return false;
    }
    return true;
  };

  const login = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

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
      setUser({
        name: response.data.name,
      });
      Cookies.set("token", response.data.token);
      navigate("/");
      window.location.reload();
    } catch (error) {
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
    return <Navigate to="/" />;
  }
  return (
    <div className="flex grow mt-12 items-center justify-around flex-col md:mx-[25%] px-5">
      <h1 className="text-4xl text-center pt-8 pb-5">Login!</h1>
      <form className="w-full mx-auto" onSubmit={login}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder={"your@email.com"}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>

        <div className="mb-2">
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>

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
