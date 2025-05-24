import React from 'react';

const ToggleSection = ({
                           isVisible,
                           sectionTitleColor,
                           transparentSectionBg,
                           toggleContentBg,
                           textColor,
                           onToggle
                       }) => {
    return (
        <div className={`${transparentSectionBg} p-6 rounded-lg shadow-inner md:col-span-2 transition-colors duration-500`}>
            <h3 className={`text-2xl font-bold font-bebas-neue ${sectionTitleColor} mb-4 transition-colors duration-500 uppercase`}>
                Toggle Content Visibility
            </h3>
            <button
                onClick={onToggle}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200 mb-4 w-full sm:w-auto"
                aria-label={isVisible ? "Hide content" : "Show content"}
            >
                {isVisible ? "Hide Content" : "Show Content"}
            </button>
            {isVisible && (
                <div className={`${toggleContentBg} p-4 rounded-lg border text-lg transition-colors duration-500`}>
                    <p>This content is now visible! You can toggle it on and off.</p>
                    <p className="text-sm mt-2">This demonstrates conditional rendering in React and adapts to the theme.</p>
                </div>
            )}
        </div>
    );
};

export default ToggleSection;