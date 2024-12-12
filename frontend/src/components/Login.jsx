import {useState} from 'react'
import axios from 'axios'
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/signin", {
              email,
              password,
            });
            console.log(res.data);
        } catch (error) {
            console.error(error.response.data);
        }
    }
    
  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/google", {
        tokenId: credentialResponse.credential,
      });
      localStorage.setItem("token", data.token); // Store the token in localStorage
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error(
        "Error authenticating with Google:",
        error.response?.data || error.message
      );
      alert("Google Sign-In was unsuccessful. Please try again.");
    }
  };
    const handleError = () => {
      console.error("Google Sign-In failed. Please try again.");
    };

    return (
      <div>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    );
}

export default Login