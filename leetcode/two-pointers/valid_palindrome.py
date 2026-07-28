class Solution:
    def isPalindrome(self, s: str) -> bool:
        import re

        s = re.sub(r"[^a-zA-Z0-9]", "", s).lower()

        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True

# Try it out — press Run
sol = Solution()
print(sol.isPalindrome("Was it a car or a cat I saw?"))  # True
print(sol.isPalindrome("tab a cat"))                     # False
print(sol.isPalindrome("A man, a plan, a canal: Panama")) # True
