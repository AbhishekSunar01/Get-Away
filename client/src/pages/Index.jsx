import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import React from "react";

export default function Index() {
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
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <div className="mt-20 w-full">
          {user && (
            <div>
              <h1 className="text-4xl">Hello {user.name} wellcomeback</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
