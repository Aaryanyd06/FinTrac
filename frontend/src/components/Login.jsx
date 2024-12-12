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
      const res = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // Store JWT token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Invalid email or password");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/google", {
        tokenId: credentialResponse.credential,
      });
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
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default Login;
