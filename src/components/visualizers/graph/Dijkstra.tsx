import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { dijkstraTraversal } from "../../../utils/graphUtils";

const ROWS = 5;
const COLS = 7;

const Dijkstra = () => {
  const dispatch = useDispatch();
  const { algorithm, isRunning } = useSelector((state: RootState) => state.graph);
  
  const [grid, setGrid] = useState<number[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(1)));
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [distances, setDistances] = useState<Map<string, number>>(new Map());

  const START_NODE = useMemo(() => ({ row: 0, col: 0 }), []);
  const TARGET_NODE = { row: ROWS - 1, col: COLS - 1 };

  useEffect(() => {
    resetGrid();
  }, []);

  useEffect(() => {
    if (isRunning && algorithm === "Dijkstra") {
      dijkstraTraversal(START_NODE, setVisited, setDistances, dispatch);
    }
  }, [isRunning, algorithm, dispatch, START_NODE]);

  const resetGrid = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(1)));
    setVisited(new Set());
    setDistances(new Map());
  };

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-xl font-bold mb-4">Dijkstra's Algorithm Visualization</h1> */}

      <div className="grid grid-cols-7 gap-1 border-4 p-2 bg-gray-200 shadow-lg">
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            let bgColor = "bg-white";
            
            if (rowIndex === START_NODE.row && colIndex === START_NODE.col) {
              bgColor = "bg-green-500"; // Start Node
            } else if (rowIndex === TARGET_NODE.row && colIndex === TARGET_NODE.col) {
              bgColor = "bg-red-500"; // Target Node
            } else if (visited.has(`${rowIndex},${colIndex}`)) {
              bgColor = "bg-blue-300"; // Visited Nodes
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 border flex items-center justify-center ${bgColor}`}
              >
                {distances.get(`${rowIndex},${colIndex}`) ?? ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dijkstra;
