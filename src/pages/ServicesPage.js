import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner
import { useNotification } from '../contexts/NotificationContext'; // Import useNotification

// ServicesPage component receives theme-related dynamic classes as props
const ServicesPage = ({ textColor, subTextColor, sectionBgColor, theme }) => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addNotification } = useNotification();

    // Simulate fetching data
    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Simulate success or failure
                const success = Math.random() > 0.1; // 90% chance of success
                if (success) {
                    setServices([
                        "Web Development (Frontend & Backend)",
                        "Mobile App Development (React Native)",
                        "UI/UX Design & Prototyping",
                        "Cloud Integration & Deployment",
                        "Custom Software Solutions",
                        "Performance Optimization",
                        "Data Analytics & Reporting",
                        "DevOps & CI/CD",
                    ]);
                    addNotification('Services loaded successfully!', 'success');
                } else {
                    throw new Error('Failed to load services. Please try again later.');
                }
            } catch (err) {
                setError(err.message);
                addNotification(`Error: ${err.message}`, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, [addNotification]); // Dependency on addNotification to avoid lint warning

    return (
        <div className={`text-center p-4 sm:p-6 transition-colors duration-500`}>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor} mb-6`}>Our Services</h2>

            {isLoading ? (
                <LoadingSpinner theme={theme} /> // Show spinner while loading
            ) : error ? (
                <p className="text-red-500 text-xl font-semibold">{error}</p> // Show error message
            ) : (
                <div className="max-w-xl mx-auto">
                    <ul className="list-none p-0">
                        {services.map((service, index) => (
                            <li
                                key={index}
                                className={`${sectionBgColor} ${subTextColor} p-4 rounded-lg shadow-sm mb-4 text-lg text-left flex items-center transition-colors duration-500`}
                            >
                                <span className="text-purple-500 mr-3 text-2xl" aria-hidden="true">•</span> {service}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <p className={`text-lg ${subTextColor} mt-6`}>
                We offer a wide range of services tailored to meet your specific needs.
            </p>
        </div>
    );
};

export default ServicesPage;