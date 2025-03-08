import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMathOperation, resetMath } from "../../../redux/slices/mathSlice";
import { gcd } from "../../../utils/mathUtils"; // ✅ Correct Import
import { ReactFlow, Background, Controls, Edge, Node } from "@xyflow/react";
import CustomButton from "../../../ui/customComponents/CustomButton";
import CustomInput from "../../../ui/customComponents/CustomInput";

const GCD = () => {
  const dispatch = useDispatch();
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [steps, setSteps] = useState<number[][]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [finalGCD, setFinalGCD] = useState<number | null>(null);

  const handleCalculate = () => {
    setSteps([]);
    setNodes([]);
    setEdges([]);
    dispatch(setMathOperation("GCD"));

    const stepList: number[][] = [];
    let x = a, y = b;

    while (y !== 0) {
      stepList.push([x, y, x % y]);
      [x, y] = [y, x % y];
    }

    setSteps(stepList);
    setFinalGCD(gcd(a, b)); // ✅ Using the imported function
  };

  useEffect(() => {
    if (steps.length > 0) {
      const newNodes: Node[] = steps.map(([x, y], index) => ({
        id: `${index}`,
        data: { label: `(${x}, ${y})` },
        position: { x: index * 150, y: index * 100 },
      }));

      const newEdges: Edge[] = steps
        .slice(0, -1)
        .map((_, index) => ({
          id: `e${index}`,
          source: `${index}`,
          target: `${index + 1}`,
          animated: true,
        }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [steps]);

  const handleReset = () => {
    setA(0);
    setB(0);
    setSteps([]);
    setNodes([]);
    setEdges([]);
    setFinalGCD(null);
    dispatch(resetMath());
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-lg mx-auto bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center">GCD Visualizer</h2>

      <div className="mb-3">
       
        <CustomInput 
        label="Enter First Number:"
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
       
        <CustomInput 
        label="Enter Second Number:"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        type="number"
        />
      </div>

      <div className="flex gap-2 justify-center">
      
        <CustomButton 
        color="green"
        onClick={handleCalculate}
        label="Calculate"
        />
        <CustomButton 
        color="red"
        label="Reset"
        onClick={handleReset}
        />
      </div>

      {finalGCD !== null && (
        <div className="text-center mt-4 font-bold text-lg">
          ✅ GCD: <span className="text-blue-500">{finalGCD}</span>
        </div>
      )}

      {steps.length > 0 && (
        <div className="mt-6 h-64 border rounded bg-gray-100 dark:bg-gray-700">
          <ReactFlow className="dark:text-yellow-600" nodes={nodes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default GCD;
