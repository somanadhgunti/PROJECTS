import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the Notification Context
const NotificationContext = createContext(null);

// Custom hook to use the Notification Context
export const useNotification = () => {
    return useContext(NotificationContext);
};

// Notification Provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const TOAST_DURATION = 3000; // 3 seconds

    // Function to add a new notification
    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now(); // Unique ID for each toast
        setNotifications(prevNotifications => [
            ...prevNotifications,
            { id, message, type }
        ]);

        // Automatically remove the notification after a duration
        setTimeout(() => {
            removeNotification(id);
        }, TOAST_DURATION);
    }, []);

    // Function to remove a notification by ID
    const removeNotification = useCallback((id) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notif => notif.id !== id)
        );
    }, []);

    const value = {
        notifications,
        addNotification,
        removeNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};