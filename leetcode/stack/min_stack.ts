class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

// Try it out — press Run
const ms = new MinStack();
ms.push(1);
ms.push(2);
ms.push(0);
console.log(ms.getMin()); // 0
ms.pop();
console.log(ms.top());    // 2
console.log(ms.getMin()); // 1

export {};
