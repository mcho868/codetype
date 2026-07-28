import heapq
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        hm = {}
        for num in nums:
            hm[num] = hm.get(num, 0) + 1

        # heapq.nlargest picks the k largest by count in O(n log k)
        return heapq.nlargest(k, hm, key=hm.get)

# Try it out — press Run
sol = Solution()
print(sol.topKFrequent([1,1,1,2,2,3], 2))             # [1, 2]
print(sol.topKFrequent([1], 1))                        # [1]
print(sol.topKFrequent([1,2,1,2,1,2,3,1,3,2], 2))     # [1, 2]
