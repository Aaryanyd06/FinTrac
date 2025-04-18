import React, { useState, useEffect } from "react";

const BudgetContent = ({ budget, updateBudget, expenses }) => {
  const [newBudget, setNewBudget] = useState(budget);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // Update the local state when the `budget` prop changes
  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  const remainingBudget = budget - totalExpenses;
  const percentageUsed =
    Math.min(100, Math.round((totalExpenses / budget) * 100)) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetValue = parseFloat(newBudget);

    if (isNaN(budgetValue) || budgetValue <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }

    setIsUpdating(true);
    setError("");

    try {
      await updateBudget(budgetValue);
    } catch (error) {
      setError("Failed to update budget");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Budget Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track and manage your spending limits
        </p>
      </div>

      {/* Budget Overview */}
      <div className="card bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Budget Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-800 rounded-lg p-6">
            <h3 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
              Current Budget
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-300">
              ${budget.toFixed(2)}
            </p>
          </div>

          <div
            className={`bg-gradient-to-r rounded-lg p-6 ${
              remainingBudget < 0
                ? "from-danger-100 to-danger-50 dark:from-danger-900 dark:to-danger-800"
                : "from-accent-100 to-accent-50 dark:from-accent-900 dark:to-accent-800"
            }`}
          >
            <h3
              className={`font-medium mb-2 ${
                remainingBudget < 0
                  ? "text-danger-800 dark:text-danger-200"
                  : "text-accent-800 dark:text-accent-200"
              }`}
            >
              {remainingBudget < 0 ? "Budget Exceeded" : "Remaining Budget"}
            </h3>
            <p
              className={`text-3xl font-bold ${
                remainingBudget < 0
                  ? "text-danger-600 dark:text-danger-300"
                  : "text-accent-600 dark:text-accent-300"
              }`}
            >
              ${Math.abs(remainingBudget).toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-r from-secondary-100 to-secondary-50 dark:from-secondary-900 dark:to-secondary-800 rounded-lg p-6">
            <h3 className="font-medium text-secondary-800 dark:text-secondary-200 mb-2">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-300">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Budget Usage
            </span>
            <span
              className={`text-sm font-medium ${
                percentageUsed > 90
                  ? "text-danger-600 dark:text-danger-400"
                  : percentageUsed > 70
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-accent-600 dark:text-accent-400"
              }`}
            >
              {percentageUsed}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${
                percentageUsed > 90
                  ? "bg-danger-500"
                  : percentageUsed > 70
                  ? "bg-yellow-500"
                  : "bg-accent-500"
              }`}
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Update Budget */}
      <div className="card bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Update Your Budget
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-danger-50 text-danger-700 dark:bg-danger-900 dark:text-danger-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="newBudget" className="label">
              Monthly Budget Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400">$</span>
              </div>
              <input
                type="number"
                id="newBudget"
                value={newBudget}
                onChange={(e) => {
                  setNewBudget(e.target.value);
                  setError("");
                }}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="input pl-8"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Set your monthly spending limit to track your expenses against.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center">
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
                  Updating...
                </div>
              ) : (
                "Update Budget"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Budget Tips */}
      <div className="card bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Budgeting Tips
        </h2>
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-accent-500 mr-2">•</span>
            <span>
              Set realistic monthly spending limits based on your income
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-500 mr-2">•</span>
            <span>
              Review and adjust your budget regularly to match your needs
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-500 mr-2">•</span>
            <span>
              Break down your budget into categories for better tracking
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-500 mr-2">•</span>
            <span>
              Consider using the 50/30/20 rule: 50% for needs, 30% for wants,
              20% for savings
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetContent;
