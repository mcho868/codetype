from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        grouped = {}
        for word in strs:
            sorted_key = "".join(sorted(word))
            if sorted_key not in grouped:
                grouped[sorted_key] = []
            grouped[sorted_key].append(word)
        return list(grouped.values())

# Try it out — press Run
sol = Solution()
print(sol.groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
# [['eat','tea','ate'], ['tan','nat'], ['bat']] (order may vary)
print(sol.groupAnagrams([""]))   # [['']]
print(sol.groupAnagrams(["a"]))  # [['a']]
