'use client'
import React, { useState } from 'react';
import Register from '@/app/Components/Register'
import AdminLayout from '../Components/AdminLayout';
import AddLead from '@/app/Components/AddLead'
// import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[showRegister,setShowRegister]=useState(false);
  const [id,setId]=useState<Number>();
  // const router = useRouter();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checkData= await fetch('/api/login',{
      method:'Post',
      body:JSON.stringify({email,password}),
    })
    //Id that received from API
    const res=await checkData.json();
    const id=res.id;
    
    if(id){
      const id=res.id
      setId(res);
      
    }
    else{
      console.log('incorrect user name and pass');
      
    }

    
  };

  const handleRegister = () => {
    // Redirect to registration page or display registration form
    console.log('Register button clicked');
    setShowRegister(true);
  };
  

  return (
    !showRegister?(
      id ? <AddLead/>:
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
