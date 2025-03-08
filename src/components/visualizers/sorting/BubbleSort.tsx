import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { RootState } from "../../../redux/store";
import { bubbleSort } from "../../../utils/sortingUtils";
import { setSorting } from "../../../redux/slices/sortingSlice";

const BubbleSort = () => {
  const dispatch = useDispatch();
  const { array, speed, sorting, barColors } = useSelector((state: RootState) => state.sorting);
  const [localArray, setLocalArray] = useState<number[]>(array);

  useEffect(() => {
    setLocalArray(array);
  }, [array]);

  const startSorting = useCallback(async () => {
    await bubbleSort([...array], dispatch, speed);
    dispatch(setSorting(false)); // Stop sorting after completion
  }, [array, dispatch, speed]); // ✅ Dependencies defined inside useCallback

  useEffect(() => {
    if (sorting) {
      startSorting();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]); // ✅ Only runs when sorting changes

  return (
    <div className="relative w-full overflow-x-auto p-4">
      <div className="flex justify-center items-end h-64 min-w-max">
        <div className="flex items-end gap-1">
          {localArray.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-6 transition-all duration-300 ${barColors[index]}`}
                style={{ height: `${value * 4}px` }}
              ></div>
              <span className="text-pink-800 text-sm mt-1">{value}</span> {/* Shows number below bars */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BubbleSort;
