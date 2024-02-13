import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex grow mt-12 items-center justify-around flex-col md:px-[280px] px-[100px]">
      <h1 className="text-4xl text-center pt-8 pb-5">Login!</h1>
      <form className="w-full mx-auto">
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
