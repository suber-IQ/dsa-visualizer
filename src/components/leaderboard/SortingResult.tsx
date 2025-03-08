import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const SortingResult = () => {
    const initialData = [
        { name: "Bubble Sort", time: 0 },
        { name: "Insertion Sort", time: 0 },
        { name: "Selection Sort", time: 0 },
        { name: "Merge Sort", time: 0 },
        { name: "Quick Sort", time: 0 },
    ];

    const [sortingData, setSortingData] = useState(initialData);

    useEffect(() => {
        const generateSortingTimes = () => {
            setSortingData([
                { name: "Bubble Sort", time: Math.random() * 120 + 150 }, // Always highest
                { name: "Insertion Sort", time: Math.random() * 100 + 120 },
                { name: "Selection Sort", time: Math.random() * 90 + 100 },
                { name: "Merge Sort", time: Math.random() * 40 + 50 }, // Always lower
                { name: "Quick Sort", time: Math.random() * 30 + 40 }, // Always lower
            ]);
        };

        generateSortingTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 ">
            
            {/* Speed Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Sorting Speed</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={sortingData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#8884d8" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Bar dataKey="time" fill="#8884d8" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Time Complexity Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Time Complexity</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={sortingData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#82ca9d" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Line type="monotone" dataKey="time" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Sorting Algorithm Time Complexity Table */}
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
                                { name: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
                                { name: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
                                { name: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
                                { name: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
                                { name: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" },
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

export default SortingResult;
