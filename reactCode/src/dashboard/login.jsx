import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password
      });

      // Save token to localStorage (or sessionStorage)
      localStorage.setItem('token', response.data.token);

      // Trigger login
      onLogin();

      // Redirect to the home page
      navigate('/home');
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="bg-slate-100 items-center h-screen flex justify-center m-auto">
      <div className="max-w-sm rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-md" src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2411.jpg" alt="Login" />
        <div className="p-5">
          <form className="max-w-sm mx-auto py-8 rounded-md shadow-md px-4 bg-gray-800" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input 
                type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                placeholder="Masukan username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input 
                type="password" 
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w/full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                placeholder="Masukan password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="text-white bg-green-500 px-3 py-2 mt-2 w-full rounded-sm hover:bg-green-800">Login</button>

            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
