import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchingState {
  algorithm: string;
  array: number[];
  target: number | null;
  isSearching: boolean;
  speed: number;
}

const generateRandomArray = (size: number, min: number = 1, max: number = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const initialState: SearchingState = {
  algorithm: "Linear Search",
  array: generateRandomArray(10), // Default random array of size 10
  target: null,
  isSearching: false,
  speed: 500, // Default speed in ms
};

const searchingSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    setAlgorithm: (state, action: PayloadAction<string>) => {
      state.algorithm = action.payload;
    },
    setArray: (state, action: PayloadAction<number[]>) => {
      state.array = action.payload.length > 0 ? action.payload : generateRandomArray(10);
    },
    setTarget: (state, action: PayloadAction<number | null>) => {
      state.target = action.payload;
    },
    startSearching: (state) => {
      state.isSearching = true;
    },
    stopSearching: (state) => {
      state.isSearching = false;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    generateRandomArray: (state, action: PayloadAction<number>) => {
      state.array = generateRandomArray(action.payload);
    },
  },
});

export const {
  setAlgorithm,
  setArray,
  setTarget,
  startSearching,
  stopSearching,
  setSpeed,
} = searchingSlice.actions;

export default searchingSlice.reducer;
