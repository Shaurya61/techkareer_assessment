import React from 'react';
import AuthForm from '../components/AuthForm';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const token = await response.text(); // Get token from response
        localStorage.setItem('token', token); // Store token in localStorage
        dispatch(login(token)); // Update Redux store
        navigate('/chat'); // Redirect to chat
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center">Login</h1>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      
    </div>
  );
};

export default Login;
