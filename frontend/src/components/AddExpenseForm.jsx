import React, { useState } from "react";

const AddExpenseForm = ({ addExpense, closeForm, categories }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      alert("Please fill in all fields");
      return;
    }
    addExpense({
      description,
      amount: parseFloat(amount),
      category, // Send the category name as a string
    });
    setDescription("");
    setAmount("");
    setCategory("");
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Add New Expense
      </h2>
      <div>
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          id="description"
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={closeForm}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
