import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationBell: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Server Boost!',
      message: 'Your server received a new boost!',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Achievement Unlocked',
      message: 'You earned the "Top Contributor" badge!',
      timestamp: new Date(Date.now() - 86400000),
      read: false,
    },
  ]);

  if (!isAuthenticated) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-purple-300 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-[#1A0F2E] rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4 border-b border-purple-900">
              <h3 className="text-white font-medium">Notifications</h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-b border-purple-900 hover:bg-purple-900/30 cursor-pointer ${
                      !notification.read ? 'bg-purple-900/20' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-400">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{notification.message}</p>
                  </motion.div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No notifications
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;