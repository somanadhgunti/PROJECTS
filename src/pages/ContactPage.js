import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext'; // Import useNotification

// ContactPage component receives theme-related dynamic classes as props
const ContactPage = ({ textColor, subTextColor, sectionBgColor, inputBgColor, inputBorderColor, inputTextColor }) => {
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for the field as user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate form data
    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            addNotification('Please fix the errors in the form.', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate API call for form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
            addNotification('Your message has been sent successfully!', 'success');
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Submission error:', error);
            addNotification('Failed to send message. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`text-center p-4 sm:p-6 transition-colors duration-500`}>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor} mb-6`}>Contact Us</h2>
            <div className={`max-w-md mx-auto ${sectionBgColor} p-6 rounded-lg shadow-md transition-colors duration-500`}>
                <p className={`text-lg ${subTextColor} mb-4`}>
                    Have questions or need support? Feel free to reach out to us!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label htmlFor="name" className={`block text-sm font-medium ${textColor}`}>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${inputBorderColor} ${inputBgColor} ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium ${textColor}`}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${inputBorderColor} ${inputBgColor} ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className={`block text-sm font-medium ${textColor}`}>Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${inputBorderColor} ${inputBgColor} ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            aria-invalid={errors.message ? "true" : "false"}
                            aria-describedby={errors.message ? "message-error" : undefined}
                        ></textarea>
                        {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? "Sending message" : "Send message"}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                <p className={`text-lg ${subTextColor} mt-4`}>
                    Our team is available Monday to Friday, 9 AM to 5 PM.
                </p>
            </div>
        </div>
    );
};

export default ContactPage;