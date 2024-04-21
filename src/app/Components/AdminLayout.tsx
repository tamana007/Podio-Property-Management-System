// src/components/AdminLayout.tsx

import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import '@/app/customeToast.css';
import Head from 'next/head';

interface AdminLayoutProps {
  children: ReactNode;
}
declare global {
  interface Window {
    google: any;
  }
}

// Your component code here


const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyByebbhLZ-w8EcqWuTozv1Dys-fLC0zEU0&libraries=places`}
          async
          defer
        ></script>
      </Head>
    <div className=" flex" >
      {/* Sidebar */}
      <div className="w-64 bg-teal-800 text-white ">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <ul className="mt-4">
            {/* Sidebar Links */}
            <li className="mb-2">
              <a href='/register' className="block py-2 px-4 bg-teal-700 hover:bg-teal-600 rounded">
                Register
              </a>
            </li>
            <li className="mb-2">
              <a href='/login' className="block py-2 px-4 bg-teal-700 hover:bg-teal-600 rounded">
                Login
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 bg-teal-700 hover:bg-teal-600 rounded">
                Add Lead
              </a>
            </li>
            <li className="mb-2">
              <a href='./dashboard' className="block py-2 px-4 bg-teal-700 hover:bg-teal-600 rounded">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 bg-teal-700 hover:bg-teal-600 rounded">
                Properties
              </a>
            </li>
           
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen flex-1 overflow-y-auto bg-gray-200">

        {/* Page Header */}
        <div className="bg-teal-800 p-4 ">
          <h2 className="text-xl font-semibold text-white">TEXAS PROPMOVER LLC LEADS</h2>
        </div>

        {/* Page Content */}
        <div>
          {/* Display Children Components */}
          {children}
        </div>
      </div>
      {/* <ToastContainer /> */}
      <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{
            background: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px', // Add border radius for rounded corners
            padding: '8px 16px', // Adjust padding to reduce height
            fontSize: '10px', // Adjust font size
          }}
        />
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
