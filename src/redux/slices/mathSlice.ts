import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MathOperation = "None" | "GCD" | "PrimeFactors" | "Sieve";

interface MathState {
  operationType: MathOperation;
}

const initialState: MathState = {
  operationType: "None",
};

const mathSlice = createSlice({
  name: "math",
  initialState,
  reducers: {
    setMathOperation: (state, action: PayloadAction<MathOperation>) => {
      if (["None", "GCD", "PrimeFactors", "Sieve"].includes(action.payload)) {
        state.operationType = action.payload;
      } else {
        console.warn(`Invalid MathOperation: ${action.payload}`);
      }
    },
    resetMath: () => initialState,
  },
});

export const { setMathOperation, resetMath } = mathSlice.actions;
export default mathSlice.reducer;
