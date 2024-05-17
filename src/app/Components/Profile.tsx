// pages/profile.tsx
'use client'
import React from 'react';
import { NextPage } from 'next';
import AdminLayout from './AdminLayout';
import { FiBell, FiUser } from 'react-icons/fi'; 
import { usePodioStore } from '../podioStore';

const ProfilePage: NextPage = () => {
  const {identity}=usePodioStore();
  const {userName}=usePodioStore()
  return (
    <div>
      <AdminLayout>
      <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        {/* Notification and User Icons */}
        
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6">
        <div className="flex items-center">
          {/* Notification Icon */}
          <div className="mr-6">
            <FiBell className=" text-teal-500  cursor-pointer" />
          </div>
          {/* User Icon */}
          <div>
            <FiUser className=" text-teal-500  cursor-pointer" />
          </div>
        </div>
          <div className="text-center text-black">
            <p>img goes here</p>
            <img
              src="/user-avatar.png" // Replace with user's profile picture URL
              alt="User Avatar"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-xl font-semibold">{userName}</h2> {/* Replace with user's name */}
            <p className="text-gray-600">{identity}</p> {/* Replace with user's email */}
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
            <p className="text-gray-600">Location: New York</p> {/* Replace with user's location */}
            <p className="text-gray-600">Bio: Software Engineer</p> {/* Replace with user's bio */}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
    </div>
  );
};

export default ProfilePage;
