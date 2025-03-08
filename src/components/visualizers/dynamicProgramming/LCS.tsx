import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProblemType, setInput, setResult } from "../../../redux/slices/dpSlice";
import { RootState } from "../../../redux/store";
import { lcs } from "../../../utils/dpUtils";

const LCS = () => {
  const dispatch = useDispatch();
  const {  result, computed } = useSelector((state: RootState) => state.dp);

  const [text1, setText1] = useState("abcde");
  const [text2, setText2] = useState("ace");
  const [table, setTable] = useState<number[][]>([]);
  const [running, setRunning] = useState(false);
  const [highlightCell, setHighlightCell] = useState<{ row: number; col: number } | null>(null);

  const handleCalculate = () => {
    if (text1.length === 0 || text2.length === 0) return;

    setRunning(true);
    setTable([]);
    
    dispatch(setProblemType("LCS"));
    dispatch(setInput([text1, text2]));

    setTimeout(() => {
      const { length, dpTable, sequence } = lcs(text1, text2);
      setTable(dpTable);
      dispatch(setResult({ length, sequence }));
      setRunning(false);
    }, 1000);
  };

  useEffect(() => {
    if (table.length > 0) {
      let i = 0, j = 0;
      const interval = setInterval(() => {
        setHighlightCell({ row: i, col: j });
        if (j < text2.length) {
          j++;
        } else {
          j = 0;
          i++;
        }
        if (i >= text1.length) clearInterval(interval);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [table, text1.length, text2.length]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Longest Common Subsequence Visualizer</h2>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white mr-2"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Enter first string"
        />
        <input
          type="text"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white mr-2"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="Enter second string"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={handleCalculate}
          disabled={running}
        >
          {running ? "Running..." : "Solve"}
        </button>
      </div>

      {computed && result && typeof result === "object" && "sequence" in result && (
  <p className="mt-4 text-lg font-semibold">
    LCS Length: {result.length}, Sequence: {result.sequence}
  </p>
)}


      {table.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table-auto border-collapse border border-gray-500 mx-auto">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2"></th>
                {text2.split("").map((char, index) => (
                  <th key={index} className="border border-gray-500 p-2">{char}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  <td className="border border-gray-500 p-2 font-bold">
                    {i > 0 ? text1[i - 1] : ""}
                  </td>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border border-gray-500 p-2 transition-all duration-500 
                        ${highlightCell?.row === i && highlightCell?.col === j ? "bg-yellow-300" : ""}
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
    </div>
  );
};

export default LCS;
