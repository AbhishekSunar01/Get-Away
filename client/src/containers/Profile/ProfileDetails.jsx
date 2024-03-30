import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../util/UserContext";

export default function ProfileDetails() {
  const { user } = useContext(UserContext);

  const logout = async () => {
    try {
      const response = await axios.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Cookies.remove("token");
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };

  return (
    <div className="my-10 bg-black">
      <h1 className="text-3xl mb-3 ">Profile</h1>
      {user && (
        <div className="flex flex-col gap-2 text-2xl mb-3">
          <h2>
            {user.id}. {user.name}
          </h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button className="text-white py-2 px-4 rounded-md" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
