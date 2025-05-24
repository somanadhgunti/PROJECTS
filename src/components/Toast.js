import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

// Toast component to display notifications
const Toast = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        // Container for all toasts, positioned at the top right
        <div className="fixed top-4 right-4 z-50 flex flex-col space-y-3 font-inter">
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    // Dynamic styling based on notification type
                    className={`
            p-4 rounded-lg shadow-lg flex items-center justify-between gap-4
            transform transition-all duration-300 ease-out
            ${notification.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${notification.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${notification.type === 'info' ? 'bg-blue-500 text-white' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-500 text-gray-800' : ''}
            ${notification.type === 'info' ? 'bg-blue-500 text-white' : ''}
            ${notification.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${notification.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-500 text-gray-800' : ''}
          `}
                    role="alert" // ARIA role for accessibility
                >
                    <p className="flex-grow text-lg">{notification.message}</p>
                    {/* Close button for the toast */}
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-4 p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={`Close ${notification.type} notification`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;