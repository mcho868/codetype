function maxArea(height: number[]): number {
  let n:number = height.length;
  let left: number = 0;
  let right: number = n - 1;
  let max_area: number = 0;

  while (left < right){

    let area = Math.min(height[left], height[right]) * (right - left);

    max_area = Math.max(area, max_area);

    if (height[left] < height[right]){
      let i: number = 1;

      while (left + i < right && height[left + i] < height[left]){
        i++;
      }
      left += i;
    }
    else{
      let j: number = 1;

      while (right - j > left && height[right - j] < height[right]){
        j++;
      }
      right -= j;
    }
  }

  return max_area;
}

// Try it out — press Run
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));               // 1

export {};
