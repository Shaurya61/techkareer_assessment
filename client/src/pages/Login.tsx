import React from 'react';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    // console.log('Email to be sent:', email); // Should log the correct email
    // console.log('Password to be sent:', password); // Should log the correct password
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Ensure correct fields are sent
      });
  
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        dispatch(login(token));
        navigate('/chat');
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
      <LoginForm onSubmit={handleLogin} buttonText="Login" />
    </div>
  );
};

export default Login;
