import React from 'react';

// AboutPage component receives theme-related dynamic classes as props
const AboutPage = ({ textColor, subTextColor }) => {
    return (
        <div className={`text-center p-4 sm:p-6 transition-colors duration-500`}>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor} mb-6`}>About Us</h2>
            <p className={`text-lg ${subTextColor} mb-4 leading-relaxed`}>
                Welcome to our innovative React application! This project serves as a comprehensive demonstration of modern frontend development techniques, showcasing interactive components, responsive design, and dynamic content rendering.
            </p>
            <p className={`text-lg ${subTextColor} leading-relaxed`}>
                Our goal is to provide a clear and practical example of how React can be used to build engaging and user-friendly web interfaces. We continuously strive to enhance functionality and user experience.
            </p>
        </div>
    );
};

export default AboutPage;