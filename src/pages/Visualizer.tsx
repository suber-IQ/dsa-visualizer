import Sidebar from "../components/Sidebar";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router";
import { BookOpenText } from "lucide-react";

// Sorting Algorithms
import BubbleSort from "../components/visualizers/sorting/BubbleSort";
import InsertionSort from "../components/visualizers/sorting/InsertionSort";
import SelectionSort from "../components/visualizers/sorting/SelectionSort";
import MergeSort from "../components/visualizers/sorting/MergeSort";
import QuickSort from "../components/visualizers/sorting/QuickSort";

// Searching Algorithms
import LinearSearch from "../components/visualizers/searching/LinearSearch";
import BinarySearch from "../components/visualizers/searching/BinarySearch";

// Graph Algorithms
import BFS from "../components/visualizers/graph/BFS";
import DFS from "../components/visualizers/graph/DFS";
import Dijkstra from "../components/visualizers/graph/Dijkstra";
import Kruskals from "../components/visualizers/graph/Kruskals";
import Prims from "../components/visualizers/graph/Prims";

// Dynamic Programming
import Fibonacci from "../components/visualizers/dynamicProgramming/Fibonacci";
import Knapsack from "../components/visualizers/dynamicProgramming/Knapsack";
import LCS from "../components/visualizers/dynamicProgramming/LCS";
import LIS from "../components/visualizers/dynamicProgramming/LIS";

// Greedy Algorithms
import ActivitySelection from "../components/visualizers/greedy/ActivitySelection";
import HuffmanCoding from "../components/visualizers/greedy/HuffmanCoding";

// Backtracking
import NQueens from "../components/visualizers/backtracking/NQueens";
import SudokuSolver from "../components/visualizers/backtracking/SudokuSolover";


// TreeTraversal
import Traversals from "../components/visualizers/tree/Traversals";
import BSTOperations from "../components/visualizers/tree/BSTOperations";
import AVLRotations from "../components/visualizers/tree/AVLRotations";
import LCA from "../components/visualizers/tree/LCA";

//Mathematical Algorithms
import GCD from "../components/visualizers/mathematical/GCD";
import PrimeFactorization from "../components/visualizers/mathematical/PrimeFactorization";
import SieveOfEratosthenes from "../components/visualizers/mathematical/SieveOfEratosthenes";

const Visualizer = () => {
  const param = useParams();
  const { algorithm1, algorithm2 } = useSelector(
    (state: RootState) => state.sorting
  );
  const { algorithm } = useSelector((state: RootState) => state.searching);
  const { algorithm: graphAlgorithm } = useSelector(
    (state: RootState) => state.graph
  );
  const { problemType: dpAlgorithm } = useSelector((state: RootState) => state.dp);
  const { problemType: greedyAlgorithm } = useSelector((state: RootState) => state.greedy);
  const { problemType: backtrackingAlgorithm } = useSelector((state: RootState) => state.backtracking);

  const { operationType: treeAlgorithm } = useSelector((state: RootState) => state.tree);
  const { operationType: mathAlgorithm } = useSelector((state: RootState) => state.math);


  // navigate leaderboard
  const navigate = useNavigate();
  

  // Sorting Algorithm Mapping
  const sortingComponents: Record<string, JSX.Element> = {
    "Bubble Sort": <BubbleSort />,
    "Insertion Sort": <InsertionSort />,
    "Selection Sort": <SelectionSort />,
    "Merge Sort": <MergeSort />,
    "Quick Sort": <QuickSort />,
  };

  // Searching Algorithm Mapping
  const searchingComponents: Record<string, JSX.Element> = {
    "Linear Search": <LinearSearch />,
    "Binary Search": <BinarySearch />,
  };

  // Graph Algorithm Mapping
  const graphComponents: Record<string, JSX.Element> = {
    BFS: <BFS />,
    DFS: <DFS />,
    Dijkstra: <Dijkstra />,
    Kruskal: <Kruskals />,
    Prim: <Prims />,
  };

  // Dynamic Programming Algorithm Mapping
  const dpComponents: Record<string, JSX.Element> = {
    Fibonacci: <Fibonacci />,
    Knapsack: <Knapsack />,
    LCS: <LCS />,
    LIS: <LIS />
  };

   // Greedy Algorithm Mapping
   const greedyComponents: Record<string, JSX.Element> = {
    ActivitySelection: <ActivitySelection />,
    HuffmanCoding: <HuffmanCoding />,
   
  };
   // Greedy Algorithm Mapping
   const backtrackingComponents: Record<string, JSX.Element> = {
    NQueens: <NQueens />,
    SudokuSolver: <SudokuSolver />,
   
  };
   // Tree Algorithm Mapping
   const treeComponents: Record<string, JSX.Element> = {
    Traversals: <Traversals />,
    BST: <BSTOperations />,
    AVL: <AVLRotations />,
    LCA: <LCA />

   
  };
   // Tree Algorithm Mapping
   const mathComponents: Record<string, JSX.Element> = {
     GCD: <GCD />,
     PrimeFactors: <PrimeFactorization />,
     Sieve: <SieveOfEratosthenes />

   
  };


  const handleLeaderboard = () => {  
    const validAlgorithms = [
      "sorting",
      "searching",
      "graph",
      "dynamic-programming",
      "greedy",
      "backtracking",
      "tree",
      "mathematical"
    ];
  
    if (param.algorithm && validAlgorithms.includes(param.algorithm)) {
      navigate(`/leaderboard/${param.algorithm}`);
    } else {
      navigate("/not-found"); 
    }
  };
  return (
    <div className="flex w-full mt-32">
      {/* Sidebar for controls */}
      <Sidebar />

      {/* Sorting Visualizer */}
      {param.algorithm === "sorting" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full flex justify-center flex-col items-center gap-10">
            {/* Algorithm 1 */}
            {algorithm1 in sortingComponents ? (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2">{algorithm1}</h3>
                {sortingComponents[algorithm1]}
              </div>
            ) : (
              <p className="text-red-500 text-lg font-semibold">
                Algorithm 1 not recognized. Please select a valid algorithm.
              </p>
            )}

            {/* Algorithm 2 (If selected) */}
            {algorithm2 && algorithm2 in sortingComponents ? (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-10">{algorithm2}</h3>
                {sortingComponents[algorithm2]}
              </div>
            ) : algorithm2 ? (
              <p className="text-red-500 text-lg font-semibold">
                Algorithm 2 not recognized. Please select a valid algorithm.
              </p>
            ) : null}
          </div>
        </div>
      )}

      {/* Searching Visualizer */}
      {param.algorithm === "searching" && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{algorithm}</h3>
          {algorithm in searchingComponents ? (
            searchingComponents[algorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              Searching algorithm not recognized. Please select a valid
              algorithm.
            </p>
          )}
        </div>
      )}

      {/* Graph Visualizer */}
      {param.algorithm === "graph" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{graphAlgorithm}</h3>
          {graphAlgorithm && graphAlgorithm in graphComponents ? (
            graphComponents[graphAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {graphAlgorithm
                ? "Graph algorithm not recognized. Please select a valid algorithm."
                : "No graph algorithm selected."}
            </p>
          )}
        </div>
      )}

      {/* Dynamic Programming Visualizer */}
      {param.algorithm === "dynamic-programming" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{dpAlgorithm}</h3>
          {dpAlgorithm && dpAlgorithm in dpComponents ? (
            dpComponents[dpAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {dpAlgorithm
                ? "DP algorithm not recognized. Please select a valid algorithm."
                : "No DP algorithm selected."}
            </p>
          )}
        </div>
      )}
      {/* Greedy Visualizer */}
      {param.algorithm === "greedy" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{greedyAlgorithm}</h3>
          {greedyAlgorithm && greedyAlgorithm in greedyComponents ? (
            greedyComponents[greedyAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {dpAlgorithm
                ? "Greedy algorithm not recognized. Please select a valid algorithm."
                : "No Greedy algorithm selected."}
            </p>
          )}
        </div>
      )}
      {/* Backtracking Visualizer */}
      {param.algorithm === "backtracking" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{backtrackingAlgorithm}</h3>
          {backtrackingAlgorithm && backtrackingAlgorithm in backtrackingComponents ? (
            backtrackingComponents[backtrackingAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {backtrackingAlgorithm
                ? "Backtracking algorithm not recognized. Please select a valid algorithm."
                : "No Backtracking algorithm selected."}
            </p>
          )}
        </div>
      )}
      {/* Tree Visualizer */}
      {param.algorithm === "tree" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{treeAlgorithm}</h3>
          {treeAlgorithm && treeAlgorithm in treeComponents ? (
            treeComponents[treeAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {treeAlgorithm
                ? "Tree algorithm not recognized. Please select a valid algorithm."
                : "No Tree algorithm selected."}
            </p>
          )}
        </div>
      )}
      {/* mathematical Visualizer */}
      {param.algorithm === "mathematical" && (
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">{mathAlgorithm}</h3>
          {mathAlgorithm && mathAlgorithm in mathComponents ? (
            mathComponents[mathAlgorithm]
          ) : (
            <p className="text-red-500 text-lg font-semibold">
              {mathAlgorithm
                ? "mathematical algorithm not recognized. Please select a valid algorithm."
                : "No mathematical algorithm selected."}
            </p>
          )}
        </div>
      )}


      {/* // leaderboard(result) mode  */}
      <button onClick={handleLeaderboard} className="fixed flex gap-2 animate-bounce right-5 bottom-10 md:right-10 md:bottom-auto md:top-32 cursor-pointer bg-indigo-400 p-2 dark:bg-gray-700  rounded-md">
         <span className="hidden md:block text-white">Leaderboard</span>
        <BookOpenText color="white"   />
      </button>


    </div>
  );
};

export default Visualizer;
