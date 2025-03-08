import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const TreeResult = () => {
    // Initial dataset for Tree Algorithms
    const initialData = [
        { name: "Tree Traversals", time: 0 },
        { name: "Binary Search Tree (BST)", time: 0 },
        { name: "AVL Tree", time: 0 },
        { name: "Lowest Common Ancestor (LCA)", time: 0 },
    ];

    const [treeData, setTreeData] = useState(initialData);

    useEffect(() => {
        // Generate random execution times for tree algorithms
        const generateTreeTimes = () => {
            setTreeData((prevData) =>
                prevData.map((entry) => ({
                    ...entry,
                    time: Math.random() * (entry.name === "AVL Tree" ? 40 : entry.name === "Binary Search Tree (BST)" ? 60 : 100),
                }))
            );
        };

        generateTreeTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 ">
            
            {/* Execution Time Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Execution Time (Simulated)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={treeData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#8884d8" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Bar dataKey="time" fill="#8884d8" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Time Complexity Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Time Complexity Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={treeData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#82ca9d" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Line type="monotone" dataKey="time" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Time Complexity Table */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg lg:col-span-3 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Time Complexity Table</h3>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-indigo-500 text-white dark:bg-gray-700">
                                <th className="border px-4 py-2">Algorithm</th>
                                <th className="border px-4 py-2">Best</th>
                                <th className="border px-4 py-2">Average</th>
                                <th className="border px-4 py-2">Worst</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Tree Traversals", best: "O(n)", avg: "O(n)", worst: "O(n)" },
                                { name: "Binary Search Tree (BST)", best: "O(log n)", avg: "O(log n)", worst: "O(n)" },
                                { name: "AVL Tree", best: "O(log n)", avg: "O(log n)", worst: "O(log n)" },
                                { name: "Lowest Common Ancestor (LCA)", best: "O(1)", avg: "O(log n)", worst: "O(n)" },
                            ].map((algo, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{algo.name}</td>
                                    <td className="border px-4 py-2">{algo.best}</td>
                                    <td className="border px-4 py-2">{algo.avg}</td>
                                    <td className="border px-4 py-2">{algo.worst}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default TreeResult;
