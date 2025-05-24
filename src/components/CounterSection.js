import React from 'react';

const CounterSection = ({
                            count,
                            sectionTitleColor,
                            transparentSectionBg,
                            onIncrement,
                            onDecrement
                        }) => {
    return (
        <div className={`${transparentSectionBg} p-6 rounded-lg shadow-inner transition-colors duration-500`}>
            <h3 className={`text-2xl font-bold font-bebas-neue ${sectionTitleColor} mb-4 transition-colors duration-500 uppercase`}>
                Interactive Counter
            </h3>
            <p className="text-5xl font-extrabold text-purple-700 mb-6 transition-colors duration-500">
                {count}
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onDecrement}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200"
                    aria-label="Decrement counter"
                >
                    Decrement
                </button>
                <button
                    onClick={onIncrement}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200"
                    aria-label="Increment counter"
                >
                    Increment
                </button>
            </div>
        </div>
    );
};

export default CounterSection;