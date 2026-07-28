function topKFrequent(nums: number[], k: number): number[] {
  const hm: Record<number, number> = {};

  // Count frequency
  nums.forEach((value) => {
    if (!(value in hm)) {
      hm[value] = 0;
    }
    hm[value]++;
  });

  const sorted = Object.keys(hm).map(Number).sort((a, b) => hm[b] - hm[a]);

  return sorted.slice(0, k);
}

// Try it out — press Run
console.log(topKFrequent([1,1,1,2,2,3], 2));             // [1, 2]
console.log(topKFrequent([1], 1));                        // [1]
console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2], 2));     // [1, 2]

export {};
