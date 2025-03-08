import React, { useEffect, useState } from "react";
import  {ReactFlow, Node, Edge, Controls, Background, MiniMap } from "@xyflow/react";
import { primeFactorsRecursive } from "../../../utils/mathUtils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setMathOperation, resetMath } from "../../../redux/slices/mathSlice";
import CustomInput from "../../../ui/customComponents/CustomInput";
import CustomButton from "../../../ui/customComponents/CustomButton";

const PrimeFactorization: React.FC = () => {
  const dispatch = useDispatch();
  const operationType = useSelector((state: RootState) => state.math.operationType);

  const [number, setNumber] = useState<number>(60);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showTree, setShowTree] = useState<boolean>(false);

  useEffect(() => {
    if (operationType === "PrimeFactors" && showTree) {
      generateFactorTree(number);
    }
  }, [operationType, number, showTree]);

  const generateFactorTree = (num: number) => {
    const factors = primeFactorsRecursive(num);
    let nodeId = 1;
    const newNodes: Node[] = [{ id: "1", data: { label: num }, position: { x: 300, y: 50 }, draggable: true }];
    const newEdges: Edge[] = [];

    const parentId = "1";
    for (const factor of factors) {
      nodeId++;
      newNodes.push({
        id: nodeId.toString(),
        data: { label: factor.toString() },
        position: { x: 300 + nodeId * 50, y: 100 + nodeId * 50 },
        draggable: true,
      });

      newEdges.push({ id: `e${parentId}-${nodeId}`, source: parentId, target: nodeId.toString() });
    }

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleCalculate = () => {
    dispatch(setMathOperation("PrimeFactors"));
    setShowTree(true);
  };

  const handleReset = () => {
    dispatch(resetMath());
    setNumber(60);
    setNodes([]);
    setEdges([]);
    setShowTree(false);
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Prime Factorization Tree</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <CustomInput 
        label=""
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        placeholder="Enter a number"

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

      <div className="w-full lg:w-4/6 h-[500px] border border-gray-300 rounded-lg shadow-md">
        <ReactFlow  nodes={nodes} edges={edges} fitView className="w-full dark:text-yellow-600 h-full">
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default PrimeFactorization;
