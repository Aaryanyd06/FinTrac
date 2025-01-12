import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from './components/ThemeContext.jsx';
import Dashboard from './components/Dashboard.jsx';

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </StrictMode>
 
);
