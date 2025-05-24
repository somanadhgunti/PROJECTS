import React, { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
    // Mock user state: null if not logged in, object if logged in
    const [user, setUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);

    // Mock login function
    const login = async (username, password) => {
        setIsLoadingAuth(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => { // Simulate API call
                if (username === 'user' && password === 'password') {
                    setUser({ username: 'user', id: '123' });
                    resolve(true);
                } else {
                    reject(new Error('Invalid credentials'));
                }
                setIsLoadingAuth(false);
            }, 1000);
        });
    };

    // Mock logout function
    const logout = () => {
        setUser(null);
    };

    // Value provided by the context
    const value = {
        user,
        isLoadingAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};