import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:5000/api/getUser",
          config
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    }
    fetchUser();

  },[])
  

  return <div>{user ? <h1>Welcome, {user.name}!</h1> : <p>Loading...</p>}</div>;
}

export default Dashboard
