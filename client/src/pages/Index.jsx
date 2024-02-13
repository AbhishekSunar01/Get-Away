import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import React from "react";

export default function Index() {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      // Make a request to the logout route

      const response = await axios.post(
        "/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Check the response status and act accordingly
      if (response.status === 200) {
        // Logout successful, remove the access token cookie
        Cookies.remove("token");

        // Redirect the user to the login page
        window.location.href = "/login";
      } else {
        // Handle other response statuses if necessary
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Network error during logout:", error);
    }
  };

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
      <div className="w-full  flex items-center justify-center">
        <div className="mt-20 w-full">
          {user && (
            <div>
              <h1 className="text-4xl">Hello {user.name} wellcomeback</h1>
            </div>
          )}

          <button className="text-white py-2 px-4 rounded-md" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
