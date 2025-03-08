import React, { useState, useEffect, useCallback } from "react";
import { ReactFlow, ReactFlowProvider, Controls, Background, Node, Edge, applyNodeChanges, NodeChange } from "@xyflow/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { inorderTraversal, insertNode, postorderTraversal, preorderTraversal, TreeNode } from "../../../utils/treeUtils";
import { resetTree } from "../../../redux/slices/treeSlice";
import CustomButton from "../../../ui/customComponents/CustomButton";
import CustomInput from "../../../ui/customComponents/CustomInput";

const Traversals: React.FC = () => {
  const dispatch = useDispatch();
  const operationType = useSelector((state: RootState) => state.tree.operationType);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [traversalType, setTraversalType] = useState("inorder");
  const [activeNode, setActiveNode] = useState<string | null>(null); // Track currently highlighted node

  useEffect(() => {
    if (operationType !== "Traversals") {
      setTree(null);
      setNodes([]);
      setEdges([]);
    }
  }, [operationType]);

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const generateGraph = useCallback((node: TreeNode | null, x = 0, y = 0, parentId: string | null = null) => {
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
        style: { backgroundColor: activeNode === nodeId ? "yellow" : "white" }, // Highlighting effect
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
  }, [activeNode]);

  const insertIntoTree = useCallback((value: number) => {
    setTree((prev) => {
      const newTree = prev ? insertNode(prev, value) : new TreeNode(value);
      setNodes([]);
      setEdges([]);
      generateGraph(newTree);
      return newTree;
    });
  }, [generateGraph]);

  // Function to animate traversal
  const handleTraversal = () => {
    if (!tree) return;
    
    let traversalOrder: number[] = [];
    switch (traversalType) {
      case "preorder":
        traversalOrder = preorderTraversal(tree);
        break;
      case "postorder":
        traversalOrder = postorderTraversal(tree);
        break;
      default:
        traversalOrder = inorderTraversal(tree);
    }

    // Animate traversal
    traversalOrder.forEach((value, index) => {
      setTimeout(() => {
        setActiveNode(`node-${value}`);
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === `node-${value}`
              ? { ...node, style: { backgroundColor: "yellow" } } // Highlight visited node
              : { ...node, style: { backgroundColor: "white" } } // Reset others
          )
        );
      }, index * 500); // Adjust speed of visualization
    });

    // Reset nodes after traversal completes
    setTimeout(() => {
      setActiveNode(null);
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          style: { backgroundColor: "white" },
        }))
      );
    }, traversalOrder.length * 500 + 500);
  };

  return (
    <ReactFlowProvider>
      <div className="p-4 w-full h-screen flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Tree Traversals Visualizer</h2>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          {/* <input
            type="number"
            placeholder="Enter value"
            id="nodeValue"
            className="border p-2 rounded"
          /> */}

          <CustomInput 
          label=""
          type="number"
          placeholder="Enter value"
          id="nodeValue"
          
          />
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              const value = parseInt((document.getElementById("nodeValue") as HTMLInputElement).value, 10);
              if (!isNaN(value)) insertIntoTree(value);
            }}
          >
            Insert Node
          </button> */}
          <CustomButton 
           color="blue"
           label="Insert Node"
           onClick={() => {
            const value = parseInt((document.getElementById("nodeValue") as HTMLInputElement).value, 10);
            if (!isNaN(value)) insertIntoTree(value);
           }}
          />
          <select
            className="border p-3 h-fit dark:text-yellow-500 rounded"
            onChange={(e) => setTraversalType(e.target.value)}
            value={traversalType}
          >
            <option value="inorder">Inorder</option>
            <option value="preorder">Preorder</option>
            <option value="postorder">Postorder</option>
          </select>
          {/* <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleTraversal}>
            Run Traversal
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => dispatch(resetTree())}>
            Reset
          </button> */}
          <CustomButton 
          color="green"
          label="Run Traversal"
          onClick={handleTraversal}
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

export default Traversals;
