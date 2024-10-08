// src/components/AuthForm.tsx
import React, { useState } from 'react';

interface SignupFormProps {
  onSubmit: (name:string,email: string, password: string) => void;
  buttonText: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, buttonText }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name,email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SignupForm;
