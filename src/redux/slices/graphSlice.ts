import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Updated GraphState to match expected Graph format
interface GraphState {
  adjacencyList: Record<number, { node: number }[]>; 
  algorithm: "BFS" | "DFS" | "Dijkstra" | "Kruskal" | "Prim" | null;
  startNode: number | null;
  visitedNodes: number[];
  isRunning: boolean;
}

const initialState: GraphState = {
  adjacencyList: {}, // Initially empty
  algorithm: null,
  startNode: null,
  visitedNodes: [],
  isRunning: false,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setAdjacencyList: (state, action: PayloadAction<Record<number, { node: number }[]>>) => {
      state.adjacencyList = action.payload;
    },
    addEdge: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;

      // Ensure nodes exist in the adjacency list
      if (!state.adjacencyList[from]) {
        state.adjacencyList[from] = [];
      }
      if (!state.adjacencyList[to]) {
        state.adjacencyList[to] = [];
      }

      // Add edges if they don’t already exist
      if (!state.adjacencyList[from].some((edge) => edge.node === to)) {
        state.adjacencyList[from].push({ node: to });
      }
      if (!state.adjacencyList[to].some((edge) => edge.node === from)) {
        state.adjacencyList[to].push({ node: from }); // For undirected graph
      }
    },
    removeEdge: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      state.adjacencyList[from] = state.adjacencyList[from]?.filter((edge) => edge.node !== to) || [];
      state.adjacencyList[to] = state.adjacencyList[to]?.filter((edge) => edge.node !== from) || [];
    },
    setAlgorithm: (state, action: PayloadAction<"BFS" | "DFS" | "Dijkstra" | "Kruskal" | "Prim" | null>) => {
      state.algorithm = action.payload;
    },
    setStartNode: (state, action: PayloadAction<number | null>) => {
      state.startNode = action.payload;
    },
    startTraversal: (state) => {
      state.isRunning = true;
      state.visitedNodes = [];
    },
    stopTraversal: (state) => {
      state.isRunning = false;
    },
    setVisitedNodes: (state, action: PayloadAction<number[]>) => {
      state.visitedNodes = action.payload;
    },
    resetGraph: (state) => {
      state.adjacencyList = {};
      state.algorithm = null;
      state.startNode = null;
      state.visitedNodes = [];
      state.isRunning = false;
    },
  },
});

export const {
  setAdjacencyList,
  addEdge,
  removeEdge,
  setAlgorithm,
  setStartNode,
  startTraversal,
  stopTraversal,
  setVisitedNodes,
  resetGraph,
} = graphSlice.actions;

export default graphSlice.reducer;
