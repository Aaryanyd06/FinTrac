import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
  
  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <div>{user ? <h1>Welcome, {user.name}!</h1> : <p>Loading...</p>}</div>
      <button onClick={handleLogout}>logut</button>
    </div>
  );
}

export default Dashboard
