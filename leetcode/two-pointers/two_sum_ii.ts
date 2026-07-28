function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    else if (total < target) left++;
    else right--;
  }

  return [];
}

// Try it out — press Run
console.log(twoSum([1,2,3,4], 3));    // [1, 2]
console.log(twoSum([1,3,4,5,7], 9));  // [3, 4]

export {};
