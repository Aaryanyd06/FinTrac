import React, { useState } from "react";

const ExpensesContent = ({ expenses, deleteExpense, categories }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");

  // Ensure expenses is an array
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const filteredExpenses = safeExpenses.filter(
    (expense) => filter === "all" || expense.category === filter
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === "date") return new Date(b.date) - new Date(a.date);
    if (sort === "amount") return b.amount - a.amount;
    return 0;
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Expenses
      </h2>
      <div className="flex justify-between mb-4">
        <div>
          <label
            htmlFor="filter"
            className="mr-2 text-gray-700 dark:text-gray-300"
          >
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-1 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sort"
            className="mr-2 text-gray-700 dark:text-gray-300"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded p-1 dark:bg-gray-700 dark:text-white"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      {sortedExpenses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No expenses found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedExpenses.map((expense) => (
            <li
              key={expense._id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {expense.description || "No description"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {expense.category || "Uncategorized"} -{" "}
                  {expense.date
                    ? new Date(expense.date).toLocaleDateString()
                    : "No date"}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white mr-4">
                  ${expense.amount?.toFixed(2) || "0.00"}
                </span>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesContent;
