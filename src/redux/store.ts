import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import sortingReducer from "./slices/sortingSlice";
import searchingReducer from "./slices/searchingSlice";
import graphReducer from "./slices/graphSlice";
import dpReducer from "./slices/dpSlice";
import greedyReducer from "./slices/greedySlice"
import backtrackingReducer from "./slices/backtrackingSlice"
import treeReducer from "./slices/treeSlice"
import mathReducer from "./slices/mathSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sorting: sortingReducer,
    searching: searchingReducer,
    graph: graphReducer,
    dp: dpReducer,
    greedy: greedyReducer,
    backtracking: backtrackingReducer,
    tree: treeReducer,
    math: mathReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
