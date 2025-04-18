import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTokenValid, setIsTokenValid] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally verify token validity when component mounts
    // You could make an API call to check if the token is valid
    // This is just a placeholder for that functionality
    if (!token) {
      setIsTokenValid(false);
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains number
    if (/\d/.test(password)) strength += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength < 3) {
      setError("Password is not strong enough");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await resetPassword({ token, password });

      // Store token if it's returned
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      setSuccess(true);
      toast.success("Password reset successful!");

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      setError(error.message || "Server error. Please try again later.");
      toast.error("Password reset failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <div className="text-red-600 dark:text-red-400 text-xl mb-4">
            Invalid Password Reset Link
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The password reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Please create a new secure password for your account.
          </p>
        </div>

        {success ? (
          <div className="mt-8">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    Your password has been changed successfully! Redirecting to
                    dashboard...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md p-4 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Server error
                  </h3>
                  <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 input w-full"
              />

              {/* Password strength meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Password strength:</span>
                    <span>
                      {passwordStrength <= 1
                        ? "Weak"
                        : passwordStrength <= 3
                        ? "Medium"
                        : "Strong"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength * 20}%` }}
                    ></div>
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <li
                      className={`flex items-center ${
                        /[A-Z]/.test(password) ? "text-green-500" : ""
                      }`}
                    >
                      <span className="mr-1">
                        {/[A-Z]/.test(password) ? "✓" : "•"}
                      </span>
                      Uppercase letter
                    </li>
                    <li
                      className={`flex items-center ${
                        /[a-z]/.test(password) ? "text-green-500" : ""
                      }`}
                    >
                      <span className="mr-1">
                        {/[a-z]/.test(password) ? "✓" : "•"}
                      </span>
                      Lowercase letter
                    </li>
                    <li
                      className={`flex items-center ${
                        /\d/.test(password) ? "text-green-500" : ""
                      }`}
                    >
                      <span className="mr-1">
                        {/\d/.test(password) ? "✓" : "•"}
                      </span>
                      Number
                    </li>
                    <li
                      className={`flex items-center ${
                        /[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""
                      }`}
                    >
                      <span className="mr-1">
                        {/[^A-Za-z0-9]/.test(password) ? "✓" : "•"}
                      </span>
                      Special character
                    </li>
                    <li
                      className={`flex items-center ${
                        password.length >= 8 ? "text-green-500" : ""
                      }`}
                    >
                      <span className="mr-1">
                        {password.length >= 8 ? "✓" : "•"}
                      </span>
                      At least 8 characters
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 input w-full"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Processing...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>

            <div className="text-center text-sm mt-4">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
              >
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
