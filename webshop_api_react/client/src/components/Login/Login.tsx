import React, { useState } from 'react';

function Login ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Wrong email or password');
      }

      const data = await response.json();
      console.log('Login successful', data);
    } catch (Error) {
      
      console.error('Error logging in:', Error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 px-3 py-2 w-full rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-300 px-3 py-2 w-full rounded"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
