import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Profile() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const response = await axios.get("http://localhost:4000/api/profile", {
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        console.error("User error:", error);
      }
    } else {
      //console.log("No token cookie found.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
