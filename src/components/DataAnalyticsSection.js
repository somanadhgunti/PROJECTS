import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DataAnalyticsSection = ({ theme }) => {
    const [dataset, setDataset] = useState([
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 900 },
    ]);

    const [query, setQuery] = useState('SELECT * FROM dataset LIMIT 5');
    const [queryResult, setQueryResult] = useState('');

    const executeQuery = () => {
        // Simulate query execution
        setQueryResult(JSON.stringify(dataset.slice(0, 5), null, 2));
    };

    const addRandomData = () => {
        const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newData = [...dataset];
        months.forEach(month => {
            newData.push({ name: month, value: Math.floor(Math.random() * 1000) });
        });
        setDataset(newData);
    };

    return (
        <div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Data Analytics Lab</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold mb-2">Data Visualization</h4>
                    <div className="h-64 bg-white p-4 rounded-md">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataset}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <button
                        onClick={addRandomData}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        Add Random Data
                    </button>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">SQL Query Interface</h4>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`w-full h-32 p-3 font-mono rounded-md ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}
                        spellCheck="false"
                    />
                    <button
                        onClick={executeQuery}
                        className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                    >
                        Execute Query
                    </button>
                    <pre className={`w-full h-32 mt-2 p-3 overflow-auto rounded-md ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-100'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
            {queryResult || "Query results will appear here"}
          </pre>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Analytics Tools</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Python Pandas', 'R Studio', 'Tableau', 'Power BI'].map(tool => (
                        <div key={tool} className={`p-3 rounded-md ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-center`}>
                            {tool}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataAnalyticsSection;