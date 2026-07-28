import type { Module } from '../../python101/types';

const module26: Module = {
  id: 'leetcode-981-time-based-key-value-store',
  slug: '26',
  title: '981. Time Based Key-Value Store',
  description:
    'Store timestamped values by key and retrieve the newest value available at a requested time. Keep each key’s history sorted and use binary search for efficient lookups.',
  icon: '⏱',
  color: 'from-sky-500 to-indigo-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-time-map-problem',
      title: 'The Problem',
      content: `**981. Time Based Key-Value Store** - Medium

Design a time-based key-value data structure that can store multiple values for the same key at different timestamps.

Implement the **TimeMap** class:

- \`TimeMap()\` initializes the data structure.
- \`set(key, value, timestamp)\` stores **value** for **key** at the given **timestamp**.
- \`get(key, timestamp)\` returns the value stored with the largest previous timestamp satisfying \`timestamp_prev <= timestamp\`.
- If no suitable value exists, \`get\` returns an empty string.

**Example**
Input:
\`["TimeMap", "set", "get", "get", "set", "get", "get"]\`
\`[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]\`

Output:
\`[null, null, "bar", "bar", null, "bar2", "bar2"]\`

**Constraints**
- 1 <= key.length, value.length <= 100
- Keys and values contain lowercase English letters and digits.
- 1 <= timestamp <= 10^7
- Timestamps passed to \`set\` are strictly increasing.
- At most 2 * 10^5 calls are made to \`set\` and \`get\`.`,
      codeExamples: [],
    },
    {
      id: 'lesson-time-map-solution',
      title: 'Hash Map with Binary Search',
      content: `Your solution combines a hash map with binary search.

The dictionary \`hmv\` maps each key to a list of \`[value, timestamp]\` pairs.

Because timestamps passed to \`set\` are strictly increasing, appending each new pair automatically keeps every key's history sorted by timestamp. No separate sorting step is needed.

**Setting a value**

\`setdefault(key, [])\` creates an empty history for a new key. The new value and timestamp are then appended to that history.

**Getting a value**

For the requested key, binary search finds the rightmost entry whose stored timestamp is less than or equal to the query timestamp:

1. Start with \`val = ''\` in case no valid entry exists.
2. If the middle timestamp is valid, save its value and move \`left\` right to look for a newer valid entry.
3. If the middle timestamp is too new, move \`right\` left.
4. Return the newest valid value found.

This is an upper-bound-style binary search: it keeps searching after finding a valid entry because a later timestamp may also satisfy the query.

Let **m** be the number of values stored for the requested key.

**Complexity**
- \`set\`: **O(1)** average time
- \`get\`: **O(log m)** time
- Total space: **O(n)** for all stored values`,
      codeExamples: [
        {
          language: 'python',
          code: `class TimeMap:

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
print(time_map.get("foo", 5))  # bar2`,
          caption: 'Python - timestamp histories with rightmost-valid binary search',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'leetcode-981-history-order',
      type: 'multiple-choice',
      prompt: 'Why can `set` append new entries without sorting the history?',
      choices: [
        { id: 'a', text: 'Dictionary keys are always sorted.' },
        { id: 'b', text: 'Values are guaranteed to be unique.' },
        {
          id: 'c',
          text: 'Timestamps supplied to `set` are strictly increasing.',
        },
        { id: 'd', text: 'Binary search works on unsorted data.' },
      ],
      correctAnswer: 'c',
      explanation:
        'Strictly increasing set timestamps mean every appended entry comes after the existing entries chronologically.',
    },
    {
      id: 'leetcode-981-valid-middle',
      type: 'multiple-choice',
      prompt:
        'During `get`, why does the solution save the value and move `left = middle + 1` when the middle timestamp is valid?',
      choices: [
        { id: 'a', text: 'To find an even older valid value.' },
        {
          id: 'b',
          text: 'To keep the candidate while searching for a newer valid value.',
        },
        { id: 'c', text: 'To insert the query into the history.' },
        { id: 'd', text: 'To skip every value for the current key.' },
      ],
      correctAnswer: 'b',
      explanation:
        'A valid middle entry is a candidate, but the requested result must use the largest valid timestamp, so the search continues to the right.',
    },
    {
      id: 'leetcode-981-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `TimeMap` class. `get` must return the value with the greatest stored timestamp not exceeding the query timestamp.',
      language: 'python',
      starterCode: `class TimeMap:

    def __init__(self):
        self.hmv = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Store the value and timestamp.
        pass

    def get(self, key: str, timestamp: int) -> str:
        # Binary search for the newest valid value.
        return ''


def run_time_map(operations, arguments):
    time_map = TimeMap()
    output = [None]

    for operation, args in zip(operations[1:], arguments[1:]):
        if operation == 'set':
            output.append(time_map.set(*args))
        else:
            output.append(time_map.get(*args))

    return output
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample',
          description: 'Published sequence with exact and later lookups',
          funcName: 'run_time_map',
          args: [
            ['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get'],
            [
              [],
              ['foo', 'bar', 1],
              ['foo', 1],
              ['foo', 3],
              ['foo', 'bar2', 4],
              ['foo', 4],
              ['foo', 5],
            ],
          ],
          expectedReturn: [null, null, 'bar', 'bar', null, 'bar2', 'bar2'],
        },
        {
          id: 'visible-missing-and-early',
          description: 'Missing keys and queries before the first timestamp',
          funcName: 'run_time_map',
          args: [
            ['TimeMap', 'get', 'set', 'get', 'get'],
            [[], ['missing', 5], ['a', 'one', 10], ['a', 9], ['a', 10]],
          ],
          expectedReturn: [null, '', null, '', 'one'],
        },
        {
          id: 'hidden-multiple-keys',
          hidden: true,
          funcName: 'run_time_map',
          args: [
            [
              'TimeMap',
              'set',
              'set',
              'set',
              'get',
              'get',
              'get',
            ],
            [
              [],
              ['a', 'red', 1],
              ['b', 'blue', 2],
              ['a', 'green', 5],
              ['a', 4],
              ['b', 100],
              ['c', 100],
            ],
          ],
          expectedReturn: [null, null, null, null, 'red', 'blue', ''],
        },
        {
          id: 'hidden-between-timestamps',
          hidden: true,
          funcName: 'run_time_map',
          args: [
            [
              'TimeMap',
              'set',
              'set',
              'set',
              'get',
              'get',
              'get',
              'get',
            ],
            [
              [],
              ['topic', 'first', 2],
              ['topic', 'second', 8],
              ['topic', 'third', 15],
              ['topic', 2],
              ['topic', 7],
              ['topic', 14],
              ['topic', 99],
            ],
          ],
          expectedReturn: [
            null,
            null,
            null,
            null,
            'first',
            'first',
            'second',
            'third',
          ],
        },
      ],
      correctAnswer: '__code__',
      explanation: `Model solution:
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

Why: each key's history is already ordered by timestamp. Binary search preserves every valid value as a candidate and moves right to find the candidate with the largest timestamp.`,
    },
  ],
};

export default module26;
