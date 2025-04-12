import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-vercel-app.vercel.app/api";

const Profile = ({ user, fetchUser }) => {
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.put(
        `${API_BASE_URL}/updateProfile`,
        { name, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUser();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Avatar URL
          </label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
