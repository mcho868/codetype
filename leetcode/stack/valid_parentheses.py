class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        close_to_open = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in close_to_open:
                if not stack or stack[-1] != close_to_open[char]:
                    return False
                stack.pop()
            else:
                stack.append(char)

        return len(stack) == 0

# Try it out — press Run
sol = Solution()
print(sol.isValid("[]"))      # True
print(sol.isValid("([{}])"))  # True
print(sol.isValid("[(])"))    # False
print(sol.isValid("(]"))      # False
