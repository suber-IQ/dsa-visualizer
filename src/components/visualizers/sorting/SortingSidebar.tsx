import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateArray,
  updateSpeed,
  updateAlgorithm,
  setSorting,
  setSortingAlgorithm1,
  setSortingAlgorithm2,
} from "../../../redux/slices/sortingSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../../ui/customComponents/CustomButton";
import CustomInput from "../../../ui/customComponents/CustomInput";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sortingAlgorithms = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
];

const SortingSidebar = () => {
  const dispatch = useDispatch();
  const { array, arraySize, speed, algorithm1, algorithm2, sorting } = useSelector(
    (state: RootState) => state.sorting
  );

  const [inputArray, setInputArray] = useState<string>(array.join(","));
  const [isOpen, setIsOpen] = useState(true);

  // Handle input array update
  const handleApplyArray = () => {
    const parsedArray = inputArray
      .split(",")
      .map((item) => parseInt(item.trim()))
      .filter((item) => !isNaN(item));
    if (parsedArray.length > 0) {
      dispatch(updateArray(parsedArray));
    } else {
      alert("Please enter a valid array of numbers.");
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSpeed(Number(e.target.value)));
  };

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    const newArray = Array.from({ length: newSize }, () => Math.floor(Math.random() * 50));
    dispatch(updateArray(newArray));
  };

  const handleAlgorithmChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    algorithm: "algorithm1" | "algorithm2"
  ) => {
    dispatch(updateAlgorithm({ [algorithm]: e.target.value }));
  };

  const handleSortingToggle = () => {
    dispatch(setSorting(!sorting));
    dispatch(setSortingAlgorithm1(!sorting));
    dispatch(setSortingAlgorithm2(!sorting));
  };

  return (
    <div
      className={`fixed z-50 overflow-y-auto md:overflow-y-visible left-0 top-1/7 md:top-1/6 h-[calc(100vh-60px)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-1/8 min-w-[250px]" : "w-[50px]"
      }`}
    >
      <div
        className={`bg-[#ffde59] text-[#9e5aff] dark:bg-gray-800 dark:text-white p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Sorting Controls</h2>
        <div className="flex flex-col gap-2">
          <CustomInput
            label="Enter Array (comma-separated):"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
          />
          <CustomButton
            label="Apply Array"
            onClick={handleApplyArray}
            color="blue"
            disabled={sorting}
          />
        </div>

        <CustomInput
          label={`Speed: ${speed} ms`}
          type="range"
          min="10"
          max="1000"
          value={speed}
          onChange={handleSpeedChange}
        />

        <CustomInput
          label={`Array Size: ${arraySize}`}
          type="range"
          min="5"
          max="50"
          value={arraySize}
          onChange={handleArraySizeChange}
        />

        <label className="block text-sm mb-1">Algorithm 1:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-800 rounded mb-3"
          value={algorithm1}
          onChange={(e) => handleAlgorithmChange(e, "algorithm1")}
        >
          {sortingAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1">Algorithm 2:</label>
        <select
          className="w-full p-2 border-2 dark:bg-gray-800 rounded mb-3"
          value={algorithm2}
          onChange={(e) => handleAlgorithmChange(e, "algorithm2")}
        >
          <option value="none">None</option>
          {sortingAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-2 mt-2">
          <CustomButton
            label="Start Sorting"
            onClick={handleSortingToggle}
            color="green"
            disabled={sorting || !algorithm1 || algorithm2 === "none"}
          />
        </div>
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

export default SortingSidebar;
