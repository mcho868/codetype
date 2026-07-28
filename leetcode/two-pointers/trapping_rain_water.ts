function trap(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;

    let total: number = 0;
    let leftMax: number[] = new Array(n);
    let rightMax: number[] = new Array(n);

    leftMax[0] = height[0];

    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    for (let i = 0; i < n; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        total += waterLevel - height[i];
    }

    return total;
}

// Try it out — press Run
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));             // 9

export {};
