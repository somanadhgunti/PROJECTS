import React, { useState } from 'react';

const ResearchLabSection = ({ theme }) => {
    const [researchTopics, setResearchTopics] = useState([
        { id: 1, title: 'AI in Education', field: 'Computer Science', status: 'Ongoing' },
        { id: 2, title: 'Renewable Energy', field: 'Engineering', status: 'Completed' },
        { id: 3, title: 'Biomedical Devices', field: 'Biotechnology', status: 'Planning' },
    ]);

    const [newTopic, setNewTopic] = useState('');
    const [selectedField, setSelectedField] = useState('Computer Science');
    const [searchTerm, setSearchTerm] = useState('');

    const addResearchTopic = () => {
        if (newTopic.trim()) {
            setResearchTopics([...researchTopics, {
                id: researchTopics.length + 1,
                title: newTopic,
                field: selectedField,
                status: 'Planning'
            }]);
            setNewTopic('');
        }
    };

    const filteredTopics = researchTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Research Lab</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold mb-2">Research Projects</h4>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search research topics..."
                            className={`w-full p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                        />
                    </div>

                    <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} mb-4`}>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                                placeholder="New research topic"
                                className={`flex-1 p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            />
                            <select
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                                className={`ml-2 p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            >
                                <option value="Computer Science">Computer Science</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Biotechnology">Biotechnology</option>
                                <option value="Mathematics">Mathematics</option>
                            </select>
                        </div>
                        <button
                            onClick={addResearchTopic}
                            className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                        >
                            Add Research Topic
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {filteredTopics.map(topic => (
                            <li
                                key={topic.id}
                                className={`p-3 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">{topic.title}</p>
                                        <p className="text-sm">{topic.field}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        topic.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                            topic.status === 'Ongoing' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-blue-200 text-blue-800'
                                    }`}>
                    {topic.status}
                  </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Research Resources</h4>

                    <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} mb-4`}>
                        <h5 className="font-medium mb-2">Literature Search</h5>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Search research papers..."
                                className={`flex-1 p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            />
                            <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                                Search
                            </button>
                        </div>
                        <div className={`p-3 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} mt-2`}>
                            <p className="text-sm">Sample results would appear here in a real implementation</p>
                        </div>
                    </div>

                    <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                        <h5 className="font-medium mb-2">Research Tools</h5>
                        <div className="grid grid-cols-2 gap-2">
                            {['LaTeX', 'MATLAB', 'Jupyter', 'SPSS'].map(tool => (
                                <div key={tool} className={`p-2 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} text-center`}>
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Recent Publications</h4>
                <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                    <div className="space-y-3">
                        <div className="border-b pb-2">
                            <p className="font-medium">"Machine Learning Approaches in Education"</p>
                            <p className="text-sm">Journal of Educational Technology, 2023</p>
                        </div>
                        <div className="border-b pb-2">
                            <p className="font-medium">"Sustainable Energy Solutions"</p>
                            <p className="text-sm">Renewable Energy Journal, 2022</p>
                        </div>
                        <div>
                            <p className="font-medium">"Advances in Biomedical Engineering"</p>
                            <p className="text-sm">IEEE Transactions, 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchLabSection;