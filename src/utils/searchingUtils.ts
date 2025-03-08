export interface SearchStep {
    index: number;
    found: boolean;
    message: string;
  }

  export const linearSearch = (array: number[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
  
    for (let i = 0; i < array.length; i++) {
      steps.push({ index: i, found: array[i] === target, message: `Checking index ${i}` });
  
      if (array[i] === target) {
        steps.push({ index: i, found: true, message: `Found ${target} at index ${i}` });
        return steps;
      }
    }
  
    steps.push({ index: -1, found: false, message: `${target} not found` });
    return steps;
  };
  
// Binary Search
export const binarySearch = (arr: number[], target: number) => {
  let left = 0;
  let right = arr.length - 1;
  const steps = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ index: mid, message: `Checking index ${mid}` });

    if (arr[mid] === target) {
      steps.push({ index: mid, message: `Target found at index ${mid}` });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  steps.push({ index: null, message: "Target not found" });
  return steps;
};
