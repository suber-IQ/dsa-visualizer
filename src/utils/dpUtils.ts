// dpUtils.ts
export const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };
  
  export const knapsack = (values: number[], weights: number[], capacity: number) => {
    const n = values.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  
    // Build DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    // Backtrack to find the items contributing to max value
    const selectedItems: number[] = [];
    let w = capacity;
    for (let i = n; i > 0 && dp[i][w] > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedItems.push(i - 1);
        w -= weights[i - 1];
      }
    }
  
    return { maxValue: dp[n][capacity], dpTable: dp, selectedItems };
  };
  


  
  export const lcs = (text1: string, text2: string) => {
    const m = text1.length, n = text2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
  
    let i = m, j = n;
    let sequence = "";
  
    while (i > 0 && j > 0) {
      if (text1[i - 1] === text2[j - 1]) {
        sequence = text1[i - 1] + sequence;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  
    return { length: dp[m][n], dpTable: dp, sequence };
  };
  
  export const lis = (nums: number[]) => {
    const n = nums.length;
    if (n === 0) return { length: 0, sequence: [], steps: [] };
  
    const dp = Array(n).fill(1);
    const prev = Array(n).fill(-1);
    let maxLength = 1, lastIndex = 0;
    const steps: number[][] = [];
  
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
          prev[i] = j;
        }
      }
      steps.push([...dp]); // Store DP table after each iteration
      if (dp[i] > maxLength) {
        maxLength = dp[i];
        lastIndex = i;
      }
    }
  
    // Backtrack to get LIS sequence
    const sequence: number[] = [];
    while (lastIndex !== -1) {
      sequence.unshift(nums[lastIndex]);
      lastIndex = prev[lastIndex];
    }
  
    return { length: maxLength, sequence, steps };
  };
  