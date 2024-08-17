import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * Component that protects routes based on authentication status.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Components to render if authenticated.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
