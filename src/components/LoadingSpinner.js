import React from 'react';

// LoadingSpinner component
const LoadingSpinner = ({ theme }) => {
    // Dynamic color based on theme
    const spinnerColor = theme === 'light' ? 'border-purple-500' : 'border-purple-300';
    const spinnerBg = theme === 'light' ? 'border-gray-200' : 'border-gray-600';

    return (
        <div className="flex items-center justify-center py-8">
            <div
                className={`animate-spin rounded-full h-16 w-16 border-t-4 ${spinnerColor} border-solid ${spinnerBg}`}
                role="status" // ARIA role for accessibility
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span> {/* Screen reader text */}
            </div>
        </div>
    );
};

export default LoadingSpinner;