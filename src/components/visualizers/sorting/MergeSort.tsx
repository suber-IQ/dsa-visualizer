import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { RootState } from "../../../redux/store";
import { mergeSort } from "../../../utils/sortingUtils";
import { setSorting } from "../../../redux/slices/sortingSlice";

const MergeSort = () => {
  const dispatch = useDispatch();
  const { array, speed, sorting, barColors, barPositions } = useSelector(
    (state: RootState) => state.sorting
  );
  const [localArray, setLocalArray] = useState<number[]>(array);

  useEffect(() => {
    setLocalArray(array);
  }, [array]);

  const startSorting = useCallback(async () => {
    await mergeSort([...array], dispatch, speed);
    dispatch(setSorting(false)); // Stop sorting after completion
  }, [array, dispatch, speed]); // ✅ Dependencies defined inside useCallback

  useEffect(() => {
    if (sorting) {
      startSorting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]); // ✅ Runs only when sorting state changes

  return (
    <div className="relative md:w-xl p-4 overflow-x-auto lg:overflow-x-visible">
      <div className="flex justify-center items-end h-64 min-w-max">
        <div className="flex items-end gap-1">
          {localArray.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Bar with number attached */}
              <div
                className={`w-6 flex flex-col items-center justify-end text-white font-bold transition-all duration-300 ${barColors[index]}`}
                style={{
                  height: `${value * 4}px`,
                  transform: `translate(${barPositions[index].x}px, ${barPositions[index].y}px)`,
                }}
              >
                <span className="text-sm ">{value}</span> {/* Number on the bar */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MergeSort;
