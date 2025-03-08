export const generateRandomSudoku = (size: number): number[][] => {
  const board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const fillDiagonal = () => {
    for (let i = 0; i < size; i += Math.sqrt(size)) {
      fillBox(i, i);
    }
  };

  const fillBox = (row: number, col: number) => {
    const nums = shuffle([...Array(size).keys()].map((x) => x + 1));
    let idx = 0;
    for (let i = 0; i < Math.sqrt(size); i++) {
      for (let j = 0; j < Math.sqrt(size); j++) {
        board[row + i][col + j] = nums[idx++];
      }
    }
  };

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  fillDiagonal();
  return board;
};

export const solveSudokuWithVisualization = (board: number[][]) => {
  const steps: number[][][] = [];
  const size = board.length;

  const isValid = (row: number, col: number, num: number) => {
    for (let x = 0; x < size; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const sqrt = Math.sqrt(size);
    const startRow = row - (row % sqrt);
    const startCol = col - (col % sqrt);
    for (let i = 0; i < sqrt; i++) {
      for (let j = 0; j < sqrt; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  const solve = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              steps.push(board.map((r) => [...r]));
              if (solve()) return true;
              board[row][col] = 0;
              steps.push(board.map((r) => [...r]));
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
  return steps;
};
  // ✅ N-Queens Solver with Visualization
  export const solveNQueensWithVisualization = (n: number) => {
    const solutions: number[][][] = [];
    const board = Array.from({ length: n }, () => Array(n).fill(0));
    let count = 0;
  
    const isSafe = (row: number, col: number) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      return true;
    };
  
    const solve = (row: number) => {
      if (row === n) {
        solutions.push(board.map((r) => [...r]));
        count++;
        return;
      }
  
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          solutions.push(board.map((r) => [...r])); // Store the step
          solve(row + 1);
          board[row][col] = 0;
        }
      }
    };
  
    solve(0);
    return { steps: solutions, count };
  };
  