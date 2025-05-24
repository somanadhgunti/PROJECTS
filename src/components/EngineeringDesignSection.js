import React, { useState } from 'react';

const EngineeringDesignSection = ({ theme }) => {
    const [designs, setDesigns] = useState([
        { id: 1, name: 'Bridge Design', status: 'In Progress' },
        { id: 2, name: 'Robot Arm', status: 'Completed' },
        { id: 3, name: 'Solar Car', status: 'Planning' },
    ]);

    const [newDesign, setNewDesign] = useState('');
    const [selectedTool, setSelectedTool] = useState('cad');

    const addDesign = () => {
        if (newDesign.trim()) {
            setDesigns([...designs, {
                id: designs.length + 1,
                name: newDesign,
                status: 'Planning'
            }]);
            setNewDesign('');
        }
    };

    return (
        <div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Engineering Design Lab</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold mb-2">Design Projects</h4>
                    <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} mb-4`}>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={newDesign}
                                onChange={(e) => setNewDesign(e.target.value)}
                                placeholder="New design project name"
                                className={`flex-1 p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            />
                            <button
                                onClick={addDesign}
                                className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="space-y-2">
                            {designs.map(design => (
                                <li
                                    key={design.id}
                                    className={`p-3 rounded-md flex justify-between items-center ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}
                                >
                                    <span>{design.name}</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        design.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                            design.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-blue-200 text-blue-800'
                                    }`}>
                    {design.status}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Design Tools</h4>
                    <div className="mb-4">
                        <select
                            value={selectedTool}
                            onChange={(e) => setSelectedTool(e.target.value)}
                            className={`p-2 rounded-md ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                        >
                            <option value="cad">CAD Software</option>
                            <option value="fea">FEA Tools</option>
                            <option value="circuit">Circuit Design</option>
                            <option value="3dprint">3D Printing</option>
                        </select>
                    </div>

                    <div className={`p-4 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} h-64 flex items-center justify-center`}>
                        {selectedTool === 'cad' && (
                            <div className="text-center">
                                <p className="text-lg font-medium mb-2">CAD Modeling</p>
                                <p className="text-sm">Design 3D models with precision</p>
                            </div>
                        )}
                        {selectedTool === 'fea' && (
                            <div className="text-center">
                                <p className="text-lg font-medium mb-2">Finite Element Analysis</p>
                                <p className="text-sm">Simulate stresses and strains</p>
                            </div>
                        )}
                        {selectedTool === 'circuit' && (
                            <div className="text-center">
                                <p className="text-lg font-medium mb-2">Circuit Design</p>
                                <p className="text-sm">Create and test electronic circuits</p>
                            </div>
                        )}
                        {selectedTool === '3dprint' && (
                            <div className="text-center">
                                <p className="text-lg font-medium mb-2">3D Printing</p>
                                <p className="text-sm">Bring your designs to life</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Design Resources</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['AutoCAD', 'SolidWorks', 'ANSYS', 'Arduino'].map(tool => (
                        <div key={tool} className={`p-3 rounded-md ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-center`}>
                            {tool}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EngineeringDesignSection;