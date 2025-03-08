import React, { useEffect, useState } from "react";
import  {
    ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
} from "@xyflow/react";
import { sieveOfEratosthenes } from "../../../utils/mathUtils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setMathOperation, resetMath } from "../../../redux/slices/mathSlice";
import CustomInput from "../../../ui/customComponents/CustomInput";
import CustomButton from "../../../ui/customComponents/CustomButton";

const SieveOfEratosthenes: React.FC = () => {
  const dispatch = useDispatch();
  const operationType = useSelector((state: RootState) => state.math.operationType);

  const [limit, setLimit] = useState<number>(50);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [primes, setPrimes] = useState<number[]>([]);
  const [showVisualization, setShowVisualization] = useState<boolean>(false);

  useEffect(() => {
    if (operationType === "Sieve" && showVisualization) {
      generateSieveVisualization(limit);
    }
  }, [operationType, limit, showVisualization]);

  const generateSieveVisualization = (n: number) => {
    const primeArray = sieveOfEratosthenes(n);
    setPrimes(primeArray);

    const newNodes: Node[] = [];
    let yOffset = 50;

    for (let i = 2; i <= n; i++) {
      newNodes.push({
        id: i.toString(),
        data: { label: i.toString() },
        position: { x: (i % 10) * 60, y: yOffset },
        draggable: true,
        style: {
          backgroundColor: primeArray.includes(i) ? "#34d399" : "#f87171", 
          color: "white",
          padding: "10px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          textAlign: "center",
          fontSize: "14px",
        },
      });

      if (i % 10 === 0) yOffset += 70; 
    }

    setNodes(newNodes);
    setEdges([]); 
  };

  const handleCalculate = () => {
    dispatch(setMathOperation("Sieve"));
    setShowVisualization(true);
  };

  const handleReset = () => {
    dispatch(resetMath());
    setLimit(50);
    setNodes([]);
    setEdges([]);
    setPrimes([]);
    setShowVisualization(false);
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Sieve of Eratosthenes</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
       
        <CustomInput 
        label=""
        type="number"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value))}
        placeholder="Enter a limit"

        />
      
        <CustomButton 
        color="blue"
        label="Calculate"
        onClick={handleCalculate}
        />
        <CustomButton 
        color="red"
        label="Reset"
        onClick={handleReset}
        />
      </div>

      <div className="w-full md:w-4/6 h-[500px] border border-gray-300 rounded-lg shadow-md">
        <ReactFlow nodes={nodes} edges={edges} fitView className="w-full dark:text-yellow-600 h-full">
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>

      {primes.length > 0 && (
        <div className="mt-6 p-4 border border-gray-200 dark:bg-gray-700 dark:text-white rounded-lg shadow-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Prime Numbers:</h3>
          <p className="text-md font-medium text-gray-700 dark:text-white">{primes.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default SieveOfEratosthenes;
