import React from "react";

const DashboardContent = ({ expenses, openExpenseForm, budget }) => {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingBudget = budget - totalExpenses;

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <button
          onClick={openExpenseForm}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Add Expense
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            ${totalExpenses.toFixed(2)}
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
            Budget
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            ${budget.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
