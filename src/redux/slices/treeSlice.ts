import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TreeOperation = "None" | "Traversals" | "BST" | "AVL" | "LCA";

interface TreeState {
  operationType: TreeOperation;
}

const initialState: TreeState = {
  operationType: "None",
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setTreeOperation: (state, action: PayloadAction<TreeOperation>) => {
      if (["None", "Traversals", "BST", "AVL", "LCA"].includes(action.payload)) {
        state.operationType = action.payload;
      } else {
        console.warn(`Invalid TreeOperation: ${action.payload}`);
      }
    },
    resetTree: () => initialState, // Resets to initial state
  },
});

export const { setTreeOperation, resetTree } = treeSlice.actions;
export default treeSlice.reducer;
