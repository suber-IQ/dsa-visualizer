import { Dispatch } from "@reduxjs/toolkit";
import { Edge } from "@xyflow/react";
import { stopTraversal } from "../redux/slices/graphSlice";

const ROWS = 5;
const COLS = 7;
const DIRECTIONS = [
  [0, 1], [1, 0], [0, -1], [-1, 0]
];

export const bfsTraversal = (
  startNode: { row: number; col: number },
  setVisited: React.Dispatch<React.SetStateAction<Set<string>>>,
  dispatch: Dispatch
) => {
  const queue: { row: number; col: number }[] = [{ row: startNode.row, col: startNode.col }];
  const visited = new Set<string>();
  visited.add(`${startNode.row},${startNode.col}`);

  let index = 0;

  const bfsInterval = setInterval(() => {
    if (index >= queue.length) {
      clearInterval(bfsInterval);
      dispatch(stopTraversal());
      return;
    }

    const { row, col } = queue[index];

    // ✅ Ensure setVisited correctly updates state
    setVisited((prevVisited) => {
      const newVisited = new Set(prevVisited);
      newVisited.add(`${row},${col}`);
      return newVisited;
    });

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        queue.push({ row: newRow, col: newCol });
        visited.add(`${newRow},${newCol}`);
      }
    }

    index++;
  }, 500);
};




export const dfsTraversal = (
  startNode: { row: number; col: number },
  setVisited: React.Dispatch<React.SetStateAction<Set<string>>>,
  dispatch: Dispatch
) => {
  const stack: { row: number; col: number }[] = [{ row: startNode.row, col: startNode.col }];
  const visited = new Set<string>();
  visited.add(`${startNode.row},${startNode.col}`);

  const dfsInterval = setInterval(() => {
    if (stack.length === 0) {
      clearInterval(dfsInterval);
      dispatch(stopTraversal());
      return;
    }

    const { row, col } = stack.pop()!; // Get the last element (LIFO)

    // ✅ Ensure setVisited correctly updates state
    setVisited((prevVisited) => {
      const newVisited = new Set(prevVisited);
      newVisited.add(`${row},${col}`);
      return newVisited;
    });

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        stack.push({ row: newRow, col: newCol });
        visited.add(`${newRow},${newCol}`);
      }
    }
  }, 500);
};


//👉  dijkstraTraversal
interface Node {
  row: number;
  col: number;
  distance: number;
}

export const dijkstraTraversal = (
  startNode: { row: number; col: number },
  setVisited: React.Dispatch<React.SetStateAction<Set<string>>>,
  setDistances: React.Dispatch<React.SetStateAction<Map<string, number>>>,
  dispatch: Dispatch
) => {
  const priorityQueue: Node[] = [{ row: startNode.row, col: startNode.col, distance: 0 }];
  const distances = new Map<string, number>();
  const visited = new Set<string>();

  distances.set(`${startNode.row},${startNode.col}`, 0);

  const dijkstraInterval = setInterval(() => {
    if (priorityQueue.length === 0) {
      clearInterval(dijkstraInterval);
      dispatch(stopTraversal());
      return;
    }

    // Sort queue to always pick the smallest distance node
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { row, col, distance } = priorityQueue.shift()!;

    if (visited.has(`${row},${col}`)) return;

    // Mark node as visited
    visited.add(`${row},${col}`);
    setVisited(new Set(visited));
    setDistances(new Map(distances));

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        const newDistance = distance + 1; // Assume uniform weight = 1

        if (!distances.has(`${newRow},${newCol}`) || newDistance < distances.get(`${newRow},${newCol}`)!) {
          distances.set(`${newRow},${newCol}`, newDistance);
          priorityQueue.push({ row: newRow, col: newCol, distance: newDistance });
        }
      }
    }
  }, 500);
};





// 👉 KruskalsTraversal 


// Function to find the parent node in the Disjoint Set
const find = (parent: Record<string, string>, node: string): string => {
  if (parent[node] !== node) {
    parent[node] = find(parent, parent[node]); // Path compression
  }
  return parent[node];
};

// Function to perform union operation in the Disjoint Set
const union = (parent: Record<string, string>, rank: Record<string, number>, node1: string, node2: string) => {
  const root1 = find(parent, node1);
  const root2 = find(parent, node2);

  if (root1 !== root2) {
    if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
    } else if (rank[root1] < rank[root2]) {
      parent[root1] = root2;
    } else {
      parent[root2] = root1;
      rank[root1]++;
    }
  }
};

// Kruskal's Algorithm Implementation
export const runKruskals = (edges: Edge<{ weight: number }>[], nodeIds: string[]): Edge<{ weight: number }>[] => {
  const sortedEdges = [...edges].sort((a, b) => a.data!.weight - b.data!.weight);

  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};

  // Initialize the Disjoint Set
  nodeIds.forEach((id) => {
    parent[id] = id;
    rank[id] = 0;
  });

  const mst: Edge<{ weight: number }>[] = [];

  // Kruskal's Algorithm: Process edges and add only if they don't form a cycle
  for (const edge of sortedEdges) {
    if (find(parent, edge.source) !== find(parent, edge.target)) {
      mst.push(edge);
      union(parent, rank, edge.source, edge.target);
    }
  }

  return mst;
};


// 👉 Prims 


export const runPrims = (edges: Edge<{ weight: number }>[], nodes: string[]) => {
  if (nodes.length === 0) return [];

  const mstEdges: Edge<{ weight: number }>[] = [];
  const visited = new Set<string>();
  const edgeQueue = [...edges].sort((a, b) => (a.data?.weight ?? 0) - (b.data?.weight ?? 0));

  // Start from the first node
  visited.add(nodes[0]);

  while (mstEdges.length < nodes.length - 1) {
    let addedEdge = null;

    for (const edge of edgeQueue) {
      if (visited.has(edge.source) && !visited.has(edge.target)) {
        addedEdge = edge;
        visited.add(edge.target);
        break;
      }
      if (visited.has(edge.target) && !visited.has(edge.source)) {
        addedEdge = edge;
        visited.add(edge.source);
        break;
      }
    }

    if (!addedEdge) break; // No more edges to add

    mstEdges.push(addedEdge);
    edgeQueue.splice(edgeQueue.indexOf(addedEdge), 1);
  }

  return mstEdges;
};
