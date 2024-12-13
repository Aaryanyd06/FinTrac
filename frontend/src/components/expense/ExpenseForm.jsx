import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(form);
    setForm({ category: "", amount: "", description: "", date: "" });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
