import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setNQueensSolution, resetNQueens } from "../../../redux/slices/backtrackingSlice";
import { solveNQueensWithVisualization } from "../../../utils/backtrackingUtils";
import CustomButton from "../../../ui/customComponents/CustomButton";

const NQueens: React.FC = () => {
  const dispatch = useDispatch();
  const { solution, isSolved } = useSelector((state: RootState) => state.backtracking.nQueens);
  const [nSize, setNSize] = useState(8);
  const [visualizationSteps, setVisualizationSteps] = useState<number[][][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solving, setSolving] = useState(false);
  const [solutionCount, setSolutionCount] = useState(0);
  const [localBoard, setLocalBoard] = useState<number[][]>(Array.from({ length: nSize }, () => Array(nSize).fill(0)));

  useEffect(() => {
    setLocalBoard(Array.from({ length: nSize }, () => Array(nSize).fill(0)));
    setSolutionCount(0);
  }, [nSize]);

  useEffect(() => {
    if (solution.length) {
      setLocalBoard(solution);
    }
  }, [solution]);

  const handleSolve = async () => {
    setSolving(true);
    setSolutionCount(0);
    const { steps, count } = solveNQueensWithVisualization(nSize);
    if (steps.length) {
      setVisualizationSteps(steps);
      setSolutionCount(count);
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    if (solving && visualizationSteps.length > 0 && currentStep < visualizationSteps.length) {
      const timer = setTimeout(() => {
        setLocalBoard(visualizationSteps[currentStep]);
        setCurrentStep((prev) => prev + 1);
        if (currentStep === visualizationSteps.length - 1) {
          setSolving(false);
          dispatch(setNQueensSolution(visualizationSteps[currentStep]));
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, visualizationSteps, solving, dispatch]);

  const handleReset = () => {
    dispatch(resetNQueens());
    setLocalBoard(Array.from({ length: nSize }, () => Array(nSize).fill(0)));
    setVisualizationSteps([]);
    setCurrentStep(0);
    setSolving(false);
    setSolutionCount(0);
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-bold text-center text-gray-900 dark:text-white">N-Queens Solver</h2>

      {/* Input field for dynamic board size */}
      <div className="flex justify-center gap-2 mt-4">
        <input
          type="number"
          min="4"
          max="15"
          value={nSize}
          onChange={(e) => setNSize(parseInt(e.target.value, 10) || 4)}
          className="w-20 p-1 border rounded dark:bg-gray-700 dark:text-white"
          disabled={solving}
        />
        <span className="text-gray-700 dark:text-gray-300">x {nSize}</span>
      </div>

      {/* Chessboard Grid */}
      <div className="grid mt-4" style={{ gridTemplateColumns: `repeat(${nSize}, 40px)`, gap: "4px", justifyContent: "center" }}>
        {localBoard.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-10 h-10 flex items-center justify-center border text-lg rounded-sm
                ${cell === 1 ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"}
                ${(i + j) % 2 === 0 ? "dark:bg-gray-600 bg-gray-300" : ""}`}
            >
              {cell === 1 ? "♛" : ""}
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-4 gap-2">

        <CustomButton 
        color="blue"
        label={`${solving ? "Solving..." : "Solve"}`}
        onClick={handleSolve}
        disabled={solving}
        />
        <CustomButton 
        color="red"
        label="Reset"
        onClick={handleReset}
        />
      </div>

      {/* Show Final Result */}
      {isSolved && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-bold">✅ Solution Found!</p>
          <p className="text-gray-700 dark:text-gray-300">Total Paths Explored: {solutionCount}</p>
        </div>
      )}
    </div>
  );
};

export default NQueens;
