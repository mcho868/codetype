function containsDuplicate(nums: number[]): boolean {
  const hm = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (!hm.has(n)) {
      hm.set(n, i);
    } else if (hm.get(n) !== i) {
      return true;
    }
  }
  return false;
}

// Try it out — press Run
console.log(containsDuplicate([1,2,3,1]));            // true
console.log(containsDuplicate([1,2,3,4]));            // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // true

export {};
