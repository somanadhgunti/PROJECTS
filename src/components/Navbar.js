import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useNotification } from '../contexts/NotificationContext'; // Import useNotification
import Modal from './Modal'; // Import Modal
import { useState } from 'react'; // Import useState for modal

// Navbar component receives currentPage and setCurrentPage as props
const Navbar = ({ currentPage, setCurrentPage, theme }) => {
    const { user, login, logout, isLoadingAuth } = useAuth(); // Use auth context
    const { addNotification } = useNotification(); // Use notification context
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Define navigation links and their corresponding page names
    const navLinks = [
        { name: 'Home', page: 'home' },
        { name: 'About', page: 'about' },
        { name: 'Services', page: 'services' },
        { name: 'Contact', page: 'contact' },
        { name: 'Dashboard', page: 'dashboard' },
    ];

    // Determine text color based on theme
    const textColor = theme === 'light' ? 'text-gray-700' : 'text-gray-200';
    const hoverTextColor = theme === 'light' ? 'hover:text-purple-700' : 'hover:text-purple-400';
    const activeLinkClass = theme === 'light' ? 'text-purple-700 font-bold border-b-2 border-purple-700' : 'text-purple-400 font-bold border-b-2 border-purple-400';

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Clear previous errors
        try {
            await login(username, password);
            addNotification('Logged in successfully!', 'success');
            setIsLoginModalOpen(false); // Close modal on success
            setUsername('');
            setPassword('');
        } catch (error) {
            setLoginError(error.message);
            addNotification(`Login failed: ${error.message}`, 'error');
        }
    };

    return (
        // Navigation bar container with responsive padding and dynamic background
        <nav className={`w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-md rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-800 bg-opacity-90' : ''}`}>
            {navLinks.map((link) => (
                <button
                    key={link.page} // Unique key for each link
                    onClick={() => setCurrentPage(link.page)} // Update current page state on click
                    // Apply dynamic classes for styling based on theme and active state
                    className={`
            py-2 px-4 rounded-lg text-lg
            ${textColor} ${hoverTextColor}
            transition-all duration-300 ease-in-out
            ${currentPage === link.page ? activeLinkClass : ''}
            focus:outline-none focus:ring-2 focus:ring-purple-300
            whitespace-nowrap // Prevent text wrapping on small screens
          `}
                >
                    {link.name}
                </button>
            ))}

            {/* Login/Logout Button */}
            {user ? (
                <button
                    onClick={logout}
                    className="ml-4 py-2 px-4 rounded-lg text-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 whitespace-nowrap"
                    aria-label="Logout"
                >
                    Logout ({user.username})
                </button>
            ) : (
                <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="ml-4 py-2 px-4 rounded-lg text-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 whitespace-nowrap"
                    aria-label="Open login form"
                >
                    {isLoadingAuth ? 'Logging in...' : 'Login'}
                </button>
            )}

            {/* Login Modal */}
            <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Login" theme={theme}>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className={`block text-sm font-medium ${textColor}`}>Username</label>
                        <input
                            type="text"
                            id="username"
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-800 text-gray-100'}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium ${textColor}`}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${theme === 'light' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-800 text-gray-100'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        disabled={isLoadingAuth}
                    >
                        {isLoadingAuth ? 'Authenticating...' : 'Login'}
                    </button>
                    <p className={`text-sm ${textColor} mt-2`}>Hint: username 'user', password 'password'</p>
                </form>
            </Modal>
        </nav>
    );
};

export default Navbar;