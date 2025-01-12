import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import { useTheme } from './ThemeContext';


const Dashboard = () => {
  const [user, setUser] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const {darkMode, toggleDarkMode} = useTheme();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent  = () =>{
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />
    }
  }

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
      <div>{user ? <h1>Welcome, {user.name}!</h1> : <p>Loading...</p>}</div>
      <button onClick={handleLogout}>logut</button>

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
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Dashboard
