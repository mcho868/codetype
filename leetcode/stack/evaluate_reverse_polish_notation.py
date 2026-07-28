from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        operands = {"+", "-", "/", "*"}

        for token in tokens:
            if token in operands:
                right = stack.pop()
                left = stack.pop()
                if token == "+":
                    stack.append(left + right)
                elif token == "-":
                    stack.append(left - right)
                elif token == "/":
                    stack.append(int(left / right))
                elif token == "*":
                    stack.append(left * right)
            else:
                stack.append(int(token))

        return stack.pop()

# Try it out — press Run
sol = Solution()
print(sol.evalRPN(["1","2","+","3","*","4","-"]))  # 5
print(sol.evalRPN(["4","13","5","/","+"]))          # 6
print(sol.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))  # 22
