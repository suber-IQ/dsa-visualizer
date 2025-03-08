import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setProblemType } from "../../../redux/slices/backtrackingSlice";
import { RootState } from "../../../redux/store";

type BacktrackingState = RootState["backtracking"];

const backtrackingAlgorithms: Array<"None" | "NQueens" | "SudokuSolver"> = [
  "None",
  "NQueens",
  "SudokuSolver",
];

const BacktrackingSidebar = () => {
  const { problemType } = useSelector((state: RootState) => state.backtracking);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"None" | BacktrackingState["problemType"]>(
    problemType ?? "None"
  );

  const handleSelectAlgorithm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "None" | "NQueens" | "SudokuSolver";
    setSelectedAlgorithm(value);
    dispatch(setProblemType(value));
  };

  // const handleReset = () => {
    
  //   if (selectedAlgorithm === "NQueens") {
  //     dispatch(resetNQueens());
  //   } else if (selectedAlgorithm === "SudokuSolver") {
  //     dispatch(resetSudoku());
  //   }
  // };

  return (
    <div
      className={`fixed left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
      }`}
    >
      <div
        className={`bg-[#ffde59] text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Backtracking Controls</h2>

        {/* Algorithm Selection */}
        <label className="block text-sm mb-1">Select Algorithm:</label>
        <select
          className="w-full cursor-pointer p-2 border-2 dark:bg-gray-700 rounded mb-3"
          value={selectedAlgorithm || "None"}
          onChange={handleSelectAlgorithm}
        >
          {backtrackingAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        {/* Reset State Button */}
        {/* <button
          className="w-full bg-gray-500 hover:bg-gray-600 text-white p-2 rounded mt-2"
          onClick={handleReset}
        >
          Reset Algorithm
        </button> */}
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/7 -right-6 transform -translate-y-1/2 bg-[#ffde59] dark:bg-gray-800 text-[#9e5aff] dark:text-white p-2 rounded-full shadow-md"
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </div>
  );
};

export default BacktrackingSidebar;
