import React, {useState, useEffect, useCallback} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';
import RecentActivity from '../components/RecentActivity';

const DashboardPage = ({
                           textColor,
                           subTextColor,
                           sectionBgColor,
                           theme,
                           inputBgColor,
                           inputBorderColor,
                           inputTextColor
                       }) => {
    const { user, logout } = useAuth();
    const { addNotification } = useNotification();
    const [dashboardData, setDashboardData] = useState({
        stats: [],
        chartData: [],
        recentActivities: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeRange, setTimeRange] = useState('week');
    const [refreshing, setRefreshing] = useState(false);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [exportingData, setExportingData] = useState(false);

    // Generate sample chart data based on time range
    const generateChartData = (range) => {
        const days = range === 'week' ? 7 : range === 'month' ? 30 : 90;
        return Array.from({ length: days }, (_, i) => ({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: Math.floor(Math.random() * 1000) + 500
        }));
    };

    // Generate sample recent activities
    const generateRecentActivities = () => {
        const actions = ['login', 'logout', 'created', 'updated', 'deleted', 'viewed'];
        const items = ['project', 'report', 'user', 'settings', 'dashboard'];
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            user: `user${Math.floor(Math.random() * 100)}@example.com`,
            action: actions[Math.floor(Math.random() * actions.length)],
            item: items[Math.floor(Math.random() * items.length)],
            time: `${Math.floor(Math.random() * 60)} minutes ago`
        }));
    };

    // Simulate fetching dashboard data
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const success = Math.random() > 0.1;
            if (!success) throw new Error('Failed to load dashboard data');

            const stats = [
                { id: 1, label: "Total Users", value: "1,234,567", trend: "up", change: "12%", icon: "👥" },
                { id: 2, label: "Active Sessions", value: "8,765", trend: "down", change: "3%", icon: "🖥️" },
                { id: 3, label: "Projects Completed", value: "987", trend: "up", change: "24%", icon: "✅" },
                { id: 4, label: "Support Tickets", value: "42", trend: "down", change: "15%", icon: "🛎️" },
                { id: 5, label: "Revenue (USD)", value: "$12,345,678", trend: "up", change: "8%", icon: "💰" },
                { id: 6, label: "New Signups", value: "150", trend: "up", change: "5%", icon: "🆕" }
            ];

            setDashboardData({
                stats,
                chartData: generateChartData(timeRange),
                recentActivities: generateRecentActivities()
            });
            addNotification('Dashboard data refreshed!', 'success');
        } catch (err) {
            setError(err.message);
            addNotification(`Error: ${err.message}`, 'error');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    });

    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchDashboardData();
    };

    // Handle time range change
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        setDashboardData(prev => ({
            ...prev,
            chartData: generateChartData(range)
        }));
    };

    // Generate PDF report
    const handleGenerateReport = async () => {
        setGeneratingReport(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const reportContent = `
        Dashboard Report - ${new Date().toLocaleDateString()}
        ====================================
        
        Statistics:
        ${dashboardData.stats.map(stat => `- ${stat.label}: ${stat.value} (${stat.change} ${stat.trend})`).join('\n')}
        
        Recent Activities:
        ${dashboardData.recentActivities.map(act => `- ${act.user} ${act.action} ${act.item} (${act.time})`).join('\n')}
      `;

            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            URL.revokeObjectURL(url);

            addNotification('Report generated successfully!', 'success');
        } catch (err) {
            addNotification('Failed to generate report', 'error');
        } finally {
            setGeneratingReport(false);
        }
    };

    // Export data as CSV
    const handleExportData = async () => {
        setExportingData(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const headers = ['Metric', 'Value', 'Trend', 'Change'];
            const csvContent = [
                headers.join(','),
                ...dashboardData.stats.map(stat =>
                    [stat.label, stat.value, stat.trend, stat.change].join(',')
                )
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            addNotification('Data exported successfully!', 'success');
        } catch (err) {
            addNotification('Failed to export data', 'error');
        } finally {
            setExportingData(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [fetchDashboardData, user]);

    if (!user) {
        return (
            <div className={`text-center p-4 sm:p-6 transition-colors duration-500`}>
                <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor} mb-6`}>Dashboard Overview</h2>
                <div className={`${sectionBgColor} p-8 rounded-lg max-w-md mx-auto`}>
                    <p className="text-xl font-semibold text-red-500 mb-4">🔒 Restricted Access</p>
                    <p className={`text-lg ${subTextColor} mb-6`}>You must be logged in to view this page.</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const filteredStats = dashboardData.stats.filter(stat =>
        stat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stat.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 transition-colors duration-500">
            {/* Header and controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor}`}>Dashboard Overview</h2>
                    <p className={`text-lg ${subTextColor}`}>Welcome back, {user.email}!</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${refreshing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition`}
                    >
                        {refreshing ? 'Refreshing...' : 'Refresh Data'}
                        {refreshing && <LoadingSpinner size="small" theme={theme} />}
                    </button>

                    <select
                        value={timeRange}
                        onChange={(e) => handleTimeRangeChange(e.target.value)}
                        className={`p-2 rounded-lg border ${inputBorderColor} ${inputBgColor} ${inputTextColor}`}
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="quarter">Last 90 Days</option>
                    </select>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search metrics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full p-3 border rounded-lg shadow-sm ${inputBorderColor} ${inputBgColor} ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition-colors duration-500`}
                    aria-label="Search dashboard metrics"
                />
            </div>

            {/* Main Content */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner theme={theme} />
                </div>
            ) : error ? (
                <div className={`${sectionBgColor} p-6 rounded-lg max-w-2xl mx-auto text-center`}>
                    <p className="text-red-500 text-xl font-semibold mb-4">⚠️ {error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {filteredStats.length > 0 ? (
                            filteredStats.map(stat => (
                                <StatCard
                                    key={stat.id}
                                    stat={stat}
                                    theme={theme}
                                    sectionBgColor={sectionBgColor}
                                    textColor={textColor}
                                />
                            ))
                        ) : (
                            <div className={`${sectionBgColor} p-6 rounded-lg col-span-full text-center`}>
                                <p className={`text-xl ${subTextColor}`}>No matching metrics found.</p>
                            </div>
                        )}
                    </div>

                    {/* Chart Section */}
                    <div className={`${sectionBgColor} p-6 rounded-lg shadow-sm mb-8`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className={`text-2xl font-bold ${textColor}`}>Performance Overview</h3>
                            <div className="flex gap-2">
                                {['week', 'month', 'quarter'].map(range => (
                                    <button
                                        key={range}
                                        onClick={() => handleTimeRangeChange(range)}
                                        className={`px-3 py-1 rounded-md ${timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
                                    >
                                        {range.charAt(0).toUpperCase() + range.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <DashboardChart data={dashboardData.chartData} theme={theme} />
                    </div>

                    {/* Recent Activity */}
                    <div className={`${sectionBgColor} p-6 rounded-lg shadow-sm`}>
                        <h3 className={`text-2xl font-bold ${textColor} mb-6`}>Recent Activity</h3>
                        <RecentActivity
                            activities={dashboardData.recentActivities}
                            textColor={textColor}
                            subTextColor={subTextColor}
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={handleGenerateReport}
                            disabled={generatingReport}
                            className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                                generatingReport ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            <span>Generate Report</span>
                            <span>📊</span>
                            {generatingReport && <LoadingSpinner size="small" theme={theme} />}
                        </button>

                        <button
                            onClick={handleExportData}
                            disabled={exportingData}
                            className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                                exportingData ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            <span>Export Data</span>
                            <span>📤</span>
                            {exportingData && <LoadingSpinner size="small" theme={theme} />}
                        </button>

                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                        >
                            <span>Logout</span>
                            <span>🚪</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardPage;