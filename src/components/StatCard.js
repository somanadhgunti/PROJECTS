import React from 'react';

const StatCard = ({ stat, theme, sectionBgColor, textColor }) => {
    const trendColor = stat.trend === 'up' ? 'text-green-500' : 'text-red-500';
    const trendIcon = stat.trend === 'up' ? '↑' : '↓';

    return (
        <div className={`${sectionBgColor} p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-lg font-medium ${textColor} mb-1`}>{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className={`mt-4 flex items-center ${trendColor}`}>
                <span className="mr-1">{trendIcon}</span>
                <span className="text-sm font-medium">{stat.change}</span>
                <span className="text-xs ml-1">vs previous period</span>
            </div>
        </div>
    );
};

export default StatCard;