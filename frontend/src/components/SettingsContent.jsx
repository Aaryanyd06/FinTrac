import React, { useState } from "react";

const SettingsContent = ({ categories, addCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Expense Categories
        </h3>
        <ul className="space-y-2 mb-4">
          {categories.map((category) => (
            <li
              key={category}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-grow mr-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Account Settings
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Account and application settings coming soon!
        </p>
      </div>
    </div>
  );
};

export default SettingsContent;
