'use client'
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from './AdminLayout';
import { FiBell, FiUser } from 'react-icons/fi';
import { usePodioStore } from '../podioStore';
import socket from '../utils/socket';
// import { useRouter } from 'next/router';

interface DataTypetwo {
  commenter: string;
  time: Date;
  comment: string;
  leadId: number;
}
interface ProfileProps {
  fetchComments: DataTypetwo[];
}

type Comment = {
  commenter: string;
  time: string;
  comment: string;
  mleadId: number;
};

const Profile: NextPage <ProfileProps>= ({fetchComments}) => {
  const [comments, setComments] = useState<DataTypetwo[]>([]);
  const podioStore = usePodioStore();
  const { email, logout } = usePodioStore();
  const [notifications, setNotifications] = useState<Comment[]>([]); // State for notifications


  const handleFetchnotification = () => {
    console.log('fetched comment', fetchComments);
  
    const commentElements = fetchComments.map((comment) => (
      <p key={comment.leadId}>
        {comment.commenter} - {comment.comment}
      </p>
    ));
  
    return commentElements;
  };

  useEffect(() => {
    console.log('Notifications updated:', notifications);
    console.log('prp',fetchComments);
    

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



  const handleLogout = () => {
    
    // logout();
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
          {handleFetchnotification()}
          <div className='text-black'>
            {notifications.map((not)=>(<p className='text-black'>{not.comment} lst   </p>))}

          
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
