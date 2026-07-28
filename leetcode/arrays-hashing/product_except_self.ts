function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const output = new Array(n).fill(1);

  // Left pass: output[i] = product of all elements before i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    output[i] = prefix;
    prefix *= nums[i];
  }

  // Right pass: multiply by product of all elements after i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= suffix;
    suffix *= nums[i];
  }

  return output;
}

// Try it out — press Run
console.log(productExceptSelf([1,2,4,6]));      // [48, 24, 12, 8]
console.log(productExceptSelf([-1,0,1,2,3]));   // [0, -6, 0, 0, 0]

export {};
