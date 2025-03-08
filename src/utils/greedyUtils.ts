// greedyUtils.ts
export interface Activity {
    start: number;
    end: number;
  }
  

  export const activitySelection = (activities: Activity[]): Activity[] => {
    if (!activities.length) return [];
  
    // Sort activities by finishing time
    activities.sort((a, b) => a.end - b.end);
  
    const selectedActivities: Activity[] = [];
    let lastEndTime = 0;
  
    for (const activity of activities) {
      if (activity.start >= lastEndTime) {
        selectedActivities.push(activity);
        lastEndTime = activity.end;
      }
    }
  
    return selectedActivities;
  };
  
// 👉 HuffmanCoding
export interface HuffmanNode {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
}

class MinHeap {
  heap: HuffmanNode[];

  constructor() {
    this.heap = [];
  }

  insert(node: HuffmanNode) {
    this.heap.push(node);
    this.heap.sort((a, b) => a.freq - b.freq);
  }

  extractMin(): HuffmanNode | undefined {
    return this.heap.shift();
  }

  size(): number {
    return this.heap.length;
  }
}

export function buildHuffmanTree(frequencies: Record<string, number>): HuffmanNode {
  const heap = new MinHeap();

  for (const [char, freq] of Object.entries(frequencies)) {
    heap.insert({ char, freq });
  }

  while (heap.size() > 1) {
    const left = heap.extractMin()!;
    const right = heap.extractMin()!;
    heap.insert({ freq: left.freq + right.freq, left, right });
  }

  return heap.extractMin()!;
}

export function huffmanCoding(frequencies: Record<string, number>): Record<string, string> {
  const root = buildHuffmanTree(frequencies);
  const codes: Record<string, string> = {};

  function generateCode(node: HuffmanNode, code: string) {
    if (!node) return;
    if (node.char) codes[node.char] = code;
    generateCode(node.left!, code + "0");
    generateCode(node.right!, code + "1");
  }

  generateCode(root, "");
  return codes;
}