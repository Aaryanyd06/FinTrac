import React, { useState } from "react";

const SettingsContent = ({
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

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

  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Expense Categories
        </h3>
        {safeCategories.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No categories found.
          </p>
        ) : (
          <ul className="space-y-2 mb-4">
            {safeCategories.map((category) => (
              <li
                key={category._id}
                className="bg-gray-100 dark:bg-gray-700 p-3 rounded flex justify-between items-center"
              >
                {editingCategory === category._id ? (
                  <form
                    onSubmit={(e) => handleUpdate(e, category._id)}
                    className="flex w-full"
                  >
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-grow mr-2 p-1 border rounded dark:bg-gray-600 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCategory(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="text-gray-700 dark:text-gray-300">
                      {category.name || "Unnamed"}
                    </span>
                    <div>
                      <button
                        onClick={() => {
                          setEditingCategory(category._id);
                          setNewCategory(category.name || "");
                        }}
                        className="text-blue-500 hover:text-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-grow mr-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            disabled={editingCategory !== null}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={editingCategory !== null}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsContent;
