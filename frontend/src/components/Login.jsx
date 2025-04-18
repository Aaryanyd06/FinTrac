import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import {
  login,
  googleLogin as googleLoginService,
} from "../services/authService";
import { motion } from "framer-motion";

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
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message || "Login failed");
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      await googleLoginService(credentialResponse.credential);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
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
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-5 text-white">
            <h1 className="text-2xl font-display font-bold text-center mb-1">
              Expense Tracker
            </h1>
            <p className="text-white/80 text-center text-sm">
              Manage your finances seamlessly
            </p>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white text-center mb-5">
              Welcome Back
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-danger-50 text-danger-700 dark:bg-danger-900 dark:text-danger-300 rounded-lg text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label htmlFor="email" className="label text-xs mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input py-2 text-sm placeholder:text-gray-400 placeholder:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="label text-xs mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input py-2 text-sm placeholder:text-gray-400 placeholder:text-sm"
                  required
                />
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xxs text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex justify-center items-center h-10 mt-2 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
              </motion.button>
            </form>

            <div className="mt-5">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
                <div className="px-3 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 z-10 mx-2">
                  or
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
              </div>

              <div className="mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  type="standard"
                  theme={darkMode ? "filled_black" : "outline"}
                  size="medium"
                  width="100%"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Don&apos;t have an account?{" "}
                <motion.button
                  onClick={() => navigate("/signup")}
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign Up
                </motion.button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
