import React, { useState, useCallback, useEffect } from "react";
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
import { TreeNode, insertNode, leftRotate, rightRotate } from "../../../utils/treeUtils";
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

const AVLRotations: React.FC = () => {
  const dispatch = useDispatch();

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [value, setValue] = useState("");

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

  const handleLeftRotate = () => {
    if (tree) setTree(leftRotate(tree));
  };

  const handleRightRotate = () => {
    if (tree) setTree(rightRotate(tree));
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
        <h2 className="text-2xl font-bold mb-4">AVL Tree Visualizer</h2>
        <div className="mb-4 flex flex-col md:flex-row gap-2">

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
          <CustomButton 
          color="blue"
          label="Left Rotate"
          onClick={handleLeftRotate}
          />
          <CustomButton 
          color="gray"
          label="Right Rotate"
          onClick={handleRightRotate}
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

export default AVLRotations;