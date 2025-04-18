import React, { useState, useEffect } from "react";
import "./settingsStyles.css";
import PasswordChange from "./PasswordChange";

const SettingsContent = ({
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("categories");
  const [theme, setTheme] = useState("primary");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme and dark mode settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "primary";
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    setTheme(savedTheme);
    setIsDarkMode(savedDarkMode);

    // Apply dark mode class to body based on saved setting
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply theme class to body
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleUpdate = (e, categoryId) => {
    e.preventDefault();
    if (newCategory.trim() && editingCategory) {
      updateCategory(categoryId, newCategory.trim());
      setEditingCategory(null);
      setNewCategory("");
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Theme configuration
  const themes = [
    { id: "primary", color: "bg-primary-500", ring: "ring-primary-500" },
    { id: "purple", color: "bg-purple-500", ring: "ring-purple-500" },
    { id: "green", color: "bg-green-500", ring: "ring-green-500" },
    { id: "red", color: "bg-red-500", ring: "ring-red-500" },
    { id: "yellow", color: "bg-yellow-500", ring: "ring-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your app preferences and categories
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("categories")}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === "categories"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("appearance")}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === "appearance"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === "security"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === "notifications"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "categories" && (
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Expense Categories
            </h2>
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {safeCategories.length} Categories
            </span>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="input pr-10"
                  disabled={editingCategory !== null}
                />
                {newCategory && (
                  <button
                    type="button"
                    onClick={() => setNewCategory("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary h-full"
                disabled={editingCategory !== null || !newCategory.trim()}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add
              </button>
            </div>
          </form>

          {/* Categories List */}
          {safeCategories.length === 0 ? (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No categories found
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-1">
                Add your first category to get started
              </p>
            </div>
          ) : (
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {safeCategories.map((category) => (
                  <li
                    key={category._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                  >
                    {editingCategory === category._id ? (
                      <form
                        onSubmit={(e) => handleUpdate(e, category._id)}
                        className="flex items-center p-4"
                      >
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="input mr-2 flex-grow"
                          autoFocus
                        />
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            className="btn btn-sm btn-accent"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategory(null);
                              setNewCategory("");
                            }}
                            className="btn btn-sm btn-outline"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex justify-between items-center p-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                          <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {category.name || "Unnamed"}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCategory(category._id);
                              setNewCategory(category.name || "");
                            }}
                            className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-1"
                            aria-label="Edit category"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteCategory(category._id)}
                            className="text-gray-500 hover:text-danger-600 dark:text-gray-400 dark:hover:text-danger-400 p-1"
                            aria-label="Delete category"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Info Box */}
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
                  Categories help you organize and track your expenses more
                  effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="card bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
            Appearance Settings
          </h2>

          <div className="space-y-6">
            <div className="settings-section">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Theme
              </span>
              <div className="theme-buttons">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`theme-button ${
                      theme === themeOption.id ? "active" : ""
                    } ${themeOption.color}`}
                    aria-label={`Set ${themeOption.id} theme`}
                  ></button>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select your preferred accent color
              </p>
            </div>

            <div className="settings-section py-4 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enable dark mode for the application
                  </p>
                </div>
                <div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-message bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
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
                    Your appearance settings are saved automatically and will be
                    applied each time you visit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          <PasswordChange />
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="card bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
            Notification Settings
          </h2>

          <div className="space-y-6">
            <div className="settings-section flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget Alerts
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Get notified when you're close to your budget limit
                </p>
              </div>
              <div className="opacity-50">
                <label className="toggle-switch">
                  <input type="checkbox" disabled />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="settings-section flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Weekly Reports
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Receive weekly summary of your spending
                </p>
              </div>
              <div className="opacity-50">
                <label className="toggle-switch">
                  <input type="checkbox" disabled />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="settings-message mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Notification settings will be available in a future update.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsContent;
