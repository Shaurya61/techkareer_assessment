// src/pages/Signup.tsx
import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
  const handleSignup = async (name:string,email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        body: JSON.stringify({name, email, password }),
      });
      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert('Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center">Signup</h1>
      <SignupForm onSubmit={handleSignup} buttonText="Sign Up" />
    </div>
  );
};

export default Signup;
