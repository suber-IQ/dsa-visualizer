import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setProblemType, resetDPState } from "../../../redux/slices/dpSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../../ui/customComponents/CustomButton";

type DPState = RootState["dp"];

const dpAlgorithms: Array<"None" | "Fibonacci" | "Knapsack" | "LCS" | "LIS"> = [
  "None",
  "Fibonacci",
  "Knapsack",
  "LCS",
  "LIS",
];

const DpSidebar = () => {
  const { problemType } = useSelector((state: RootState) => state.dp);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"None" | DPState["problemType"]>(
    problemType ?? "None"
  );

  const handleSelectAlgorithm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "None" | "Fibonacci" | "Knapsack" | "LCS" | "LIS";
    setSelectedAlgorithm(value);
    if (value !== "None") {
      dispatch(setProblemType(value));
    }
  };

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
        <h2 className="text-xl font-semibold mb-4">DP Controls</h2>

        {/* Algorithm Selection */}
        <label className="block text-sm mb-1">Select Algorithm:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-700 rounded mb-3"
          value={selectedAlgorithm || "None"}
          onChange={handleSelectAlgorithm}
        >
          {dpAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        {/* Reset DP State Button */}
        <CustomButton
        color="red"
        label="Reset DP State"
          onClick={() => dispatch(resetDPState())}
       / >


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

export default DpSidebar;