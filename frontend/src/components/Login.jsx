import {useState} from 'react'
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'

const Login = () =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    
    const handleGoogleSuccess = async (response) => {
      try {
        const res = await axios.post("http://localhost:5000/api/google", {
          tokenId: response.tokenId,
        });
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    const handleGoogleFailure = (error) => {
      console.error("Google Sign In was unsuccessful. Try again later", error);
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

        <GoogleLogin
          clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    );
}

export default Login