import React, { useState } from "react";
import PropTypes from "prop-types";
import { changePassword } from "../services/authService";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordStrength < 3) {
      setError("Password is not strong enough");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);
    } catch (err) {
      setError(err.message || "Failed to change password");
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="card bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Password Settings
      </h2>

      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Protect your account with a strong password that includes a mix of
          letters, numbers, and symbols. Regular password changes help maintain
          your account's security.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="settings-section py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
          Change Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input pr-10 w-full"
                placeholder="Enter current password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="input pr-10 w-full"
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Password strength meter */}
            {newPassword && (
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
                      /[A-Z]/.test(newPassword) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">
                      {/[A-Z]/.test(newPassword) ? "✓" : "•"}
                    </span>
                    Uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /[a-z]/.test(newPassword) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">
                      {/[a-z]/.test(newPassword) ? "✓" : "•"}
                    </span>
                    Lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /\d/.test(newPassword) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">
                      {/\d/.test(newPassword) ? "✓" : "•"}
                    </span>
                    Number
                  </li>
                  <li
                    className={`flex items-center ${
                      /[^A-Za-z0-9]/.test(newPassword) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">
                      {/[^A-Za-z0-9]/.test(newPassword) ? "✓" : "•"}
                    </span>
                    Special character
                  </li>
                  <li
                    className={`flex items-center ${
                      newPassword.length >= 8 ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">
                      {newPassword.length >= 8 ? "✓" : "•"}
                    </span>
                    At least 8 characters
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input pr-10 w-full ${
                  confirmPassword && confirmPassword !== newPassword
                    ? "border-red-500 dark:border-red-500"
                    : ""
                }`}
                placeholder="Confirm new password"
              />
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                passwordStrength < 3
              }
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              For security reasons, you'll be asked to log in again after
              changing your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PasswordChange.propTypes = {
  // Remove the onPasswordChange prop since we're using the service directly
};

export default PasswordChange;
