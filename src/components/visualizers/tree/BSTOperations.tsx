import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  Edge,
  applyNodeChanges,
  NodeChange,
} from "@xyflow/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  insertNode,
  deleteNode,
  searchBST,
  TreeNode,
} from "../../../utils/treeUtils";
import { resetTree } from "../../../redux/slices/treeSlice";
import CustomInput from "../../../ui/customComponents/CustomInput";
import CustomButton from "../../../ui/customComponents/CustomButton";

const BSTOperations: React.FC = () => {
  const dispatch = useDispatch();
  const operationType = useSelector(
    (state: RootState) => state.tree.operationType
  );
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    if (operationType !== "BST") {
      setTree(null);
      setNodes([]);
      setEdges([]);
    }
  }, [operationType]);

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const generateGraph = useCallback(
    (node: TreeNode | null, x = 0, y = 0, parentId: string | null = null) => {
      if (!node) return;
      const nodeId = `node-${node.value}`;
      setNodes((prev) => [
        ...prev,
        {
          id: nodeId,
          position: { x, y },
          data: { label: node.value },
          type: "default",
          draggable: true,
          style: {
            backgroundColor: activeNode === nodeId ? "yellow" : "white",
          },
        },
      ]);

      if (parentId) {
        setEdges((prev) => [
          ...prev,
          { id: `edge-${parentId}-${nodeId}`, source: parentId, target: nodeId },
        ]);
      }

      generateGraph(node.left, x - 100, y + 100, nodeId);
      generateGraph(node.right, x + 100, y + 100, nodeId);
    },
    [activeNode]
  );

  const insertIntoTree = useCallback(
    (value: number) => {
      setTree((prev) => {
        const newTree = prev ? insertNode(prev, value) : new TreeNode(value);
        setNodes([]);
        setEdges([]);
        generateGraph(newTree);
        return newTree;
      });
    },
    [generateGraph]
  );

  const deleteFromTree = useCallback(
    (value: number) => {
      setTree((prev) => {
        if (!prev) return null;
        const newTree = deleteNode(prev, value);
        setNodes([]);
        setEdges([]);
        generateGraph(newTree);
        return newTree;
      });
    },
    [generateGraph]
  );

  const handleSearch = (value: number) => {
    if (!tree) return;
    const found = searchBST(tree, value);
    if (found) {
      setActiveNode(`node-${value}`);
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === `node-${value}`
            ? { ...node, style: { backgroundColor: "lightgreen" } }
            : node
        )
      );
    } else {
      alert("Value not found in the tree");
    }
  };

  return (
    <ReactFlowProvider>
      <div className="p-4 w-full h-screen flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">BST Search Visualizer</h2>
        <div className="flex gap-2 mb-4">
         
          <CustomInput 
          type="number"
          placeholder="Enter value"
          label=""
          id="nodeValue"
          className="border p-2 rounded"
          />

        
          <CustomButton 
         
          color="blue"
          label="Insert Node"
          onClick={() => {
            const value = parseInt(
              (document.getElementById("nodeValue") as HTMLInputElement).value,
              10
            );
            if (!isNaN(value)) insertIntoTree(value);
          }}
          />

        


          <CustomButton 
          color="gray"
          label="Delete Node"
          onClick={() => {
            const value = parseInt(
              (document.getElementById("nodeValue") as HTMLInputElement).value,
              10
            );
            if (!isNaN(value)) deleteFromTree(value);
          }}
          />
        
          <CustomButton 
          color="green"
          label="Search Node"
          onClick={() => {
            const value = parseInt(
              (document.getElementById("nodeValue") as HTMLInputElement).value,
              10
            );
            if (!isNaN(value)) handleSearch(value);
          }}
          />
        
          <CustomButton 
          color="red"
          label="Reset"
           onClick={() => dispatch(resetTree())}
          />
        </div>
        <div className="w-full lg:max-w-4/6 h-[600px] border rounded">
          <ReactFlow className="dark:text-yellow-600" nodes={nodes} edges={edges} onNodesChange={onNodesChange} fitView>
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default BSTOperations;