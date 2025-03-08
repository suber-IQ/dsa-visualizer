import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setAlgorithm,
  startTraversal,
  // stopTraversal,
  resetGraph,
} from "../../../redux/slices/graphSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../../ui/customComponents/CustomButton";

type GraphState = RootState["graph"];

// Added "None" option
const graphAlgorithms: Array<"None" | "BFS" | "DFS" | "Dijkstra" | "Kruskal" | "Prim"> = [
  "None",
  "BFS",
  "DFS",
  "Dijkstra",
  "Kruskal",
  "Prim",
];

const GraphSidebar = () => {
  const { algorithm, isRunning } = useSelector((state: RootState) => state.graph);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"None" | GraphState["algorithm"]>(
    algorithm ?? "None"
  );
  const handleStartTraversal = () => {
    if (selectedAlgorithm !== "None") {
      dispatch(setAlgorithm(selectedAlgorithm));
      setTimeout(() => dispatch(startTraversal()), 100);
    }
  };

  return (
    <div
      className={`fixed z-40 left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
      }`}
    >
      <div
        className={`bg-[#ffde59] flex flex-col gap-1 text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Graph Controls</h2>

        {/* Algorithm Selection */}
        <label className="block text-sm mb-1">Select Algorithm:</label>
        <select
  className="w-full p-2 border-2 dark:bg-gray-700 rounded mb-3"
  value={selectedAlgorithm || "None"} // Ensure it never becomes null
  onChange={(e) => setSelectedAlgorithm(e.target.value as "None" | GraphState["algorithm"])}
  disabled={isRunning}
>
  {graphAlgorithms.map((algo) => (
    <option key={algo} value={algo}>
      {algo}
    </option>
  ))}
</select>


        {/* Start Algorithm Button */}
          {/* Start Algorithm Button */}
          <CustomButton
          color="blue"
          label={` ${isRunning ? "Running..." : "Start Algorithm"}`}
          onClick={handleStartTraversal}
          disabled={isRunning || selectedAlgorithm === "None"}
        />
         
        {/* Stop Algorithm Button */}
        {/* <button
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
          onClick={() => dispatch(stopTraversal())}
          disabled={!isRunning}
        >
          Stop Algorithm
        </button> */}

      {/* Reset Graph Button */}
      <CustomButton
      color="red"
      label="Reset Graph"
          onClick={() => dispatch(resetGraph())}
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

export default GraphSidebar;
