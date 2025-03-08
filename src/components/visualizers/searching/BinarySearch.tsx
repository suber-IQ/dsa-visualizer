import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { stopSearching } from "../../../redux/slices/searchingSlice";
import { binarySearch } from "../../../utils/searchingUtils";

const BinarySearch = () => {
  const dispatch = useDispatch();
  const { array, target, speed, isSearching } = useSelector(
    (state: RootState) => state.searching
  );

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!isSearching || target === null || array.length === 0) return;

    // Step 1: Map original indices and sort array
    const indexedArray = array.map((value, index) => ({ value, index }));
    const sortedArray = [...indexedArray].sort((a, b) => a.value - b.value);
    const sortedValues = sortedArray.map((item) => item.value);

    // Step 2: Perform binary search on sorted values
    const searchSteps = binarySearch(sortedValues, target);

    let i = 0;
    const interval = setInterval(() => {
      if (i < searchSteps.length) {
        const sortedIndex = searchSteps[i].index;
        const originalIndex = sortedIndex !== null ? sortedArray[sortedIndex].index : null;

        setCurrentIndex(originalIndex);
        setMessage(
          originalIndex !== null
            ? `Checking original index ${originalIndex}`
            : "Target not found"
        );
        i++;
      } else {
        clearInterval(interval);
        dispatch(stopSearching());
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isSearching, target, array, speed, dispatch]);

  return (
    <div className="flex flex-wrap items-center mt-3 p-3">
      <div className="flex flex-wrap w-full gap-2">
        {array.map((num, index) => (
          <div
            key={index}
            className={`p-3 text-center border rounded ${
              currentIndex === index ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-bold">{message}</p>
    </div>
  );
};

export default BinarySearch;
