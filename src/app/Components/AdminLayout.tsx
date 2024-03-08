// src/components/AdminLayout.tsx

import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <ul className="mt-4">
            {/* Sidebar Links */}
            <li className="mb-2">
              <a href='/register' className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded">
                Register
              </a>
            </li>
            <li className="mb-2">
              <a href='/login' className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded">
                Login
              </a>
            </li>
            <li className="mb-2">
              <a href='/dashboard' className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded">
                Properties
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded">
                Leads
              </a>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Page Header */}
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>

        {/* Page Content */}
        <div className="p-4">
          {/* Display Children Components */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
