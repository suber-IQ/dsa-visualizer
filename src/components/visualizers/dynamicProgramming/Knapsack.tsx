import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../redux/slices/dpSlice";
import { RootState } from "../../../redux/store";
import { knapsack } from "../../../utils/dpUtils";

const Knapsack = () => {
  const dispatch = useDispatch();
  const { result } = useSelector((state: RootState) => state.dp);
  const [weights, setWeights] = useState<string>("2,3,4,5");
  const [values, setValues] = useState<string>("3,4,5,6");
  const [capacity, setCapacity] = useState<number | "">(5);
  const [table, setTable] = useState<number[][]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<number>(-1);
  const [currentCol, setCurrentCol] = useState<number>(-1);

  const handleCalculate = () => {
    const weightArray = weights.split(",").map(Number);
    const valueArray = values.split(",").map(Number);
    const capacityValue = capacity === "" ? NaN : Number(capacity);

    if (
      weightArray.length !== valueArray.length ||
      isNaN(capacityValue) ||
      capacityValue <= 0
    ) {
      return;
    }

    setRunning(true);
    setTable([]);
    setSelectedItems([]);
    setCurrentRow(-1);
    setCurrentCol(-1);
    
    setTimeout(() => {
      const { maxValue, dpTable, selectedItems } = knapsack(valueArray, weightArray, capacityValue);
      setTable(dpTable);
      setSelectedItems(selectedItems);
      dispatch(setInput({ weights: weightArray, values: valueArray, capacity: capacityValue }));
      dispatch(setResult(maxValue));
      setRunning(false);
    }, 1000);
  };

  useEffect(() => {
    if (table.length > 0) {
      let row = 0, col = 0;
      const interval = setInterval(() => {
        setCurrentRow(row);
        setCurrentCol(col);
        col++;
        if (typeof capacity === "number" && col > capacity) {
          col = 0;
          row++;
        }
        if (row >= table.length) clearInterval(interval);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [table, capacity]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">0/1 Knapsack Problem Visualizer</h2>
      <div className="flex flex-col lg:flex-row gap-2 mb-4">
        <input
          type="text"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={weights}
          onChange={(e) => setWeights(e.target.value)}
          placeholder="Enter weights (comma-separated)"
        />
        <input
          type="text"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={values}
          onChange={(e) => setValues(e.target.value)}
          placeholder="Enter values (comma-separated)"
        />
        <input
          type="number"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Enter capacity"
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={handleCalculate}
          disabled={running}
        >
          {running ? "Running..." : "Solve"}
        </button>
      </div>

      {/* <div className="mb-4 text-left">
        <h3 className="font-semibold">Weights:</h3>
        <p>{weights}</p>
        <h3 className="font-semibold">Values:</h3>
        <p>{values}</p>
      </div> */}

      {table.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <h3 className="text-lg font-semibold">Knapsack Table Visualization</h3>
          <table className="table-auto border-collapse border border-gray-500 mx-auto">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">Capacity</th>
                {Array.from({ length: table[0].length }).map((_, index) => (
                  <th key={index} className="border border-gray-500 p-2">{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  <td className="border border-gray-500 p-2 font-bold">{i}</td>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border border-gray-500 p-2 transition-all duration-500
                        ${currentRow === i && currentCol === j ? "bg-yellow-300" : ""}
                        ${selectedItems.includes(j) ? "bg-blue-400 text-white" : ""}
                      `}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
{result !== null && typeof result !== "object" && (
  <p className="mt-4 text-lg font-semibold">Optimal Value: {result}</p>
)}

    </div>
  );
};

export default Knapsack;
