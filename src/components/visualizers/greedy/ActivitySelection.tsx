import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProblemType, setSelectedActivities } from "../../../redux/slices/greedySlice";
// import { RootState } from "../../../redux/store";
import { activitySelection } from "../../../utils/greedyUtils";
import CustomButton from "../../../ui/customComponents/CustomButton";

interface Activity {
  start: number;
  end: number;
}

const ActivitySelection = () => {
  const dispatch = useDispatch();
//   const selectedActivities = useSelector((state: RootState) => state.greedy.selectedActivities);
  const [input, setInput] = useState("1-3, 2-5, 4-6, 6-8, 5-9, 8-11");
  const [sortedActivities, setSortedActivities] = useState<Activity[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [finalSelection, setFinalSelection] = useState<Activity[]>([]);

  useEffect(() => {
    if (sortedActivities.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setHighlightedIndex(index);
        index++;
        if (index >= sortedActivities.length) clearInterval(interval);
      }, 500); // Highlight one by one

      return () => clearInterval(interval);
    }
  }, [sortedActivities]);

  const handleCalculate = () => {
    const activities: Activity[] = input
      .split(",")
      .map((pair) => pair.trim().split("-").map(Number))
      .map(([start, end]) => ({ start, end }));

    const sorted = [...activities].sort((a, b) => a.end - b.end); 
    setSortedActivities(sorted); 

    setTimeout(() => {
      const result = activitySelection(sorted); 
      setFinalSelection(result);
      dispatch(setProblemType("ActivitySelection"));
      dispatch(setSelectedActivities(result));
    }, sorted.length * 500); // Delay execution to allow sorting animation
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Activity Selection (Visualization)</h2>
      <div className="flex flex-col md:flex-row">
      <input
        type="text"
        className="p-2 border rounded dark:bg-gray-700 dark:text-white mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter activities as start-end pairs (e.g., 1-3, 2-5)"
      />

      {/* <button
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={handleCalculate}
      >
        Solve
      </button> */}
      <CustomButton 
      color="blue"
      label="Solve"
      onClick={handleCalculate}
      />
      </div>

      {/* Sorting Visualization */}
      {sortedActivities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Sorting by End Time:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {sortedActivities.map((act, index) => (
              <div
                key={index}
                className={`p-2 rounded-md text-white transition-all duration-500 ${
                  index === highlightedIndex ? "bg-yellow-500 scale-105" : "bg-gray-500"
                }`}
              >
                ({act.start}, {act.end})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Activities Visualization */}
      {finalSelection.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Selected Activities:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {finalSelection.map((act, index) => (
              <div
                key={index}
                className="p-2 bg-green-500 text-white rounded-md transition-transform duration-500 transform scale-100 hover:scale-110"
              >
                ({act.start}, {act.end})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySelection;
