'use client';
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/user", {
          withCredentials: true
        });
        console.log("User Provider Running  "+res.data.user);
        if (res.data.user) {
          console.log("User found in context: ", res.data.user);
          setUser(res.data.user);
        }
      } catch (error) {
        console.log("User not logged in");
      }
      setLoading(false);
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};