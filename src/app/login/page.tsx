"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Register from "@/app/Components/Register";
import AdminLayout from "../Components/AdminLayout";
import AddLead from "@/app/Components/AddLead";
import WebForm from "@/app/Components/AddLead";
import WrongCredentials from "../Components/WrongCredentials";
import { ToastContainer, toast } from 'react-toastify';
import { usePodioStore } from "../podioStore";
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [id, setId] = useState<Number>();
  
  const podioStore = usePodioStore(); // Use the store
  // console.log('pdio store in login page',podioStore);
  
  


  const showToast = () => {
   toast.error('Wrong email or password', {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    // style: {
    //   backgroundColor: '#ff6347',
    //   color: '#0d0c0e',
    //   height: '20px',
    //   fontSize: '16px',
    //   padding: '5px 10px',
    //   borderRadius: '8px',
    //   },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const checkData = await fetch(`/api/login?email=${email}`, {
      method: "Post",
      body: JSON.stringify({ email, password }),
    });
    podioStore.setEmail(email); // Set the email in the store
    podioStore.setIdentity(email);
    await console.log ('console emeail change',email);
    
 

    //If checkData exist 
    if(checkData.ok){
      console.log(podioStore,'podio storeeee.........................');
      
    //Id that received from API
    const res = await checkData.json();
    // console.log('res',res);
    
    const id = res.id;
    setId(id);
    }

    if (!id) {
      // showToast();
       alert("Checking UserName or Password")
      // return(
      //   <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
      //   <div className="bg-white shadow-lg rounded-lg p-6">
      //     <h2 className="text-xl font-semibold mb-4">Incorrect Username or Password</h2>
      //     <p className="text-gray-700">Please check your credentials and try again.</p>
      //   </div>
      // </div>
      // )
      // // toast.error('Incorrect email or password', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else {
      // setId(res);
      // Handle non-OK response statuses here
    console.error("Error:", checkData.status, checkData.statusText);
    }
  };

  const handleRegister = () => {
    // Redirect to registration page or display registration form
    console.log("Register button clicked");
    setShowRegister(true);
  };

  return !showRegister ? (
    id ? <WebForm /> : id === null ? <WrongCredentials /> : (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
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
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
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
                  Don't have an account?{" "}
                  <a
                    onClick={handleRegister}
                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Register now
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  ) : (
    <Register />
  );
};

export default Login;
