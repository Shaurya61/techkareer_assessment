import React, { useEffect, useState } from 'react';
import UserSearch from './UserSearch';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../store/chatSlice';

interface User {
  id: number;
  name: string;
  email: string;
}

const ChatList: React.FC = () => {
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const dispatch = useDispatch();

  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/fetchAllUsers`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserSelect = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="w-96 flex flex-col">
      <div>
        <UserSearch />
        <div className='flex gap-4 w-full mt-4'>
          <span className='rounded-md border p-2'>All</span>
          <span className='rounded-md border p-2'>Unread</span>
          <span className='rounded-md border p-2'>Archived</span>
          <span className='rounded-md border p-2'>Blocked</span>
        </div>
      </div>
      <div className='mt-4'>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          users.map((user) => (
            <div 
              key={user.id} 
              className={`flex gap-4 items-center border-b p-2 cursor-pointer ${selectedUserId === user.id ? 'bg-blue-100' : ''}`} 
              onClick={() => handleUserSelect(user)}
            >
              <div className='rounded-full p-4 bg-gray-300'>
                <span className='text-gray-700'>{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold'>{user.name}</span>
                <span className='text-gray-500'>{user.email}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
