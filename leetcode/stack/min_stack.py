class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]

# Try it out — press Run
ms = MinStack()
ms.push(1)
ms.push(2)
ms.push(0)
print(ms.getMin())  # 0
ms.pop()
print(ms.top())     # 2
print(ms.getMin())  # 1
