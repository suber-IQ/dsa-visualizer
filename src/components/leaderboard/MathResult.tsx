import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const MathResult = () => {
    // Initial dataset for Math Algorithms
    const initialData = [
        { name: "GCD", time: 0 },
        { name: "Prime Factorization", time: 0 },
        { name: "Sieve of Eratosthenes", time: 0 },
    ];

    const [mathData, setMathData] = useState(initialData);

    useEffect(() => {
        // Generate random execution times for mathematical algorithms
        const generateMathTimes = () => {
            setMathData((prevData) =>
                prevData.map((entry) => ({
                    ...entry,
                    time: Math.random() * (entry.name === "Sieve of Eratosthenes" ? 50 : entry.name === "Prime Factorization" ? 70 : 30),
                }))
            );
        };

        generateMathTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 ">
            
            {/* Execution Time Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Execution Time (Simulated)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mathData}>
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
                    <LineChart data={mathData}>
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
                                { name: "GCD", best: "O(log n)", avg: "O(log n)", worst: "O(log n)" },
                                { name: "Prime Factorization", best: "O(sqrt n)", avg: "O(sqrt n)", worst: "O(n)" },
                                { name: "Sieve of Eratosthenes", best: "O(n log log n)", avg: "O(n log log n)", worst: "O(n log log n)" },
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

export default MathResult;
