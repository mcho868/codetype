function twoSum(nums: number[], target: number): number[] {
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const diff = target - n;
    if (hashMap.has(diff)) {
      return [hashMap.get(diff)!, i];
    }
    hashMap.set(n, i);
  }

  return [];
}

// Try it out — press Run
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6));         // [0, 1]

export {};
