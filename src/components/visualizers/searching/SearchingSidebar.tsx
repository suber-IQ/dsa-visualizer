import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setAlgorithm,
  setArray,
  setTarget,
  startSearching,
  setSpeed,
} from "../../../redux/slices/searchingSlice";
import { RootState } from "../../../redux/store";
import CustomInput from "../../../ui/customComponents/CustomInput";
import CustomButton from "../../../ui/customComponents/CustomButton";


const searchingAlgorithms = ["Linear Search", "Binary Search"];

const SearchingSidebar = () => {
  const { speed, array } = useSelector((state: RootState) => state.searching);
  const dispatch = useDispatch();

  const [inputArray, setInputArray] = useState<string>(array.join(","));
  const [searchTarget, setSearchTarget] = useState<number | "">("");
  const [isOpen, setIsOpen] = useState(true);
  const [arraySize, setArraySize] = useState(10);
  const [algorithm, setAlgorithmState] = useState("Linear Search");

  const handleStartSearching = () => {
    if (searchTarget === "") {
      alert("Please enter a search target!");
      return;
    }

    const parsedArray = inputArray
      ? inputArray.split(",").map((num) => parseInt(num.trim(), 10))
      : [];

    dispatch(setArray(parsedArray));
    dispatch(setAlgorithm(algorithm));
    dispatch(setTarget(Number(searchTarget)));
    dispatch(setSpeed(speed));
    dispatch(startSearching());
  };

  return (
    <div
    className={`fixed z-50 overflow-y-auto md:overflow-y-visible left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)]  transition-all duration-300 ease-in-out ${
      isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
    }`}
    >
      <div
        className={`bg-[#ffde59] text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Searching Controls</h2>

        <CustomInput
          label="Enter Array (comma-separated):"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
        />

        <CustomInput
          label={`Speed: ${speed} ms`}
          type="range"
          min="10"
          max="1000"
          value={speed}
          onChange={(e) => dispatch(setSpeed(Number(e.target.value)))}
        />

        <CustomInput
          label={`Array Size: ${arraySize}`}
          type="range"
          min="5"
          max="25"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
        />

        <CustomInput
          label="Search Target:"
          type="number"
          value={searchTarget}
          onChange={(e) =>
            setSearchTarget(e.target.value ? parseInt(e.target.value, 10) : "")
          }
        />

        <label className="block text-sm mb-1">Select Searching Algorithm:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-800 rounded mb-3"
          value={algorithm}
          onChange={(e) => setAlgorithmState(e.target.value)}
        >
          {searchingAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        <CustomButton label="Start Searching" color="blue" onClick={handleStartSearching} />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2/3 md:top-1/3 md:-right-6 right-1 z-50 transform -translate-y-1/2 bg-[#ffde59] dark:bg-gray-800 text-[#9e5aff] dark:text-white p-2 rounded-full shadow-md"
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </div>
  );
};

export default SearchingSidebar;