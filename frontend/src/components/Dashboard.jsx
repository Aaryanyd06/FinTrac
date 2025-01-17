import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ExpensesContent from "./ExpensesContent";
import BudgetContent from "./BudgetContent";
import ReportsContent from "./ReportsContent";
import SettingsContent from "./SettingsContent";
import AddExpenseForm from "./AddExpenseForm";
import { useTheme } from "./ThemeContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Other",
  ]);
  const [budget, setBudget] = useState(1000);
  const { darkMode, toggleDarkMode } = useTheme();

useEffect(() => {
  fetchExpenses();
  const savedBudget = JSON.parse(localStorage.getItem("budget")) || budget;
  setBudget(savedBudget);
}, []);

const fetchExpenses = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/expense/GetAllExpense`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    setExpenses(data);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};


  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || categories;
    const savedBudget = JSON.parse(localStorage.getItem("budget")) || budget;
    setExpenses(savedExpenses);
    setCategories(savedCategories);
    setBudget(savedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


 const addExpense = async (expense) => {
   try {
    const token = localStorage.getItem("token");
     const response = await fetch(`http://localhost:5000/api/expense/createExpense`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(expense),
     });
     setExpenses([...expenses, newExpense]);
     setIsExpenseFormOpen(false);
   } catch (error) {
     console.error("Error adding expense:", error);
   }
 };


 
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const updateBudget = (newBudget) => {
    setBudget(newBudget)
  }

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
          <SettingsContent categories={categories} addCategory={addCategory} />
        );
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:5000/api/getUser",
          config
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    }
    fetchUser();

  },[])
  
  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
              <button
                onClick={toggleDarkMode}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {darkMode ? (
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {/* {user.name} */}
                </span>
              </div>
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
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
    </div>
  );
}

export default Dashboard
