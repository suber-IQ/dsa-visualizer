import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NQueensState {
  boardSize: number;
  solution: number[][]; // 2D array representing the board
  isSolved: boolean;
}

interface SudokuState {
  board: number[][]; // 2D array representing the Sudoku grid
  isSolved: boolean;
}

interface BacktrackingState {
  problemType: "None" | "NQueens" | "SudokuSolver";
  nQueens: NQueensState;
  sudoku: SudokuState;
}

const initialState: BacktrackingState = {
  problemType: "None",
  nQueens: {
    boardSize: 8,
    solution: [],
    isSolved: false,
  },
  sudoku: {
    board: Array(9).fill(null).map(() => Array(9).fill(0)), // 9x9 grid
    isSolved: false,
  },
};

const backtrackingSlice = createSlice({
  name: "backtracking",
  initialState,
  reducers: {
    setProblemType: (state, action: PayloadAction<BacktrackingState["problemType"]>) => {
      state.problemType = action.payload;
    },

    // ✅ N-Queens
    setNQueensSolution: (state, action: PayloadAction<number[][]>) => {
      state.nQueens.solution = action.payload;
      state.nQueens.isSolved = true;
    },
    resetNQueens: (state) => {
      state.nQueens.solution = [];
      state.nQueens.isSolved = false;
    },

    // ✅ Sudoku Solver
    setSudokuSolution: (state, action: PayloadAction<number[][]>) => {
      state.sudoku.board = action.payload;
      state.sudoku.isSolved = true;
    },
    resetSudoku: (state) => {
      state.sudoku.board = Array(9).fill(null).map(() => Array(9).fill(0));
      state.sudoku.isSolved = false;
    },
  },
});

export const {
  setProblemType,
  setNQueensSolution,
  resetNQueens,
  setSudokuSolution,
  resetSudoku,
} = backtrackingSlice.actions;

export default backtrackingSlice.reducer;
