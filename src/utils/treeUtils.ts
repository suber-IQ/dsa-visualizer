export class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number;
  
    constructor(value: number) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }
  
  // Get height of the node
  const getHeight = (node: TreeNode | null): number => (node ? node.height : 0);
  
  // Get balance factor
  const getBalance = (node: TreeNode | null): number => 
    node ? getHeight(node.left) - getHeight(node.right) : 0;
  
  // Right Rotate
  export const rightRotate = (y: TreeNode): TreeNode => {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  };
  
  // Left Rotate
 export const leftRotate = (x: TreeNode): TreeNode => {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
  };
  
  // Insert into AVL Tree
  export const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) return new TreeNode(value);
    
    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    } else {
      return node;
    }
  
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    const balance = getBalance(node);
  
    if (balance > 1 && value < node.left!.value) return rightRotate(node);
    if (balance < -1 && value > node.right!.value) return leftRotate(node);
    if (balance > 1 && value > node.left!.value) {
      node.left = leftRotate(node.left!);
      return rightRotate(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = rightRotate(node.right!);
      return leftRotate(node);
    }
  
    return node;
  };
  
  // Search a value in BST
  export const searchBST = (node: TreeNode | null, value: number): boolean => {
    if (!node) return false;
    if (node.value === value) return true;
    return value < node.value ? searchBST(node.left, value) : searchBST(node.right, value);
  };
  
  // Find min value node
  const minValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  };
  
  // Delete a node from BST
  export const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;
  
    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const temp = minValueNode(node.right);
      node.value = temp.value;
      node.right = deleteNode(node.right, temp.value);
    }
  
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    const balance = getBalance(node);
  
    if (balance > 1 && getBalance(node.left) >= 0) return rightRotate(node);
    if (balance < -1 && getBalance(node.right) <= 0) return leftRotate(node);
    if (balance > 1 && getBalance(node.left) < 0) {
      node.left = leftRotate(node.left!);
      return rightRotate(node);
    }
    if (balance < -1 && getBalance(node.right) > 0) {
      node.right = rightRotate(node.right!);
      return leftRotate(node);
    }
  
    return node;
  };
  
  // Lowest Common Ancestor
  export const findLCA = (node: TreeNode | null, n1: number, n2: number): TreeNode | null => {
    if (!node) return null;
    if (node.value > n1 && node.value > n2) return findLCA(node.left, n1, n2);
    if (node.value < n1 && node.value < n2) return findLCA(node.right, n1, n2);
    return node;
  };
  
  // Inorder Traversal
  export const inorderTraversal = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
      inorderTraversal(node.left, result);
      result.push(node.value);
      inorderTraversal(node.right, result);
    }
    return result;
  };
  
  // Preorder Traversal
  export const preorderTraversal = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
      result.push(node.value);
      preorderTraversal(node.left, result);
      preorderTraversal(node.right, result);
    }
    return result;
  };
  
  // Postorder Traversal
  export const postorderTraversal = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
      postorderTraversal(node.left, result);
      postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  };
  