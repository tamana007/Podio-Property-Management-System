'use client'
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from './AdminLayout';
import { FiBell, FiUser } from 'react-icons/fi';
import { usePodioStore } from '../podioStore';
import socket from '../utils/socket';
// import { useRouter } from 'next/router';

type Comment = {
  commenter: string;
  time: string;
  comment: string;
  mleadId: number;
};

const Profile: NextPage = () => {
  const podioStore = usePodioStore();
  const { email, logout } = usePodioStore();
  const [notifications, setNotifications] = useState<Comment[]>([]); // State for notifications
  // const router = useRouter(); // Move the useRouter hook outside the function

  const handleFetchnotification = async () => {
    console.log('clicked---------------');

    try {
      const fetchNotification = await fetch('api/notification');
      const responsed = await fetchNotification.json();
      console.log('consoledddddddddddddd', responsed);

      setNotifications([...notifications, responsed]);

      console.log('response frao api Notification.............',notifications);
      console.log('response frao api res.............',responsed);
    } catch (error) {
      console.log('error happend', error);
    }
  };

  useEffect(() => {
    console.log('Notifications updated:', notifications);

    // Move the handleRouterQuery function inside the useEffect hook
    const handleRouterQuery = () => {
      // const { comment } = router.query;
      console.log('Comment from query:');
    };

    // Call the function only on the client-side
    if (typeof window !== 'undefined') {
      handleRouterQuery();
    }
  }, [notifications]);

  // ... (rest of the code remains the same)

  // ... (rest of the code remains the same)
  

  // useEffect(() => {
  //   socket.onmessage = (event) => {
  //     const { type, message, link } = JSON.parse(event.data);
  //     if (type === 'notification') {
  //       setNotifications((prev) => [...prev, { message, link }]);
  //     }
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p>Email: {email}</p>
        <button onClick={handleLogout} className="bg-red-500 text-black px-4 py-2 rounded mt-4">
          Logout 
        </button>
        <div className="mt-6 text-black">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <button className='text-black' type='button' onClick={handleFetchnotification}>show notifications</button>
          <div className='text-black'>
            {notifications.map((not)=>(<p className='text-black'>{not.comment} lst   </p>))}
          </div>
          {/* <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                <a href={notification.link} className="text-blue-500">
                  {notification.message}
                </a>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
