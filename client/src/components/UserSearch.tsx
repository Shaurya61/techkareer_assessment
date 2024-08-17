// src/components/UserSearch.tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserSearch: React.FC = () => {
  const token = localStorage.getItem('token');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim() === '') return;
  
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await fetch(`http://localhost:3000/api/search?query=${query}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          // Attempt to read the error message from the response
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
  
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users.'); // Set error state
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [query, token]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by name"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b border-gray-200">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
