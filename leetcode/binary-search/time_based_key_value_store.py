class TimeMap:

    def __init__(self):
        self.hmv = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.hmv.setdefault(key, []).append([value, timestamp])

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.hmv:
            return ''
        set_to_look = self.hmv[key]
        left = 0
        right = len(set_to_look) - 1
        val = ''
        while left <= right:
            middle = (left + right) // 2
            if set_to_look[middle][1] <= timestamp:
                val = set_to_look[middle][0]
                left = middle + 1
            else:
                right = middle - 1
        return val

# Try it out - press Run
time_map = TimeMap()
time_map.set("foo", "bar", 1)
print(time_map.get("foo", 1))  # bar
print(time_map.get("foo", 3))  # bar
time_map.set("foo", "bar2", 4)
print(time_map.get("foo", 5))  # bar2
