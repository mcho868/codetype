function largestRectangleArea(heights: number[]): number {
  const stack: [number, number][] = [];
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    const h = heights[i];
    let start = i;

    while (stack.length > 0 && stack[stack.length - 1][1] > h) {
      const [index, height] = stack.pop()!;
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }
    stack.push([start, h]);
  }

  for (const [i, h] of stack) {
    maxArea = Math.max(maxArea, h * (heights.length - i));
  }

  return maxArea;
}

// Try it out — press Run
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([7,1,7,2,2,4])); // 8
console.log(largestRectangleArea([1,3,7]));        // 7

export {};
