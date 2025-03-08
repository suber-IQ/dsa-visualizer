import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const DPResult = () => {
    // Initial dataset for DP algorithms
    const initialData = [
        { name: "Fibonacci", time: 0 },
        { name: "Knapsack", time: 0 },
        { name: "LCS", time: 0 },
        { name: "LIS", time: 0 },
    ];

    const [dpData, setDPData] = useState(initialData);

    useEffect(() => {
        // Generate random execution times for algorithms
        const generateDPTimes = () => {
            setDPData((prevData) =>
                prevData.map((entry) => ({
                    ...entry,
                    time: Math.random() * (entry.name === "Fibonacci" ? 50 : entry.name === "Knapsack" ? 100 : 80),
                }))
            );
        };

        generateDPTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 ">
            
            {/* Execution Time Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Execution Time (Simulated)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dpData}>
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
                    <LineChart data={dpData}>
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
                                { name: "Fibonacci (DP)", best: "O(n)", avg: "O(n)", worst: "O(n)" },
                                { name: "Knapsack (0/1)", best: "O(nW)", avg: "O(nW)", worst: "O(nW)" },
                                { name: "LCS", best: "O(mn)", avg: "O(mn)", worst: "O(mn)" },
                                { name: "LIS", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" },
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

export default DPResult;
