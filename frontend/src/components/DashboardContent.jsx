import React from "react";

const DashboardContent = ({ expenses, openExpenseForm, budget }) => {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  const remainingBudget = budget - totalExpenses;
  const budgetPercentage =
    Math.min(100, Math.round((totalExpenses / budget) * 100)) || 0;

  // Calculate category totals
  const categoryTotals = expenses.reduce((totals, expense) => {
    if (expense.category) {
      totals[expense.category] =
        (totals[expense.category] || 0) + (expense.amount || 0);
    }
    return totals;
  }, {});

  // Format top categories
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your expenses and budget at a glance
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
          Add Expense
        </button>
      </div>

      {/* Budget summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">
              Total Expenses
            </h3>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {budgetPercentage}% Used
            </span>
          </div>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            ${totalExpenses.toFixed(2)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${
                budgetPercentage > 90
                  ? "bg-danger-500"
                  : budgetPercentage > 70
                  ? "bg-yellow-500"
                  : "bg-primary-600"
              }`}
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="card bg-white dark:bg-gray-800">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Remaining Budget
          </h3>
          <p
            className={`text-3xl font-bold ${
              remainingBudget < 0
                ? "text-danger-600 dark:text-danger-400"
                : "text-accent-600 dark:text-accent-400"
            }`}
          >
            ${remainingBudget.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {remainingBudget < 0
              ? "You have exceeded your budget"
              : "Budget remaining for this period"}
          </p>
        </div>

        <div className="card bg-white dark:bg-gray-800">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Budget
          </h3>
          <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
            ${budget.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your monthly spending limit
          </p>
        </div>
      </div>

      {/* Two column layout for recent expenses and top categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent expenses */}
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Expenses
          </h3>
          {recentExpenses.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentExpenses.map((expense) => (
                <li
                  key={expense._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {expense.description || "No description"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {expense.category || "Uncategorized"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString()
                          : "No date"}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${expense.amount?.toFixed(2) || "0.00"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
              No expenses recorded yet.
            </p>
          )}
          {expenses.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setActiveItem("expenses")}
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                View all expenses
              </button>
            </div>
          )}
        </div>

        {/* Top spending categories */}
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Top Spending Categories
          </h3>
          {topCategories.length > 0 ? (
            <ul className="space-y-4">
              {topCategories.map(([category, amount], index) => (
                <li key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "bg-primary-500"
                          : index === 1
                          ? "bg-secondary-500"
                          : "bg-accent-500"
                      }`}
                      style={{ width: `${(amount / totalExpenses) * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
              No expense categories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
