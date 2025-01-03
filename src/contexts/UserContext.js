// Task_Management_System/src/contexts/UserContext.js

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5001/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentUser(response.data);

        const usersResponse = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
