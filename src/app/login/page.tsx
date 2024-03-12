'use client'
import React, { useState } from 'react';
import Register from '@/app/Components/Register'
import AdminLayout from '../Components/AdminLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[showRegister,setShowRegister]=useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const formData=new FormData();
    // formData.append('email',email);
    // formData.append('password',password);
    
    // Send Email and password to backend
    const checkData= await fetch('/api/login',{
      method:'Post',
      body:JSON.stringify({email,password}),
    })
    if(checkData){
      console.log('sent successfuly');
      

    }

    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    // Redirect to registration page or display registration form
    console.log('Register button clicked');
    setShowRegister(true);
  };

  return (
    !showRegister?(
      <AdminLayout>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <a onClick={handleRegister} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Register now
            </a>
          </p>
        </div>
        </form>
      </div>
    </div>
    </AdminLayout>
     ):(
      <Register/>
     )
  );
};

export default Login;
