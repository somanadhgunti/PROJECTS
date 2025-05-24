// src/components/TextInputSection.js
import React from 'react';

const TextInputSection = ({
                              inputText,
                              sectionTitleColor,
                              transparentSectionBg,
                              inputBgColor,
                              inputBorderColor,
                              inputTextColor,
                              textColor,
                              onChange
                          }) => {
    return (
        <div className={`${transparentSectionBg} p-6 rounded-lg shadow-inner transition-colors duration-500`}>
            <h3 className={`text-2xl font-bold font-bebas-neue ${sectionTitleColor} mb-4 transition-colors duration-500 uppercase`}>
                Live Text Input
            </h3>
            <input
                type="text"
                value={inputText}
                onChange={onChange}
                placeholder="Type something here..."
                className={`w-full p-3 border ${inputBorderColor} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${inputTextColor} ${inputBgColor} mb-4 transition-colors duration-500`}
                aria-label="Live text input field"
            />
            <p className={`text-xl ${textColor} transition-colors duration-500`}>
                You typed: <span className="font-semibold text-blue-600">{inputText || "Nothing yet!"}</span>
            </p>
        </div>
    );
};

export default TextInputSection;