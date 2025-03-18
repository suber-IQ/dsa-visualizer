import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { RootState } from "../../../redux/store";
import { selectionSort } from "../../../utils/sortingUtils";
import { setSorting } from "../../../redux/slices/sortingSlice";

const SelectionSort = () => {
  const dispatch = useDispatch();
  const { array, speed, sorting, barColors } = useSelector((state: RootState) => state.sorting);
  const [localArray, setLocalArray] = useState<number[]>(array);

  // Update local array whenever Redux state array changes
  useEffect(() => {
    setLocalArray(array);
  }, [array]);

  // Function to start sorting
  const startSorting = useCallback(async () => {
    dispatch(setSorting(true));  // Start sorting process
    await selectionSort([...array], dispatch, speed); // Run selection sort with array and speed
    dispatch(setSorting(false)); // Stop sorting after completion
  }, [array, dispatch, speed]); // Only run when array or speed changes

  // Start sorting when sorting state is true
  useEffect(() => {
    if (sorting) {
      startSorting();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]); // Only run when sorting changes

  return (
    <div className="relative w-full overflow-x-auto p-4">
      <div className="flex justify-center items-end h-64 min-w-max">
        <div className="flex items-end gap-1">
          {/* Render bars based on array and their respective colors */}
          {localArray.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Each bar is styled according to value and color */}
              <div
                className={`w-6 transition-all duration-300 ${barColors[index]}`}
                style={{ height: `${value * 4}px` }}
              ></div>
              {/* Show the value of the bar beneath it */}
              <span className="text-pink-800 dark:text-yellow-500 text-sm mt-1">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionSort;
