import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setHuffmanCodes } from "../../../redux/slices/greedySlice";
import { huffmanCoding, buildHuffmanTree, HuffmanNode } from "../../../utils/greedyUtils";
import { Node, Edge, useNodesState, useEdgesState, ReactFlow, Background, Controls } from "@xyflow/react";
import CustomButton from "../../../ui/customComponents/CustomButton";
// import "@xyflow/react/dist/style.css";

const HuffmanCoding: React.FC = () => {
  const [text, setText] = useState("hello world");
  const dispatch = useDispatch();
  const codes = useSelector((state: RootState) => state.greedy.huffmanCodes);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isGenerated, setIsGenerated] = useState(false); 

  const calculateHuffmanCodes = () => {
    const frequencyMap: Record<string, number> = {};
    for (const char of text) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    const tree = buildHuffmanTree(frequencyMap);
    dispatch(setHuffmanCodes(huffmanCoding(frequencyMap)));

    setNodes([]);
    setEdges([]);
    setIsGenerated(true);

    visualizeTree(tree);
  };

  const visualizeTree = (root: HuffmanNode | undefined, x = 500, y = 50, level = 0, parentId: string | null = null) => {
    if (!root) return;

    const nodeId = `node-${x}-${y}`;
    setNodes((prev) => [
      ...prev,
      {
        id: nodeId,
        data: { label: `${root.char ?? "●"}: ${root.freq}` },
        position: { x, y },
        draggable: true, // ✅ Make nodes movable
        type: "default",
      },
    ]);

    if (parentId) {
      setEdges((prev) => [
        ...prev,
        { id: `edge-${parentId}-${nodeId}`, source: parentId, target: nodeId, animated: true },
      ]);
    }

    setTimeout(() => {
      visualizeTree(root.left, x - 100 / (level + 1), y + 80, level + 1, nodeId);
      visualizeTree(root.right, x + 100 / (level + 1), y + 80, level + 1, nodeId);
    }, 300);
  };

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  return (
    <div className="p-4 border rounded shadow-lg bg-gray-100 dark:bg-gray-700 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-center">Huffman Coding Visualizer</h2>

      {/* Input Section */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded mt-2 w-full text-center"
        placeholder="Enter text to encode"
      />

      {/* Generate Button */}
      <CustomButton 
      label="Generate Huffman codes"
      onClick={calculateHuffmanCodes}
      color="blue"
      />
      {/* <button
        onClick={calculateHuffmanCodes}
        className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 block mx-auto"
      >
        Generate Huffman Codes
      </button> */}

      {/* Conditional Rendering for Visualizations */}
      {isGenerated && (
        <>
          {/* Tree Visualization */}
          <div className="h-96 dark:text-yellow-600 dark:bg-gray-700 border mt-4 bg-white rounded shadow-sm overflow-hidden relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              panOnDrag={true} // ✅ Allow panning
              zoomOnScroll={true} // ✅ Allow zooming
              nodesDraggable={true} // ✅ Allow moving nodes
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          {/* Huffman Codes & Frequencies */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Huffman Codes */}
            <div className="p-2 bg-white dark:bg-gray-600 rounded shadow-sm">
              <h3 className="font-semiboldd text-center">Generated Huffman Codes:</h3>
              <ul className="mt-2 text-center">
                {Object.entries(codes).map(([char, code]) => (
                  <li key={char} className="text-blue-600 dark:text-yellow-600 font-mono">
                    {char}: <strong>{code}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Letter Frequencies */}
            <div className="p-2 bg-white dark:bg-gray-600 rounded shadow-sm">
              <h3 className="font-semibold text-center">Letter Frequencies:</h3>
              <ul className="mt-2 text-center">
                {Object.entries(text.split('').reduce((acc, char) => { acc[char] = (acc[char] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([char, freq]) => (
                  <li key={char} className="text-gray-700 dark:text-white font-mono">
                    {char}: <strong>{freq}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HuffmanCoding;
