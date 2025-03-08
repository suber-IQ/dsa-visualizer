import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setProblemType, resetGreedyState } from "../../../redux/slices/greedySlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../../ui/customComponents/CustomButton";

type GreedyState = RootState["greedy"];

const greedyAlgorithms: Array<"None" | "ActivitySelection" | "HuffmanCoding"> = [
  "None",
  "ActivitySelection",
  "HuffmanCoding",
];

const GreedySidebar = () => {
  const { problemType } = useSelector((state: RootState) => state.greedy);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"None" | GreedyState["problemType"]>(
    problemType ?? "None"
  );

  const handleSelectAlgorithm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "None" | "ActivitySelection" | "HuffmanCoding";
    setSelectedAlgorithm(value);
    if (value !== "None") {
      dispatch(setProblemType(value));
    }
  };

  return (
    <div
      className={`fixed z-40 left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
      }`}
    >
      <div
        className={`bg-[#ffde59] text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Greedy Controls</h2>

        {/* Algorithm Selection */}
        <label className="block text-sm mb-1">Select Algorithm:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-700 rounded mb-3"
          value={selectedAlgorithm || "None"}
          onChange={handleSelectAlgorithm}
        >
          {greedyAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        {/* Reset Greedy State Button */}
        <CustomButton
        color="red"
        label="Reset Greedy State"
          onClick={() => dispatch(resetGreedyState())}
        />
         
        
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

export default GreedySidebar;
