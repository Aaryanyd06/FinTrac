import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signin`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token); // Store JWT token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Invalid email or password");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/google`,
        {
          tokenId: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Google Sign-In failed:",
        error.response?.data || error.message
      );
      alert("Google Sign-In was unsuccessful. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please log in to your account
        </p>
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600 text-sm">Don&apos;t have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline text-sm"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <span className="absolute bg-white px-4 text-gray-500 text-sm">
              OR
            </span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition text-center"
            >
              Sign in with Google
            </GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
