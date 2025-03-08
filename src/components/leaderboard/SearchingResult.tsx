import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SearchingResult = () => {
    const initialData = [
        { name: "Linear Search", time: 0 },
        { name: "Binary Search", time: 0 },
    ];

    const [searchingData, setSearchingData] = useState(initialData);

    useEffect(() => {
        const generateSearchTimes = () => {
            setSearchingData([
                {
                    name: "Linear Search",
                    time: Math.random() * 100 + 50, // Linear takes more time
                },
                {
                    name: "Binary Search",
                    time: Math.random() * 10 + 5, // Binary takes significantly less time
                },
            ]);
        };

        generateSearchTimes();
    }, []);

    return (
        <div className="p-6 bg-[#ffde59] dark:bg-gray-900 rounded-lg shadow-lg w-full">
            {/* Speed Chart */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Searching Speed</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={searchingData}>
                        <XAxis dataKey="name" hide />
                        <YAxis stroke="#8884d8" />
                        <Tooltip wrapperStyle={{ color: "red" }} />
                        <Bar dataKey="time" fill="#8884d8" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Time Complexity Table */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Time Complexity Table</h3>
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 ">
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
                            { name: "Linear Search", best: "O(1)", avg: "O(n)", worst: "O(n)" },
                            { name: "Binary Search", best: "O(1)", avg: "O(log n)", worst: "O(log n)" },
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
    );
};

export default SearchingResult;
