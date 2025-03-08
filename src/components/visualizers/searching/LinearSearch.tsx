import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { stopSearching } from "../../../redux/slices/searchingSlice";
import { linearSearch } from "../../../utils/searchingUtils";

const LinearSearch = () => {
  const dispatch = useDispatch();
  const { array, target, speed, isSearching } = useSelector(
    (state: RootState) => state.searching
  );

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isSearching && target !== null) {
      const searchSteps = linearSearch(array, target);

      let i = 0;
      const interval = setInterval(() => {
        if (i < searchSteps.length) {
          setCurrentIndex(searchSteps[i].index);
          setMessage(searchSteps[i].message);
          i++;
        } else {
          clearInterval(interval);
          dispatch(stopSearching());
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isSearching, target, array, speed, dispatch]);

  return (
    <div className="flex flex-wrap items-center mt-3 p-3">
      {/* <h3 className="text-lg font-semibold mb-2">Linear Search</h3> */}
      <div className="flex flex-wrap w-full gap-2">
        {array.map((num, index) => (
          <div
            key={index}
            className={`p-3 text-center border rounded ${
              currentIndex === index ? "bg-green-400 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm">{message}</p>
    </div>
  );
};

export default LinearSearch;
