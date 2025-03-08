import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lis } from "../../../utils/dpUtils";
import { setResult, setProblemType } from "../../../redux/slices/dpSlice";
import { RootState } from "../../../redux/store";

const LIS = () => {
  const dispatch = useDispatch();
  const result = useSelector((state: RootState) => state.dp.result);
  const [input, setInput] = useState("10,22,9,33,21,50,41,60,80");
  const [steps, setSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [nums, setNums] = useState<number[]>([]);

  useEffect(() => {
    if (steps.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < steps.length) {
          setCurrentStep(steps[index]);
          setStepIndex(index);
          setActiveIndex(index); // Highlight the processing index
          index++;
        } else {
          clearInterval(interval);
          setActiveIndex(null); // Reset highlight after completion
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [steps]);

  const handleCalculate = () => {
    const numArray = input.split(",").map(Number);
    setNums(numArray);
    const lisResult = lis(numArray);
    
    dispatch(setProblemType("LIS"));
    dispatch(setResult({ length: lisResult.length, sequence: lisResult.sequence.join(", ") }));

    setSteps(lisResult.steps);
    setCurrentStep([]);
    setStepIndex(0);
    setActiveIndex(null);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Longest Increasing Subsequence Visualization</h2>
      <input
        type="text"
        className="p-2 border rounded dark:bg-gray-700 dark:text-white mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers separated by commas"
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={handleCalculate}
      >
        Solve
      </button>

      {/* Display Numbers with Indexes */}
      <div className="mt-4 flex justify-center space-x-2">
        {nums.map((num, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-white text-lg font-bold 
            ${activeIndex === index ? "bg-yellow-400" : "bg-gray-500"} transition-all`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Display Step-by-Step DP Updates */}
      {steps.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Step {stepIndex + 1}:</h3>
          <div className="flex justify-center space-x-2">
            {currentStep.map((value, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-white text-lg font-bold 
                ${activeIndex === index ? "bg-green-500" : "bg-gray-700"} transition-all`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final LIS Result */}
      {result && typeof result === "object" && "sequence" in result && (
        <p className="mt-4 text-lg font-semibold text-green-500">
          LIS Sequence: {result.sequence}
        </p>
      )}
    </div>
  );
};

export default LIS;
