import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import { useDispatch } from "react-redux";
import {  resetTree } from "../../../redux/slices/treeSlice";
import { TreeNode, insertNode, findLCA } from "../../../utils/treeUtils";
import CustomInput from "../../../ui/customComponents/CustomInput";
import CustomButton from "../../../ui/customComponents/CustomButton";

type NodeType = {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  draggable: boolean;
};

type EdgeType = {
  id: string;
  source: string;
  target: string;
};

const LCAVisualizer: React.FC = () => {
  const dispatch = useDispatch();

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [value, setValue] = useState("");
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");

  useEffect(() => {
    updateTreeVisualization(tree);
  }, [tree]);

  const updateTreeVisualization = (root: TreeNode | null) => {
    if (!root) {
      setNodes([]);
      setEdges([]);
      return;
    }

    let idCounter = 1;
    const nodeList: NodeType[] = [];
    const edgeList: EdgeType[] = [];

    const traverse = (node: TreeNode | null, x = 500, y = 50, parentId: string | null = null) => {
      if (!node) return;
      const nodeId = `${idCounter++}`;
      nodeList.push({ id: nodeId, position: { x, y }, data: { label: `${node.value}` }, draggable: true });

      if (parentId !== null) {
        edgeList.push({ id: `e${parentId}-${nodeId}`, source: parentId, target: nodeId });
      }

      traverse(node.left, x - 100, y + 100, nodeId);
      traverse(node.right, x + 100, y + 100, nodeId);
    };

    traverse(root);
    setNodes(nodeList);
    setEdges(edgeList);
  };

  const handleInsert = () => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setTree(insertNode(tree, num));
      setValue("");
    }
  };

  const handleFindLCA = () => {
    const n1 = parseInt(node1, 10);
    const n2 = parseInt(node2, 10);
    if (!isNaN(n1) && !isNaN(n2)) {
      const lca = findLCA(tree, n1, n2);
      alert(lca ? `LCA of ${n1} and ${n2} is ${lca.value}` : "LCA not found");
    }
  };

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as NodeType[]);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds) as EdgeType[]);
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds) as EdgeType[]);
  }, []);

  return (
    <ReactFlowProvider>
      <div className="p-4 w-full h-screen flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">LCA Visualizer</h2>
        <div className="mb-4 flex flex-col lg:flex-row gap-2">
          <CustomInput 
          label=""
          type="number"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
          <CustomButton 
          color="green"
          label="Insert"
          onClick={handleInsert}
          />
         <CustomInput 
         label=""
         type="number"
         placeholder="Node 1"
         value={node1}
         onChange={(e) => setNode1(e.target.value)}
         />
         <CustomInput 
         label=""
         type="number"
         placeholder="Node 2"
         value={node2}
         onChange={(e) => setNode2(e.target.value)}
         />

          <CustomButton 
          color="blue"
          label="Find LCA"
          onClick={handleFindLCA}
          />
          <CustomButton 
          color="red"
          label="Reset"
          onClick={() => dispatch(resetTree())}
          />
        </div>
        <div className="w-full lg:max-w-4/6 h-[600px] border rounded">
          <ReactFlow className="dark:text-yellow-600" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default LCAVisualizer;