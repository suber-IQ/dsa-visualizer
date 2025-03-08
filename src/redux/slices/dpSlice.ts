import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DPState {
    problemType: "Fibonacci" | "Knapsack" | "LCS" | "LIS" | "";
    input: number | number[] | { weights: number[]; values: number[]; capacity: number } | string[] | null;
    result: number | number[] | string | { length: number; sequence: string } | null; // ✅ Update this line
    computed: boolean;
  }
  
const initialState: DPState = {
  problemType: "",
  input: null,
  result: null,
  computed: false,
};

const dpSlice = createSlice({
  name: "dp",
  initialState,
  reducers: {
    setProblemType: (state, action: PayloadAction<DPState["problemType"]>) => {
      state.problemType = action.payload;
      state.computed = false;
    },
    setInput: (state, action: PayloadAction<DPState["input"]>) => {
      state.input = action.payload;
      state.computed = false;
    },
    setResult: (state, action: PayloadAction<DPState["result"]>) => {
      state.result = action.payload;
      state.computed = true;
    },
    resetDPState: () => initialState,
  },
});

export const { setProblemType, setInput, setResult, resetDPState } = dpSlice.actions;
export default dpSlice.reducer;
