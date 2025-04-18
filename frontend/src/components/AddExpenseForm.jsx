import React, { useState } from "react";

const AddExpenseForm = ({ addExpense, onCancel, categories }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Description is required";
    if (!amount) newErrors.amount = "Amount is required";
    else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!category) newErrors.category = "Category is required";
    if (!date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await addExpense({
        description: description.trim(),
        amount: parseFloat(amount),
        category,
        date: new Date(date),
      });

      // Reset form on success
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      setErrors({});
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="What did you spend on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`input ${
            errors.description ? "border-danger-500 dark:border-danger-500" : ""
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="label">
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">$</span>
          </div>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`input pl-8 ${
              errors.amount ? "border-danger-500 dark:border-danger-500" : ""
            }`}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {errors.amount}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`input ${
            errors.category ? "border-danger-500 dark:border-danger-500" : ""
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="label">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`input ${
            errors.date ? "border-danger-500 dark:border-danger-500" : ""
          }`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
            {errors.date}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
              Saving...
            </div>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
