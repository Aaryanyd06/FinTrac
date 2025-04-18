import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signin`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");

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
      setError("Google Sign-In was unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="card bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
            <h1 className="text-3xl font-display font-bold text-center mb-2">
              Expense Tracker
            </h1>
            <p className="text-white/80 text-center">
              Manage your finances seamlessly
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-display font-semibold text-gray-800 dark:text-white text-center mb-6">
              Welcome Back
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-danger-50 text-danger-700 dark:bg-danger-900 dark:text-danger-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
                <div className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 z-10">
                  OR CONTINUE WITH
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
              </div>

              <div className="mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  type="standard"
                  theme={darkMode ? "filled_black" : "outline"}
                  size="large"
                  width="100%"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
