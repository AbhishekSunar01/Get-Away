// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext({ user: null, setUser: () => {} });

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({ user: null });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Fetch user data when the component mounts
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/profile", {
        withCredentials: true,
      });
      setUser({ user: response.data });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user: user.user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
