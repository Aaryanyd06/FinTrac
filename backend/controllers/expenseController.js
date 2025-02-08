import Expense from "../models/Expense.js";

export const createExpense = async(req, res) =>{
    const {category, amount, description, date} = req.body;

    try {
        const expense = new Expense({
            userId: req.user.id,
            category,
            amount,
            description,
            date
        })
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const GetAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); // Fetch expenses for the authenticated user
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {...req.body},
            {new: true}
        )

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting expense with ID:", id); // Log the ID
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      console.log("Expense not found"); // Log if expense is not found
      return res.status(404).json({ message: "Expense not found" });
    }

    console.log("Expense deleted successfully:", deletedExpense); // Log the deleted expense
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};


import User from "../models/User.js";

console.log("User model:", User); // Log the User model to verify it's imported correctly

export const updateBudget = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body
    console.log("User ID:", req.user.id); // Log the user ID

    const { budget } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { budget },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated user:", updatedUser); // Log the updated user
    res
      .status(200)
      .json({ message: "Budget updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: error.message });
  }
};