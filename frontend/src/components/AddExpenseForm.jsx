import React from "react";
import { useState } from "react";

const AddExpenseForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");



  return (
    <form>
      <h2>Add New Expense</h2>

      <label htmlFor="">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="">Amount</label>
      <input type="text"
      id="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      />

      <label htmlFor="">Category</label>
      <input type="text" />

      <button type="submit">Add Expense</button>  


    </form>
  );
};

export default AddExpenseForm;
