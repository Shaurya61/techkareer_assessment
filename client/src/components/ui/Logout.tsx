import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    dispatch(logout()); // Update Redux store
    navigate('/login'); // Redirect to login
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
