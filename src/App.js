// src/App.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Array of simulated Vignan University campus background image URLs
// These are designed to look like campus scenes (buildings, labs, green spaces)
// with colors that allow text to be readable with a transparent overlay.
const backgroundImages = [
  "https://placehold.co/1920x1080/4CAF50/FFFFFF/png?text=Vignan+Green+Campus", // Green, representing campus grounds
  "https://placehold.co/1920x1080/2196F3/FFFFFF/png?text=Vignan+Building+View", // Blue, representing academic building
  "https://placehold.co/1920x1080/FF9800/000000/png?text=Vignan+Lab+Interior",  // Orange, representing a lab/innovation space
  "https://placehold.co/1920x1080/795548/FFFFFF/png?text=Vignan+Library+Study",// Brown, representing a library/study area
  "https://placehold.co/1920x1080/9C27B0/FFFFFF/png?text=Vignan+Auditorium",  // Purple, representing an event/auditorium
];

// Main App component
const App = () => {
  // --- Page State: Manages which page is currently displayed ---
  const [currentPage, setCurrentPage] = useState('home'); // Default to 'home' page

  // --- Theme State (Light/Dark Mode) ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // --- Background Image State ---
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Effect to apply theme class to html element and save to localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Effect to change background image on page navigation
  useEffect(() => {
    // Cycle through images, ensuring a different one if possible
    setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
  }, [currentPage]); // Dependency on currentPage

  // Define dynamic classes based on theme for global elements
  const cardBgColor = theme === 'light' ? 'bg-white' : 'bg-gray-700';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const subTextColor = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const sectionBgColor = theme === 'light' ? 'bg-gray-100' : 'bg-gray-600';
  const sectionTitleColor = theme === 'light' ? 'text-gray-700' : 'text-gray-200';
  const inputBgColor = theme === 'light' ? 'bg-white' : 'bg-gray-700';
  const inputBorderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-500';
  const inputTextColor = theme === 'light' ? 'text-gray-700' : 'text-gray-100';
  const toggleContentBg = theme === 'light' ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-blue-900 border-blue-700 text-blue-200';

  // Function to render the current page component based on `currentPage` state
  const renderPage = () => {
    const pageProps = {
      textColor,
      subTextColor,
      sectionBgColor,
      sectionTitleColor,
      inputBgColor,
      inputBorderColor,
      inputTextColor,
      toggleContentBg,
      theme
    };

    return (
        <Suspense fallback={<LoadingSpinner theme={theme} />}>
          {(() => {
            switch (currentPage) {
              case 'home':
                return <HomePage {...pageProps} />;
              case 'about':
                return <AboutPage {...pageProps} />;
              case 'services':
                return <ServicesPage {...pageProps} />;
              case 'contact':
                return <ContactPage {...pageProps} />;
              case 'dashboard':
                return <DashboardPage {...pageProps} />;
              default:
                return <HomePage {...pageProps} />;
            }
          })()}
        </Suspense>
    );
  };

  // --- Handlers for Theme Switcher ---
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
      <NotificationProvider>
        <AuthProvider>
          {/* Main container div with dynamic background image and font styling */}
          <div
              className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-inter bg-cover bg-center transition-all duration-1000 ease-in-out relative"
              style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
          >
            {/* Overlay for readability - adjusted opacity for more visibility of background */}
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${theme === 'light' ? 'bg-white opacity-20' : 'bg-black opacity-40'}`}></div>

            {/* Theme Toggle Button - positioned at top right for easy access, above overlay */}
            <button
                onClick={toggleTheme}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 ${theme === 'light' ? 'bg-gray-800 text-white focus:ring-gray-600' : 'bg-yellow-400 text-gray-900 focus:ring-yellow-200'}`}
                aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-4.732l-.707-.707M4.372 19.06l-.707-.707m15.325 4.732l-.707.707M4.372 4.94l-.707.707" />
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
              )}
            </button>

            {/* Main Card-like container for content, above overlay */}
            <div className={`${cardBgColor} p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md md:max-w-3xl lg:max-w-4xl transition-colors duration-500 flex flex-col items-center z-10`}>
              {/* Title/Header - "Welcome to Vignan" */}
              <h1 className={`text-4xl sm:text-5xl font-extrabold ${textColor} mb-6 transition-colors duration-500`}>
                Welcome to Vignan
              </h1>

              {/* Navigation Bar */}
              <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} />

              {/* Render the current page content */}
              <div className="w-full mt-4">
                {renderPage()}
              </div>
            </div>

            {/* Footer text */}
            <p className="mt-8 text-sm text-white opacity-80 z-10">
              Powered by React and Tailwind CSS
            </p>
          </div>
          <Toast />
        </AuthProvider>
      </NotificationProvider>
  );
};

export default App;