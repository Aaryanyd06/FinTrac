import React, { useState } from "react";

const BudgetContent = ({ budget, updateBudget, expenses }) => {
  const [newBudget, setNewBudget] = useState(budget);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingBudget = budget - totalExpenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(parseFloat(newBudget));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Budget
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Current Budget
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            ${budget.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Remaining Budget
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            ${remainingBudget.toFixed(2)}
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="newBudget"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Set New Budget
          </label>
          <input
            type="number"
            id="newBudget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter new budget"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Update Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetContent;
