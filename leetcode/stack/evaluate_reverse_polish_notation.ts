function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const operands = new Set(["+", "-", "/", "*"]);

  for (const token of tokens) {
    if (operands.has(token)) {
      const nOne = stack.pop()!;
      const nTwo = stack.pop()!;

      if (token === "+") {
        stack.push(nTwo + nOne);
      } else if (token === "-") {
        stack.push(nTwo - nOne);
      } else if (token === "/") {
        stack.push(Math.trunc(nTwo / nOne));
      } else if (token === "*") {
        stack.push(nTwo * nOne);
      }
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop()!;
}

// Try it out — press Run
console.log(evalRPN(["1","2","+","3","*","4","-"])); // 5
console.log(evalRPN(["4","13","5","/","+"]));         // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])); // 22

export {};
