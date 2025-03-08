import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const GraphResult = () => {
    const initialData = [
        { name: "BFS", time: 0 },
        { name: "DFS", time: 0 },
        { name: "Dijkstra", time: 0 },
        { name: "Kruskal", time: 0 },
        { name: "Prim's", time: 0 },
    ];

    const [graphData, setGraphData] = useState(initialData);

    useEffect(() => {
        const generateGraphTimes = () => {
            setGraphData([
                { name: "BFS", time: Math.random() * 100 + 50 },  // O(V + E)
                { name: "DFS", time: Math.random() * 100 + 50 },  // O(V + E)
                { name: "Dijkstra", time: Math.random() * 200 + 100 },  // O((V + E) log V)
                { name: "Kruskal", time: Math.random() * 250 + 120 },  // O(E log V)
                { name: "Prim's", time: Math.random() * 250 + 120 },  // O(E log V)
            ]);
        };

        generateGraphTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full flex flex-col lg:grid lg:grid-cols-2 gap-6">
            
            {/* Algorithm Execution Time Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Algorithm Execution Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={graphData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#8884d8" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Bar dataKey="time" fill="#8884d8" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Time Complexity Line Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Time Complexity</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={graphData}>
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
                                { name: "BFS", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)" },
                                { name: "DFS", best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)" },
                                { name: "Dijkstra", best: "O((V + E) log V)", avg: "O((V + E) log V)", worst: "O((V + E) log V)" },
                                { name: "Kruskal", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)" },
                                { name: "Prim's", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)" },
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

export default GraphResult;
