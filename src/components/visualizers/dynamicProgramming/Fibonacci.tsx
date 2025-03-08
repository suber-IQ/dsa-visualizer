import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../redux/slices/dpSlice";
import { RootState } from "../../../redux/store";
import { fibonacci } from "../../../utils/dpUtils";

const Fibonacci = () => {
  const dispatch = useDispatch();
  const { input, result } = useSelector((state: RootState) => state.dp);
  const [number, setNumber] = useState<number | "">("");
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    if (number !== "" && number >= 0) {
      const calculateFibonacci = async () => {
        const seq: number[] = [];
        for (let i = 0; i <= Number(number); i++) {
          seq.push(fibonacci(i));
          setSequence([...seq]);
          setCurrentIndex(i);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        dispatch(setInput(Number(number)));
        dispatch(setResult(seq[seq.length - 1]));
      };
      calculateFibonacci();
    }
  }, [number, dispatch]);

  return (
    <div className="p-4 bg-[#fff4f0] md:max-w-4/5 dark:bg-gray-700 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Fibonacci Sequence Visualizer</h2>
      <input
        type="number"
        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={number}
        onChange={(e) => setNumber(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Enter a number"
      />
      {/* <button
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={() => setNumber(number)}
      >
        Calculate
      </button> */}
<p className="mt-4 text-lg font-semibold">
  Fibonacci({typeof input === "object" ? JSON.stringify(input) : input}) = {typeof result === "object" ? JSON.stringify(result) : result}
</p>



      <div className="mt-6 flex flex-wrap gap-2 justify-center items-end space-x-2">
        {sequence.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-sm font-semibold">{index}</span>
            <div
              className={`p-2 flex items-center justify-center 
              rounded-md transition-all duration-500 
              ${currentIndex === index ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fibonacci;
