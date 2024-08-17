import { useState, useEffect } from 'react';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchCurrentUser();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:3000/api/current-user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    }
  };

  return { isAuthenticated, currentUser };
};

export default useAuth;
