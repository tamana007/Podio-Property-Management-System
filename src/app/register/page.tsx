// components/RegistrationForm.tsx
'use client'
import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send registration data to server-side API route
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        // Registration successful
        console.log('Registration successful!');
      } else {
        // Registration failed
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

