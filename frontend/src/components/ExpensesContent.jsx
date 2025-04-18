import React, { useState } from "react";

const ExpensesContent = ({
  expenses,
  deleteExpense,
  categories,
  openExpenseForm,
}) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure expenses is an array
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // First filter by category
  const categoryFiltered = safeExpenses.filter(
    (expense) => filter === "all" || expense.category === filter
  );

  // Then filter by search term
  const filteredExpenses = searchTerm
    ? categoryFiltered.filter(
        (expense) =>
          expense.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          expense.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categoryFiltered;

  // Sort the filtered expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === "date") return new Date(b.date) - new Date(a.date);
    if (sort === "amount") return b.amount - a.amount;
    if (sort === "category")
      return (a.category || "").localeCompare(b.category || "");
    if (sort === "description")
      return (a.description || "").localeCompare(b.description || "");
    return 0;
  });

  // Calculate total of filtered expenses
  const totalFilteredAmount = filteredExpenses.reduce(
    (total, expense) => total + (expense.amount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Expense Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track, filter and manage all your expenses
          </p>
        </div>
        <button
          onClick={openExpenseForm}
          className="btn btn-primary flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Expense
        </button>
      </div>

      {/* Summary card */}
      <div className="card bg-white dark:bg-gray-800 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              TOTAL {filter === "all" ? "EXPENSES" : filter.toUpperCase()}
            </h3>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">
              ${totalFilteredAmount.toFixed(2)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              NUMBER OF EXPENSES
            </h3>
            <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mt-1">
              {filteredExpenses.length}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              AVERAGE EXPENSE
            </h3>
            <p className="text-2xl font-bold text-accent-600 dark:text-accent-400 mt-1">
              $
              {filteredExpenses.length
                ? (totalFilteredAmount / filteredExpenses.length).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="w-full sm:w-40">
              <label htmlFor="filter" className="label">
                Category
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input py-2"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-40">
              <label htmlFor="sort" className="label">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input py-2"
              >
                <option value="date">Date (Newest)</option>
                <option value="amount">Amount (Highest)</option>
                <option value="category">Category (A-Z)</option>
                <option value="description">Description (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <label htmlFor="search" className="label">
              Search expenses
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search by description or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 py-2"
              />
            </div>
          </div>
        </div>

        {/* Expenses list */}
        {sortedExpenses.length === 0 ? (
          <div className="text-center py-12">
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
              No expenses found
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-1">
              Try changing your filters or add a new expense
            </p>
            <button onClick={openExpenseForm} className="btn btn-primary mt-4">
              Add Your First Expense
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedExpenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {expense.description || "No description"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {expense.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "No date"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${expense.amount?.toFixed(2) || "0.00"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteExpense(expense._id)}
                        className="text-danger-600 hover:text-danger-900 dark:text-danger-400 dark:hover:text-danger-300 transition-colors duration-200"
                        aria-label="Delete expense"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesContent;
