import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSudokuSolution, resetSudoku } from "../../../redux/slices/backtrackingSlice";
import { solveSudokuWithVisualization, generateRandomSudoku } from "../../../utils/backtrackingUtils";
import CustomButton from "../../../ui/customComponents/CustomButton";

const SudokuSolver: React.FC = () => {
  const dispatch = useDispatch();
  const { board} = useSelector((state: RootState) => state.backtracking.sudoku);
  const [localBoard, setLocalBoard] = useState<number[][]>([]);
  const [visualizationSteps, setVisualizationSteps] = useState<number[][][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solving, setSolving] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number; type: "random" | "solved" }[]>([]);
  const [isPuzzleGenerated, setIsPuzzleGenerated] = useState(false);

  useEffect(() => {
    if (board.length) {
      setLocalBoard(board);
    }
  }, [board]);

  const handleSolve = async () => {
    setSolving(true);
    const steps = await solveSudokuWithVisualization(localBoard);
    if (steps.length) {
      setVisualizationSteps(steps);
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    if (solving && visualizationSteps.length > 0 && currentStep < visualizationSteps.length) {
      const timer = setTimeout(() => {
        setLocalBoard(visualizationSteps[currentStep]);
        const changedCells = visualizationSteps[currentStep].flatMap((row, i) =>
          row.map((cell, j) =>
            cell !== localBoard[i][j] ? { row: i, col: j, type: cell === 0 ? "random" : "solved" } : null
          )
        ).filter(Boolean) as { row: number; col: number; type: "random" | "solved" }[];

        setHighlightedCells(changedCells);
        setCurrentStep((prev) => prev + 1);
        if (currentStep === visualizationSteps.length - 1) {
          setSolving(false);
          dispatch(setSudokuSolution(visualizationSteps[currentStep]));
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentStep, visualizationSteps, solving, dispatch, localBoard]);

  const handleReset = () => {
    dispatch(resetSudoku());
    setLocalBoard([]);
    setVisualizationSteps([]);
    setCurrentStep(0);
    setSolving(false);
    setIsPuzzleGenerated(false);
  };

  const handleGeneratePuzzle = () => {
    setLocalBoard(generateRandomSudoku(9));
    setIsPuzzleGenerated(true);
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-bold text-center text-gray-900 dark:text-white">Sudoku Solver</h2>
      <p className="text-center text-sm text-gray-700 dark:text-gray-300">Solve the given Sudoku puzzle step by step with visualization.</p>
      <div className="grid grid-cols-9 gap-1 mt-4">
        {localBoard.map((row, i) =>
          row.map((cell, j) => {
            const isRandom = highlightedCells.some(hc => hc.row === i && hc.col === j && hc.type === "random");
            const isSolved = highlightedCells.some(hc => hc.row === i && hc.col === j && hc.type === "solved");
            return (
              <input
                key={`${i}-${j}`}
                type="text"
                value={cell !== 0 ? cell : ""}
                className={`w-10 h-10 border text-center text-lg rounded-sm focus:outline-none dark:bg-gray-700 dark:text-white 
                  ${(i + 1) % 3 === 0 && i !== 8 ? "border-b-2" : ""} ${(j + 1) % 3 === 0 && j !== 8 ? "border-r-2" : ""}
                  ${isRandom ? "text-blue-500" : ""} 
                  ${isSolved ? "text-orange-500" : ""}`}
                maxLength={1}
                disabled={isSolved}
              />
            );
          })
        )}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {/* <button onClick={handleSolve} disabled={!isPuzzleGenerated || solving} className={`p-2 rounded ${!isPuzzleGenerated ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>{solving ? "Solving..." : "Solve"}</button>

        <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Reset</button>

        <button onClick={handleGeneratePuzzle} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Generate Random Puzzle</button> */}

        <CustomButton 
         onClick={handleSolve}
         disabled={!isPuzzleGenerated || solving}
         color="blue"
         label={`${solving ? "Solving..." : "Solve"}`}
        />
        <CustomButton
        label="Reset"
        color="red"
        onClick={handleReset}
         />
        <CustomButton 
        color="green"
        onClick={handleGeneratePuzzle}
        label="Generate Random Puzzle"
        />
      </div>
    </div>
  );
};

export default SudokuSolver;
