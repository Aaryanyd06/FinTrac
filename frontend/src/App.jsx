import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.jsx";

function App() {
  const token = localStorage.getItem("token"); // Check for token availability

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
