// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import EducationalPrograms from '../components/EducationalPrograms';
import CounterSection from '../components/CounterSection';
import TextInputSection from '../components/TextInputSection';
import ToggleSection from '../components/ToggleSection';
import CodingSkillsSection from '../components/CodingSkillsSection';
import DataAnalyticsSection from '../components/DataAnalyticsSection';
import EngineeringDesignSection from '../components/EngineeringDesignSection';
import ResearchLabSection from '../components/ResearchLabSection';

// Constants
const HOME_PAGE_BACKGROUND = "https://placehold.co/1920x1080/000000/00FF00/png?text=Vignan+Skills+Lab";

const HomePage = ({
                      textColor,
                      subTextColor,
                      sectionTitleColor,
                      inputBgColor,
                      inputBorderColor,
                      inputTextColor,
                      toggleContentBg,
                      theme
                  }) => {
    const { addNotification } = useNotification();
    const [welcomeMessage, setWelcomeMessage] = useState("Explore interactive features and learn more!");
    const [count, setCount] = useState(0);
    const [inputText, setInputText] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [activeTab, setActiveTab] = useState('coding');

    const handleWelcomeButtonClick = () => {
        setWelcomeMessage("You've explored the basic button!");
        addNotification({ type: 'success', message: 'Welcome to Vignan Skills Lab!' });
    };

    const handleIncrement = () => setCount(prev => prev + 1);
    const handleDecrement = () => setCount(prev => prev - 1);
    const handleInputChange = (e) => setInputText(e.target.value);
    const handleToggleVisibility = () => setIsVisible(prev => !prev);

    const transparentSectionBg = theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80';
    const overlayOpacity = theme === 'light' ? 'bg-black opacity-30' : 'bg-black opacity-50';

    return (
        <div
            className="relative w-full h-full p-4 sm:p-6 rounded-xl overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${HOME_PAGE_BACKGROUND})` }}
        >
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${overlayOpacity}`}></div>

            <div className="relative z-10 text-center">
                <header className="mb-10">
                    <h2 className={`text-4xl sm:text-5xl font-extrabold font-bebas-neue ${textColor} mb-6 transition-colors duration-500 uppercase tracking-wide`}>
                        Innovate. Learn. Grow.
                    </h2>
                    <p className={`text-lg sm:text-xl ${subTextColor} mb-8 transition-colors duration-500`}>
                        {welcomeMessage}
                    </p>
                    <button
                        onClick={handleWelcomeButtonClick}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 mb-10 w-full sm:w-auto"
                        aria-label="Explore more features"
                    >
                        Explore More!
                    </button>
                </header>

                {/* Skills Lab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {['coding', 'analytics', 'design', 'research'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md font-medium transition-all ${
                                    activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                            </button>
                        ))}
                    </div>

                    <div className={`p-6 rounded-xl ${transparentSectionBg} transition-all duration-300`}>
                        {activeTab === 'coding' && <CodingSkillsSection theme={theme} />}
                        {activeTab === 'analytics' && <DataAnalyticsSection theme={theme} />}
                        {activeTab === 'design' && <EngineeringDesignSection theme={theme} />}
                        {activeTab === 'research' && <ResearchLabSection theme={theme} />}
                    </div>
                </div>

                {/* Educational Programs Section */}
                <EducationalPrograms
                    sectionTitleColor={sectionTitleColor}
                    transparentSectionBg={transparentSectionBg}
                    addNotification={addNotification}
                />

                {/* Interactive Features Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
                    <CounterSection
                        count={count}
                        sectionTitleColor={sectionTitleColor}
                        transparentSectionBg={transparentSectionBg}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />

                    <TextInputSection
                        inputText={inputText}
                        sectionTitleColor={sectionTitleColor}
                        transparentSectionBg={transparentSectionBg}
                        inputBgColor={inputBgColor}
                        inputBorderColor={inputBorderColor}
                        inputTextColor={inputTextColor}
                        textColor={textColor}
                        onChange={handleInputChange}
                    />

                    <ToggleSection
                        isVisible={isVisible}
                        sectionTitleColor={sectionTitleColor}
                        transparentSectionBg={transparentSectionBg}
                        toggleContentBg={toggleContentBg}
                        textColor={textColor}
                        onToggle={handleToggleVisibility}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;