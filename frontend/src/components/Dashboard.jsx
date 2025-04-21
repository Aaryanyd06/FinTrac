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
import { getUserProfile } from "../services/authService";
import GitHubStarNavButton from "./GitHubStarNavButton";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-vercel-app.vercel.app/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
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

      // Use the auth service to get user data
      const userData = await getUserProfile();
      setUser(userData);

      // Get budget data
      const config = { headers: { Authorization: `Bearer ${token}` } };
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
      await axios.delete(
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
      await axios.delete(
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
      await axios.put(
        `${API_BASE_URL}/expense/updateBudget`,
        { budget: newBudget },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudget(newBudget);
      toast.success("Budget updated successfully");
    } catch (error) {
      toast.error("Failed to update budget");
      console.error("Error updating budget:", error.message);
    }
  };

  const renderContent = () => {
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
            openExpenseForm={() => setIsExpenseFormOpen(true)}
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
        return <Profile user={user} />;
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
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div className="flex flex-col flex-1 overflow-hidden md:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white capitalize ml-8 md:ml-0">
                {activeItem}
              </h1>
              <GitHubStarNavButton className="hidden md:flex" />
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
                  Welcome, {user.name || user.email}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-outline text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Add Expense Modal */}
      {isExpenseFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Add New Expense
              </h2>
              <button
                onClick={() => setIsExpenseFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <AddExpenseForm
              addExpense={addExpense}
              categories={categories}
              onCancel={() => setIsExpenseFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this {showDeleteDialog.type}? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setShowDeleteDialog({ show: false, type: null, id: null })
                }
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={
                  showDeleteDialog.type === "expense"
                    ? confirmDeleteExpense
                    : confirmDeleteCategory
                }
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
