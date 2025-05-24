import React from 'react';

const educationalImages = [
    {
        id: 1,
        title: "Software Engineering",
        description: "Build the future with cutting-edge code.",
        imageUrl: "https://placehold.co/400x300/4CAF50/FFFFFF/png?text=Coding+Skills",
        notification: "Exploring Software Engineering programs!"
    },
    {
        id: 2,
        title: "Data Science & AI",
        description: "Unlock insights from complex data.",
        imageUrl: "https://placehold.co/400x300/2196F3/FFFFFF/png?text=Data+Analytics",
        notification: "Discovering Data Science & AI opportunities!"
    },
    {
        id: 3,
        title: "Mechanical Design",
        description: "Innovate and create physical systems.",
        imageUrl: "https://placehold.co/400x300/FF9800/000000/png?text=Engineering+Design",
        notification: "Learning about Mechanical Design courses!"
    },
    {
        id: 4,
        title: "Biotechnology Research",
        description: "Advance scientific discovery.",
        imageUrl: "https://placehold.co/400x300/9C27B0/FFFFFF/png?text=Research+Lab",
        notification: "Investigating Biotechnology research areas!"
    },
];

const EducationalPrograms = ({ sectionTitleColor, transparentSectionBg, addNotification }) => {
    const handleImageClick = (notificationMessage) => {
        addNotification(notificationMessage, 'info');
    };

    return (
        <div className={`${transparentSectionBg} p-6 rounded-lg shadow-inner mb-8 transition-colors duration-500`}>
            <h3 className={`text-2xl font-bold font-bebas-neue ${sectionTitleColor} mb-6 transition-colors duration-500 uppercase`}>
                Explore Our Programs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {educationalImages.map(item => (
                    <div
                        key={item.id}
                        onClick={() => handleImageClick(item.notification)}
                        className="cursor-pointer group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        aria-label={`Explore ${item.title}`}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src="https://placehold.co/400x300/cccccc/000000?text=Image+Error";
                            }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <h4 className="text-xl font-bold font-bebas-neue uppercase mb-2">{item.title}</h4>
                            <p className="text-sm text-center">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationalPrograms;