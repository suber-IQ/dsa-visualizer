import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEdge, resetGraph } from "../../../redux/slices/graphSlice";
import {
  Node,
  Edge,
  useEdgesState,
  useNodesState,
  Background,
  Controls,
  ReactFlow,
} from "@xyflow/react";
import { runPrims } from "../../../utils/graphUtils";
import CustomButton from "../../../ui/customComponents/CustomButton";
import CustomInput from "../../../ui/customComponents/CustomInput";

type GraphNode = Node<{ label: string }>;

const Prims = () => {
  const dispatch = useDispatch();

  // State for Nodes and Edges
  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<{ weight: number }>>([]);
  const [mstEdges, setMstEdges] = useState<Edge<{ weight: number }>[]>([]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [weight, setWeight] = useState("");

  // Add edge function
  const handleAddEdge = () => {
    if (!source || !target || !weight || source === target) return;

    setNodes((prevNodes) => {
      const nodeExists = (id: string) => prevNodes.some((node) => node.id === id);
      const updatedNodes = [...prevNodes];

      if (!nodeExists(source)) {
        updatedNodes.push({
          id: source,
          position: { x: 100 + Number(source) * 100, y: 200 },
          data: { label: `Node ${source}` },
        });
      }

      if (!nodeExists(target)) {
        updatedNodes.push({
          id: target,
          position: { x: 100 + Number(target) * 100, y: 300 },
          data: { label: `Node ${target}` },
        });
      }

      return updatedNodes;
    });

    const newEdge: Edge<{ weight: number }> = {
      id: `${source}-${target}`,
      source,
      target,
      type: "smoothstep",
      animated: true,
      data: { weight: Number(weight) },
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);
    dispatch(addEdge({ from: Number(source), to: Number(target) }));

    setSource("");
    setTarget("");
    setWeight("");
  };

  const handleRunPrims = () => {
    if (edges.length === 0) return;
    const nodeIds = nodes.map((node) => node.id);
    const mst = runPrims(edges, nodeIds);
    setMstEdges(mst);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6">Prim's Algorithm Visualizer</h2>

      <div className="flex flex-col lg:flex-row gap-2 mb-6">
       
        <CustomInput 
        label=""
        value={source}
        onChange={(e) => setSource(e.target.value)}
         placeholder="First Node"
        
        />
      
        <CustomInput 
        label=""
        value={target}
        onChange={(e) => setTarget(e.target.value)}
         placeholder="Second Node"

        />
      
        <CustomInput 
        label=""
        type="number"
        value={weight}
       onChange={(e) => setWeight(e.target.value)} 
       placeholder="Weight"

        />
     
        <CustomButton 
        color="blue"
        onClick={handleAddEdge}
        label="Add Edge"
        />
      </div>

      <div className="relative w-full max-w-3xl h-[400px] border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <ReactFlow className="dark:text-yellow-600" nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
        <div className="flex flex-col md:flex-row md:gap-4 md:mt-4">
     
      <CustomButton 
      color="green"
      label="Run Prim's Algorithm"
      onClick={handleRunPrims}
      />

     

    
      <CustomButton 
      color="red"
      onClick={() => dispatch(resetGraph())}
      label="Reset Graph"
      />
      </div>
      {mstEdges.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-center text-green-700 dark:text-green-400">Minimum Spanning Tree (MST)</h3>
          <div className="space-y-2">
            {mstEdges.map((edge) => (
              <div key={edge.id} className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded">
                <span className="font-medium text-gray-700 dark:text-gray-100">
                  {edge.source} - {edge.target} (Weight: {edge.data?.weight})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prims;
