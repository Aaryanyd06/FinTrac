import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Set up axios with auth headers
const axiosWithAuth = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during registration",
      }
    );
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};

// Get user profile
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axiosWithAuth(token).get(`/user`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axiosWithAuth(token).put(
      `/update-profile`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

// Change password
export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axiosWithAuth(token).post(
      `/change-password`,
      passwordData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to change password" };
  }
};

// Forgot password - request reset link
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to process forgot password request",
      }
    );
  }
};

// Reset password with token
export const resetPassword = async (resetData) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, resetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to reset password" };
  }
};

// Google Login
export const googleLogin = async (credential) => {
  try {
    const response = await axios.post(`${API_URL}/google-login`, {
      tokenId: credential,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Google login failed" };
  }
};
