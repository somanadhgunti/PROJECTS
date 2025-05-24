import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CodingSkillsSection = ({ theme }) => {
    const [skills, setSkills] = useState([
        { name: 'JavaScript', value: 85 },
        { name: 'React', value: 80 },
        { name: 'Python', value: 75 },
        { name: 'Node.js', value: 70 },
        { name: 'HTML/CSS', value: 90 },
    ]);

    const [code, setCode] = useState('// Write your code here\nfunction hello() {\n  return "Hello World!";\n}');
    const [codeOutput, setCodeOutput] = useState('');

    const executeCode = () => {
        try {
            // Simulate code execution
            const result = 'Hello World!'; // This would be the actual execution result
            setCodeOutput(result);
        } catch (error) {
            setCodeOutput(`Error: ${error.message}`);
        }
    };

    const addRandomSkill = () => {
        const newSkills = [...skills];
        const languages = ['TypeScript', 'Java', 'C++', 'Go', 'Rust', 'PHP'];
        const randomLang = languages[Math.floor(Math.random() * languages.length)];
        newSkills.push({ name: randomLang, value: Math.floor(Math.random() * 50) + 50 });
        setSkills(newSkills);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Coding Skills Lab</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold mb-2">Skills Visualization</h4>
                    <div className="h-64 bg-white p-4 rounded-md">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={skills}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {skills.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <button
                        onClick={addRandomSkill}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        Add Random Skill
                    </button>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Code Editor</h4>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`w-full h-32 p-3 font-mono rounded-md ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}
                        spellCheck="false"
                    />
                    <button
                        onClick={executeCode}
                        className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                    >
                        Run Code
                    </button>
                    <pre className={`w-full h-32 mt-2 p-3 overflow-auto rounded-md ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-100'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
            {codeOutput || "Code output will appear here"}
          </pre>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Development Tools</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['VS Code', 'Git', 'Docker', 'Postman', 'Jest', 'Webpack', 'ESLint', 'Figma'].map(tool => (
                        <div key={tool} className={`p-3 rounded-md ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-center`}>
                            {tool}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodingSkillsSection;