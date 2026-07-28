function isValid(s: string): boolean {
  const stack: string[] = [];
  const closeToOpen: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (const char of s) {
    if (char in closeToOpen) {
      if (stack.length === 0 || stack[stack.length - 1] !== closeToOpen[char]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

// Try it out — press Run
console.log(isValid("[]"));      // true
console.log(isValid("([{}])")); // true
console.log(isValid("[(])"));   // false
console.log(isValid("(]"));     // false

export {};
