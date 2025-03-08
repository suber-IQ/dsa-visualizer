

// *****************************
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortingState {
  array: number[];
  arrayCopy: number[]; // Second array for the second algorithm
  arraySize: number;
  speed: number;
  algorithm1: string;
  algorithm2: string;
  barColors: string[];
  barPositions: { x: number, y: number }[]; // Keeps track of bar movement for animations
  sorting: boolean;
  isSortingAlgorithm1: boolean; 
  isSortingAlgorithm2: boolean;
}

const generateRandomArray = (arraySize: number): number[] =>
  Array.from({ length: arraySize }, () => Math.floor(Math.random() * 50));

const initialState: SortingState = {
  arraySize: 10,
  array: generateRandomArray(10),
  arrayCopy: generateRandomArray(10), // Initialize copy
  speed: 500,
  algorithm1: "Bubble Sort",
  algorithm2: "", // Or other algorithm
  barColors: new Array(10).fill("bg-blue-500"),
  barPositions: Array.from({ length: 10 }, () => ({ x: 0, y: 0 })),
  sorting: false,
  isSortingAlgorithm1: false,
  isSortingAlgorithm2: false,
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    updateArray: (state, action: PayloadAction<number[]>) => {
      state.array = action.payload;
      state.arrayCopy = [...action.payload]; // Update the second algorithm's copy
      state.arraySize = action.payload.length;
      state.barColors = new Array(action.payload.length).fill("bg-blue-500");
      state.barPositions = action.payload.map(() => ({ x: 0, y: 0 }));
    },
    updateSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    updateAlgorithm: (state, action: PayloadAction<{ algorithm1?: string; algorithm2?: string }>) => {
      if (action.payload.algorithm1 !== undefined) state.algorithm1 = action.payload.algorithm1;
      if (action.payload.algorithm2 !== undefined) state.algorithm2 = action.payload.algorithm2;
    },
    setSorting: (state, action: PayloadAction<boolean>) => {
      state.sorting = action.payload;
      if (!action.payload) {
        state.isSortingAlgorithm1 = false;
        state.isSortingAlgorithm2 = false;
      }
    },
    setSortingAlgorithm1: (state, action: PayloadAction<boolean>) => {
      state.isSortingAlgorithm1 = action.payload;
    },
    setSortingAlgorithm2: (state, action: PayloadAction<boolean>) => {
      state.isSortingAlgorithm2 = action.payload;
    },
    setBarColors: (state, action: PayloadAction<string[]>) => {
      state.barColors = action.payload;
    },
    setBarPositions: (state, action: PayloadAction<{ x: number; y: number }[]>) => {
      state.barPositions = action.payload;
    },
  },
});

export const { 
  updateArray,
  updateSpeed,
  updateAlgorithm,
  setSorting,
  setSortingAlgorithm1,
  setSortingAlgorithm2,
  setBarColors,
  setBarPositions,
} = sortingSlice.actions;

export default sortingSlice.reducer;
