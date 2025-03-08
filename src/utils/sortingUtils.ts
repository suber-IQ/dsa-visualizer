import { updateArray, setBarColors, setBarPositions } from "../redux/slices/sortingSlice";
import { AppDispatch } from "../redux/store";

export const bubbleSort = async (
  array: number[],
  dispatch: AppDispatch,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;
  const colors = Array(n).fill("bg-blue-500");

  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Track if swapping happened

    for (let j = 0; j < n - i - 1; j++) {
      // Highlight compared bars
      colors[j] = "bg-yellow-500";
      colors[j + 1] = "bg-yellow-500";
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        dispatch(updateArray([...arr])); // Update Redux state

        // Show swap effect
        colors[j] = "bg-red-500";
        colors[j + 1] = "bg-red-500";
        dispatch(setBarColors([...colors]));
        await new Promise((resolve) => setTimeout(resolve, delay));

        swapped = true; // Mark as swapped
      }

      // Reset colors
      colors[j] = "bg-blue-500";
      colors[j + 1] = "bg-blue-500";
      dispatch(setBarColors([...colors]));
    }

    // Mark sorted element
    colors[n - i - 1] = "bg-green-500";
    dispatch(setBarColors([...colors]));

    // ✅ Optimization: If no swapping occurred, break early (Best Case O(n))
    if (!swapped) break;
  }

  // Mark last element as sorted
  colors[0] = "bg-green-500";
  dispatch(setBarColors([...colors]));
};

export const selectionSort = async (
  array: number[],
  dispatch: AppDispatch,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;
  const colors = Array(n).fill("bg-blue-500");

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    colors[minIndex] = "bg-yellow-500";
    dispatch(setBarColors([...colors]));

    for (let j = i + 1; j < n; j++) {
      colors[j] = "bg-yellow-500";
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }

      colors[j] = "bg-blue-500";
      dispatch(setBarColors([...colors]));
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    dispatch(updateArray([...arr]));

    colors[i] = "bg-green-500";
    dispatch(setBarColors([...colors]));
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  colors[n - 1] = "bg-green-500";
  dispatch(setBarColors([...colors]));
};


export const insertionSort = async (
  array: number[],
  dispatch: AppDispatch,
  delay: number
) => {
  const arr = [...array];
  const n = arr.length;
  const colors = Array(n).fill("bg-blue-500");

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    colors[i] = "bg-yellow-500";
    dispatch(setBarColors([...colors]));
    await new Promise((resolve) => setTimeout(resolve, delay));

    while (j >= 0 && arr[j] > key) {
      colors[j] = "bg-yellow-500";
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      arr[j + 1] = arr[j];
      j--;
      dispatch(updateArray([...arr]));
    }
    arr[j + 1] = key;
    dispatch(updateArray([...arr]));

    colors[i] = "bg-green-500";
    dispatch(setBarColors([...colors]));
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  dispatch(setBarColors(Array(n).fill("bg-green-500")));
};



export const mergeSort = async (
  array: number[],
  dispatch: AppDispatch,
  delay: number
) => {
  const arr = [...array];
  const positions = arr.map((_, index) => ({ x: index * 50, y: 0 }));
  const colors = new Array(arr.length).fill("bg-blue-500");

  // ✅ Function to merge two halves
  async function merge(arr: number[], left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    // ✅ Drop bars down before merging
    for (let idx = left; idx <= right; idx++) {
      positions[idx] = { ...positions[idx], y: 40 }; // Move down for visibility
      colors[idx] = "bg-yellow-500"; // Highlight merging range
    }
    dispatch(setBarPositions([...positions]));
    dispatch(setBarColors([...colors]));
    await new Promise((resolve) => setTimeout(resolve, delay));

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] < rightArr[j]) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }
      positions[k] = { x: k * 50, y: 0 }; // Move up to final position
      colors[k] = "bg-green-500"; // Sorted element
      dispatch(updateArray([...arr]));
      dispatch(setBarPositions([...positions]));
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i++];
      positions[k] = { x: k * 50, y: 0 };
      colors[k] = "bg-green-500";
      dispatch(updateArray([...arr]));
      dispatch(setBarPositions([...positions]));
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j++];
      positions[k] = { x: k * 50, y: 0 };
      colors[k] = "bg-green-500";
      dispatch(updateArray([...arr]));
      dispatch(setBarPositions([...positions]));
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));
      k++;
    }
  }

  // ✅ Recursive merge sort function
  async function mergeSortHelper(arr: number[], left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  }

  // ✅ Start sorting
  await mergeSortHelper(arr, 0, arr.length - 1);

  // ✅ Reset colors after sorting
  dispatch(setBarColors(new Array(arr.length).fill("bg-green-500")));
  dispatch(updateArray([...arr]));
};




export const quickSort = async (
  array: number[],
  dispatch: AppDispatch,
  delay: number
) => {
  const positions = array.map((_, i) => ({ x: i * 50, y: 0 })); // Initial positions
  const colors = new Array(array.length).fill("bg-blue-500");

  async function partition(arr: number[], low: number, high: number) {
    const pivot = arr[high];
    const pivotIndex = high;
    colors[pivotIndex] = "bg-yellow-500"; // Mark pivot
    dispatch(setBarColors([...colors]));

    let i = low - 1;
    for (let j = low; j < high; j++) {
      colors[j] = "bg-red-500"; // Highlight elements being compared
      dispatch(setBarColors([...colors]));
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        [positions[i], positions[j]] = [positions[j], positions[i]];
        dispatch(updateArray([...arr]));
        dispatch(setBarPositions([...positions]));
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      colors[j] = "bg-blue-500"; // Reset color after comparison
    }

    // Swap pivot to correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    [positions[i + 1], positions[high]] = [positions[high], positions[i + 1]];
    dispatch(updateArray([...arr]));
    dispatch(setBarPositions([...positions]));
    colors[i + 1] = "bg-green-500"; // Mark as sorted
    dispatch(setBarColors([...colors]));
    await new Promise((resolve) => setTimeout(resolve, delay));

    return i + 1;
  }

  async function quickSortHelper(arr: number[], low: number, high: number) {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  }

  const arr = [...array];
  await quickSortHelper(arr, 0, arr.length - 1);

  // Reset all colors to blue after sorting
  dispatch(setBarColors(new Array(arr.length).fill("bg-blue-500")));
  dispatch(updateArray([...arr]));
};