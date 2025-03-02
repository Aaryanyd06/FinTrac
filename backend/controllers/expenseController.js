import Expense from "../models/Expense.js";
import User from "../models/User.js";
import Category from "../models/category.js";

// Default categories to be added when a user is created or on first category fetch
const defaultCategories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Housing",
  "Healthcare",
  "Other",
];

// Create Expense
export const createExpense = async (req, res) => {
  const { category, amount, description, date } = req.body;

  try {
    const expense = new Expense({
      userId: req.user.id,
      category,
      amount,
      description,
      date: date || Date.now(),
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Expenses
export const GetAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Budget
export const updateBudget = async (req, res) => {
  try {
    const { budget } = req.body;
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { budget },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Budget updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Budget
export const getBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ budget: user.budget });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add Category
export const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await Category.findOne({
      userId: req.user.id,
      name,
    });
    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    const category = new Category({
      userId: req.user.id,
      name,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Categories (with default categories if none exist)
export const getCategories = async (req, res) => {
  try {
    let categories = await Category.find({ userId: req.user.id });

    // If no categories exist for the user, populate with default categories
    if (categories.length === 0) {
      const defaultCategoryPromises = defaultCategories.map((name) =>
        new Category({ userId: req.user.id, name }).save()
      );
      categories = await Promise.all(defaultCategoryPromises);
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Expecting MongoDB _id
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Ensure user owns the category
      { name },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Expecting MongoDB _id

    const category = await Category.findOneAndDelete({
      _id: id,
      userId: req.user.id, // Ensure user owns the category
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Update expenses that used this category to "Other"
    await Expense.updateMany(
      { userId: req.user.id, category: category.name },
      { category: "Other" }
    );

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: error.message });
  }
};