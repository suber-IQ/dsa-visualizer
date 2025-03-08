import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setMathOperation } from "../../../redux/slices/mathSlice";
import { RootState } from "../../../redux/store";

type MathOperation = "None" | "GCD" | "PrimeFactors" | "Sieve";

const mathOperations: MathOperation[] = ["None", "GCD", "PrimeFactors", "Sieve"];

const MathSidebar = () => {
  const { operationType } = useSelector((state: RootState) => state.math);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOperation, setSelectedOperation] = useState<MathOperation>(operationType ?? "None");

  const handleSelectOperation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as MathOperation;
    setSelectedOperation(value);
    dispatch(setMathOperation(value));
  };

  return (
    <div
      className={`fixed left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
      }`}
    >
      <div className={`bg-[#ffde59] text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${isOpen ? "block" : "hidden"}`}>
        <h2 className="text-xl font-semibold mb-4">Math Operations</h2>

        {/* Operation Selection */}
        <label className="block text-sm mb-1">Select Operation:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-700 rounded mb-3"
          value={selectedOperation}
          onChange={handleSelectOperation}
        >
          {mathOperations.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
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

export default MathSidebar;
