// Recursive function to find GCD
export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};


// Recursive
export const primeFactorsRecursive = (n: number, factor: number = 2, factors: number[] = []): number[] => {
  if (n <= 1) return factors;
  if (n % factor === 0) {
    factors.push(factor);
    return primeFactorsRecursive(n / factor, factor, factors);
  }
  return primeFactorsRecursive(n, factor + (factor === 2 ? 1 : 2), factors); // Skip even numbers after 2
};


// Recursive function for Sieve of Eratosthenes
export const sieveHelper = (arr: boolean[], i: number, n: number): void => {
  if (i * i > n) return;
  if (arr[i]) {
    for (let j = i * i; j <= n; j += i) {
      arr[j] = false;
    }
  }
  sieveHelper(arr, i + 1, n);
};

export const sieveOfEratosthenes = (n: number, i: number = 2): number[] => {
  const primes: boolean[] = Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  sieveHelper(primes, i, n);
  return primes.map((isPrime, index) => (isPrime ? index : -1)).filter(num => num !== -1);
};
