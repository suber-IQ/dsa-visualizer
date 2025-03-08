import { Medal } from "lucide-react";
import { useParams } from "react-router";
import SortingResult from "../components/leaderboard/SortingResult";
import SearchingResult from "../components/leaderboard/SearchingResult";
import GraphResult from "../components/leaderboard/GraphResult";
import DPResult from "../components/leaderboard/DPResult";
import GreedyResult from "../components/leaderboard/GreedyResult";
import BacktrackingResult from "../components/leaderboard/BacktrackingResult";
import TreeResult from "../components/leaderboard/TreeResult";
import MathResult from "../components/leaderboard/MathResult";
import { JSX } from "react";

const Leaderboard = () => {
    const param = useParams();

    // Mapping visualizer param to respective components
    const leaderboardComponents: Record<string, JSX.Element> = {
        "sorting": <SortingResult />,
        "searching": <SearchingResult />,
        "graph": <GraphResult />,
        "dynamic-programming": <DPResult />,
        "greedy": <GreedyResult />,
        "backtracking": <BacktrackingResult />,
        "tree": <TreeResult />,
        "mathematical": <MathResult />,
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Leaderboard Sidebar */}
            <div className="fixed flex top-20 left-2 z-10 md:top-16 md:mt-2 md:left-auto rounded-lg md:rounded-none p-3 text-sm border-r-amber-700 md:border-none border-r-4 md:pt-6 md:pl-8 gap-2 bg-[#ffde59] dark:bg-gray-900 md:h-[100vh] md:w-60 shadow-lg">
                <Medal className="text-blue-600 dark:text-blue-300 animate-bounce" />
                <h2 className="text-indigo-600 dark:text-indigo-300 font-bold">Leaderboard</h2>
            </div>
            
            {/* Content */}
            <div className="flex-grow flex flex-col justify-center items-center mt-24 md:ml-64 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {param.visualizer
                        ? `${param.visualizer.replace("-", " ")} Algorithm Leaderboard`
                        : "Algorithm Leaderboard"}
                </h1>
                <div className="w-full">
                    {leaderboardComponents[param.visualizer || "sorting"] || <SortingResult />}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
