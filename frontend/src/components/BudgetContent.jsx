import React, { useState, useEffect } from "react";

const BudgetContent = ({ budget, updateBudget, expenses }) => {
  const [newBudget, setNewBudget] = useState(budget);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

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

  // Calculate monthly average expenses
  const calculateMonthlyAverage = () => {
    if (expenses.length === 0) return 0;

    const dates = expenses
      .filter((exp) => exp.date)
      .map((exp) => new Date(exp.date));

    if (dates.length === 0) return totalExpenses;

    const oldestDate = new Date(Math.min(...dates));
    const today = new Date();
    const monthsDiff =
      (today.getFullYear() - oldestDate.getFullYear()) * 12 +
      (today.getMonth() - oldestDate.getMonth());

    return monthsDiff === 0 ? totalExpenses : totalExpenses / (monthsDiff + 1);
  };

  const monthlyAverage = calculateMonthlyAverage();

  // Calculate category breakdown
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount || 0;
    return acc;
  }, {});

  // Get top spending categories
  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

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
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Budget Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track, analyze and optimize your spending limits
          </p>
        </div>

        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-white dark:bg-gray-800 shadow text-primary-600 dark:text-primary-400"
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-white dark:bg-gray-800 shadow text-primary-600 dark:text-primary-400"
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main content */}
      {activeTab === "overview" ? (
        <div className="space-y-6">
          {/* Budget status card */}
          <div className="card bg-white dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  percentageUsed > 90
                    ? "bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-300"
                    : percentageUsed > 70
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300"
                }`}
              >
                {percentageUsed}% Used
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8 mt-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                  Budget Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      MONTHLY BUDGET
                    </span>
                    <span className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">
                      ${budget.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {remainingBudget < 0 ? "OVER BUDGET" : "REMAINING"}
                    </span>
                    <span
                      className={`text-3xl font-bold mt-1 ${
                        remainingBudget < 0
                          ? "text-danger-600 dark:text-danger-400"
                          : "text-accent-600 dark:text-accent-400"
                      }`}
                    >
                      ${Math.abs(remainingBudget).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      SPENT SO FAR
                    </span>
                    <span className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mt-1">
                      ${totalExpenses.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-none w-full md:w-64 flex flex-col justify-center">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                        Budget Usage
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold inline-block ${
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
                  </div>
                  <div className="relative h-4 overflow-hidden flex rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      style={{ width: `${percentageUsed}%` }}
                      className={`h-full rounded-full ${
                        percentageUsed > 90
                          ? "bg-danger-500"
                          : percentageUsed > 70
                          ? "bg-yellow-500"
                          : "bg-accent-500"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {remainingBudget < 0
                    ? `Over budget by $${Math.abs(remainingBudget).toFixed(2)}`
                    : `$${remainingBudget.toFixed(2)} remaining`}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {percentageUsed > 90
                  ? "Budget critically low"
                  : percentageUsed > 70
                  ? "Be mindful of additional expenses"
                  : "Budget on track"}
              </div>
            </div>
          </div>

          {/* Insights grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly average card */}
            <div className="card bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Monthly Insights
              </h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-600 dark:text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      AVG MONTHLY
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      ${monthlyAverage.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary-600 dark:text-secondary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      DAILY RATE
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      ${(monthlyAverage / 30).toFixed(2)}/day
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-900 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-accent-600 dark:text-accent-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      BUDGET USED
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {percentageUsed}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top spending categories */}
            <div className="card bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Top Categories
              </h3>

              {topCategories.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No expense data
                </div>
              ) : (
                <ul className="space-y-4">
                  {topCategories.map(([category, amount], index) => {
                    const percentage = (amount / totalExpenses) * 100;
                    return (
                      <li key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {category}
                          </span>
                          <div className="text-right">
                            <span className="font-bold text-gray-900 dark:text-white block">
                              ${amount.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
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
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Budget Tips */}
          <div className="card bg-white dark:bg-gray-800 border-l-4 border-primary-500">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Budget Tips
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Set realistic spending limits</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Review and adjust regularly</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Use categories for tracking</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>50/30/20: needs, wants, savings</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Update Budget */}
          <div className="card bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              Update Your Budget
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-danger-50 text-danger-700 dark:bg-danger-900 dark:text-danger-300 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="newBudget" className="label">
                  Monthly Budget Amount
                </label>
                <div className="relative mt-1">
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
                  Set your monthly spending limit to track your expenses
                  against.
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

          {/* Budget Planning Guide */}
          <div className="card bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Budget Planning
            </h3>
            <div className="space-y-5">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Setting a realistic budget
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Analyze income, track expenses, allow for necessities and
                  savings.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Recommended allocation
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      Essentials (housing, food)
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      50-60%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      Discretionary
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      20-30%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      Savings/debt
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      20%
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Tips
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                  <li>Track expenses regularly</li>
                  <li>Set category spending limits</li>
                  <li>Review performance monthly</li>
                  <li>Adjust as needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetContent;
