import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Activity {
  start: number;
  end: number;
}

interface HuffmanCode {
  [char: string]: string;
}

interface GreedyState {
  problemType: "None" | "ActivitySelection" | "HuffmanCoding";
  selectedActivities: Activity[];
  huffmanCodes: HuffmanCode;
}

const initialState: GreedyState = {
  problemType: "None",
  selectedActivities: [],
  huffmanCodes: {},
};

const greedySlice = createSlice({
  name: "greedy",
  initialState,
  reducers: {
    setProblemType: (state, action: PayloadAction<GreedyState["problemType"]>) => {
      state.problemType = action.payload;
    },
    setSelectedActivities: (state, action: PayloadAction<Activity[]>) => {
      state.selectedActivities = action.payload;
    },
    setHuffmanCodes: (state, action: PayloadAction<HuffmanCode>) => {
      state.huffmanCodes = action.payload;
    },
    resetGreedyState: () => initialState, // Reset state function
  },
});

export const { setProblemType, setSelectedActivities, setHuffmanCodes, resetGreedyState } =
  greedySlice.actions;

export default greedySlice.reducer;
