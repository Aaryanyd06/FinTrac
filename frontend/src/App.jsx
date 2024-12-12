import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        

        <Route path='/dashboard' element = {
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>

        

      </Routes>
    </Router>
  );
}

export default App;
