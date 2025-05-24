import React from 'react';

// Modal component for displaying content in a dialog
const Modal = ({ isOpen, onClose, children, title, theme }) => {
    if (!isOpen) return null; // Don't render if not open

    // Dynamic classes based on theme
    const modalBg = theme === 'light' ? 'bg-white' : 'bg-gray-700';
    const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
    const closeButtonBg = theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-600 hover:bg-gray-500';

    return (
        // Overlay for the modal, covers the whole screen
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 font-inter">
            {/* Modal content container */}
            <div className={`${modalBg} rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100`}>
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full ${closeButtonBg} ${textColor} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Modal Body */}
                <div className={`${textColor}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;