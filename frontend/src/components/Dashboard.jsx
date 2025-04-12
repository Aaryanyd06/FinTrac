//dashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ExpensesContent from "./ExpensesContent";
import BudgetContent from "./BudgetContent";
import ReportsContent from "./ReportsContent";
import SettingsContent from "./SettingsContent";
import AddExpenseForm from "./AddExpenseForm";
import Profile from "./ProfileContent";
import { useTheme } from "./ThemeContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-vercel-app.vercel.app/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    show: false,
    type: null,
    id: null,
  });
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    fetchUserAndBudget();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.get(
        `${API_BASE_URL}/expense/getAllExpense`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch expenses");
      console.error("Error fetching expenses:", error.message);
      setExpenses([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${API_BASE_URL}/expense/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", error.message);
      setCategories([]);
    }
  };

  const fetchUserAndBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const userResponse = await axios.get(`${API_BASE_URL}/getUser`, config);
      setUser(userResponse.data);
      const budgetResponse = await axios.get(
        `${API_BASE_URL}/expense/getBudget`,
        config
      );
      setBudget(budgetResponse.data.budget || 1000);
    } catch (error) {
      toast.error("Failed to fetch user or budget");
      console.error("Error fetching user or budget:", error.message);
    }
  };

  const addExpense = async (expense) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.post(
        `${API_BASE_URL}/expense/createExpense`,
        expense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses((prev) => [...prev, response.data]);
      setIsExpenseFormOpen(false);
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error("Failed to add expense");
      console.error("Error adding expense:", error.message);
    }
  };

  const confirmDeleteExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const response = await axios.delete(
        `${API_BASE_URL}/expense/deleteExpense/${showDeleteDialog.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== showDeleteDialog.id)
      );
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error(
        "Error deleting expense:",
        error.response?.data || error.message
      );
    } finally {
      setShowDeleteDialog({ show: false, type: null, id: null });
    }
  };

  const deleteExpense = (id) => {
    setShowDeleteDialog({ show: true, type: "expense", id: id });
  };

  const confirmDeleteCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const response = await axios.delete(
        `${API_BASE_URL}/expense/deleteCategory/${showDeleteDialog.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== showDeleteDialog.id)
      );
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
    } finally {
      setShowDeleteDialog({ show: false, type: null, id: null });
    }
  };

  const deleteCategory = (id) => {
    setShowDeleteDialog({ show: true, type: "category", id: id });
  };

  const addCategory = async (category) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.post(
        `${API_BASE_URL}/expense/categories`,
        { name: category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) => [...prev, response.data]);
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("Failed to add category");
      console.error("Error adding category:", error.message);
    }
  };

  const updateCategory = async (id, newName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.put(
        `${API_BASE_URL}/expense/updateCategory/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? response.data : cat))
      );
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
      console.error("Error updating category:", error.message);
    }
  };

  const updateBudget = async (newBudget) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.put(
        `${API_BASE_URL}/expense/updateBudget`,
        { budget: newBudget },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudget(response.data.updatedUser.budget);
      toast.success("Budget updated successfully");
    } catch (error) {
      toast.error("Failed to update budget");
      console.error("Error updating budget:", error.message);
    }
  };

  const renderContent = () => {
    console.log(
      "Rendering content with expenses:",
      expenses,
      "categories:",
      categories
    );
    switch (activeItem) {
      case "dashboard":
        return (
          <DashboardContent
            expenses={expenses}
            openExpenseForm={() => setIsExpenseFormOpen(true)}
            budget={budget}
          />
        );
      case "expenses":
        return (
          <ExpensesContent
            expenses={expenses}
            deleteExpense={deleteExpense}
            categories={categories}
          />
        );
      case "budget":
        return (
          <BudgetContent
            budget={budget}
            updateBudget={updateBudget}
            expenses={expenses}
          />
        );
      case "reports":
        return <ReportsContent expenses={expenses} />;
      case "settings":
        return (
          <SettingsContent
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
        );
      case "profile":
        return <Profile user={user} fetchUser={fetchUserAndBudget} />;
      default:
        return (
          <DashboardContent
            expenses={expenses}
            openExpenseForm={() => setIsExpenseFormOpen(true)}
            budget={budget}
          />
        );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.info("Logged out successfully");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Expense Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="text-gray-500">
                {darkMode ? "☀️" : "🌙"}
              </button>
              <div className="flex items-center space-x-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-lg">👤</span>{" "}
                    {/* Default profile icon */}
                  </div>
                )}
                <span className="text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>

      {/* Expense Form Modal */}
      {isExpenseFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
            <AddExpenseForm
              addExpense={addExpense}
              closeForm={() => setIsExpenseFormOpen(false)}
              categories={categories}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this {showDeleteDialog.type}? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setShowDeleteDialog({ show: false, type: null, id: null })
                }
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={
                  showDeleteDialog.type === "expense"
                    ? confirmDeleteExpense
                    : confirmDeleteCategory
                }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Dashboard;
