// components/Notifications.tsx
import { useEffect, useState } from 'react';
import socket from '../utils/socket'

interface Notification {
  type: 'notification';
  message: string;
  link: string;
}

interface NotificationsProps {
  userId: string;
}

const Notifications: React.FC<NotificationsProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Register user with WebSocket server
    socket.send(JSON.stringify({ type: 'register', userId }));

    // Listen for notifications
    socket.onmessage = (event: MessageEvent) => {
      const data: Notification = JSON.parse(event.data);
      if (data.type === 'notification') {
        setNotifications((prev) => [...prev, data]);
      }
    };

    return () => {
      socket.onmessage = null;
    };
  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            <a href={notif.link}>{notif.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
