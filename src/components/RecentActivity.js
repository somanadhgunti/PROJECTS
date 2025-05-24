import React from 'react';

const RecentActivity = ({ activities, textColor, subTextColor }) => {
    const getActionColor = (action) => {
        switch (action) {
            case 'created': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'updated': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case 'created': return '➕';
            case 'updated': return '🔄';
            case 'deleted': return '❌';
            case 'login': return '🔑';
            case 'logout': return '🚪';
            case 'viewed': return '👀';
            default: return '⚡';
        }
    };

    return (
        <div className="space-y-4">
            {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(activity.action)}`}>
                        <span className="text-sm">{getActionIcon(activity.action)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${textColor} truncate`}>
                            {activity.user} {activity.action} {activity.item}
                        </p>
                        <p className={`text-xs ${subTextColor}`}>{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentActivity;