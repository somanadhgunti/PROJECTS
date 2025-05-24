import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardChart = ({ data, theme }) => {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Activity',
                data: data.map(item => item.value),
                borderColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.2)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                pointBorderColor: '#fff',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme === 'dark' ? '#e5e7eb' : '#374151',
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                }
            },
            y: {
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                }
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="h-80">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DashboardChart;