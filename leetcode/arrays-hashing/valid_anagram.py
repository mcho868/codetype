class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        hm = {}
        for val in s:
            if val not in hm:
                hm[val] = 1
            else:
                hm[val] += 1

        for char in t:
            if char not in hm:
                return False
            else:
                hm[char] -= 1
                if hm[char] == 0:
                    hm.pop(char)

        return len(hm) == 0

# Try it out — press Run
sol = Solution()
print(sol.isAnagram("anagram", "nagaram"))  # True
print(sol.isAnagram("rat", "car"))          # False
