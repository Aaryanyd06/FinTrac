import React from "react";
import { useTheme } from "./ThemeContext.jsx";

const SidebarIcon = ({ icon, text, isOpen, isActive, onClick }) => (
  <li className="mb-2">
    <button
      onClick={onClick}
      className={`flex items-center w-full py-3 px-4 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-primary-500 text-white"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400"
      }`}
    >
      <span className={`text-xl mr-4 ${isActive ? "text-white" : ""}`}>
        {icon}
      </span>
      {isOpen && (
        <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
          {text}
        </span>
      )}
    </button>
  </li>
);

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  const items = [
    { id: "dashboard", icon: "📊", text: "Dashboard" },
    { id: "expenses", icon: "💰", text: "Expenses" },
    { id: "budget", icon: "📅", text: "Budget" },
    { id: "reports", icon: "📈", text: "Reports" },
    { id: "settings", icon: "⚙️", text: "Settings" },
    { id: "profile", icon: "👤", text: "Profile" },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out h-screen overflow-hidden ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and app name */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Expense Tracker
            </h1>
          ) : (
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              💲
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-4 mt-6 overflow-y-auto">
          <ul className="space-y-1">
            {items.map((item) => (
              <SidebarIcon
                key={item.id}
                icon={item.icon}
                text={item.text}
                isOpen={isOpen}
                isActive={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
              />
            ))}
          </ul>
        </nav>

        {/* Theme toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center w-full py-2 px-4 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400`}
          >
            <span className="text-xl mr-4">{darkMode ? "🌙" : "☀️"}</span>
            {isOpen && (
              <span className="text-sm font-medium">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
