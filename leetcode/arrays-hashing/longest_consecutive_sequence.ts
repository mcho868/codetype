function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let longest = 0;

  for (const n of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(n - 1)) {
      let length = 1;
      while (numSet.has(n + length)) {
        length++;
      }
      longest = Math.max(longest, length);
    }
  }

  return longest;
}

// Try it out — press Run
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
console.log(longestConsecutive([])); // 0

export {};
