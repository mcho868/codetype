import type { Module } from '../python101/types';

const module6: Module = {
  id: 'leetcode-36-valid-sudoku',
  slug: '6',
  title: '36. Valid Sudoku',
  description:
    'Determine if a 9×9 Sudoku board is valid by checking rows, columns, and 3×3 sub-boxes for duplicate digits using hash sets.',
  icon: '🔢',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-valid-sudoku-problem',
      title: 'The Problem',
      content: `**36. Valid Sudoku** — Medium

You are given a 9×9 Sudoku **board**. A Sudoku board is valid if:
- Each **row** contains the digits 1–9 without duplicates.
- Each **column** contains the digits 1–9 without duplicates.
- Each of the nine **3×3 sub-boxes** contains the digits 1–9 without duplicates.

Return **true** if the board is valid, otherwise **false**.

Note: A board does not need to be full or solvable to be valid.

**Example 1**
Input: board =
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","8",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]
Output: true

**Example 2**
Input: (same board but board[2][2] = "1" instead of "8")
Output: false
Explanation: There are two 1's in the top-left 3×3 sub-box.

**Constraints**
- board.length == 9
- board[i].length == 9
- board[i][j] is a digit 1–9 or '.'.`,
      codeExamples: [],
    },
    {
      id: 'lesson-valid-sudoku-hash-sets',
      title: 'Hash Sets — O(1) (fixed 81-cell board)',
      content: `We maintain three collections of sets — one per row, one per column, one per 3×3 box — and scan the board once. Any duplicate digit within a set immediately means the board is invalid.

**How it works**
- For each cell (r, c) that isn't '.':
  - Check/insert into \`rows[r]\`.
  - Check/insert into \`cols[c]\`.
  - Derive the box index as \`(r // 3) * 3 + (c // 3)\` — this maps each cell to one of the 9 boxes (0–8), then check/insert into \`boxes[box_index]\`.
- If any insertion finds the digit already present, return false.

**Box index formula:** dividing row and column by 3 (integer) gives the box's row (0–2) and column (0–2) within the 3×3 grid. Multiplying box-row by 3 and adding box-col gives a flat index 0–8.

**Complexity**
- Time: **O(1)** — the board is always 9×9, so we do exactly 81 iterations.
- Space: **O(1)** — sets hold at most 9 × 9 = 81 digits total.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]

        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == '.':
                    continue

                box = (r // 3) * 3 + (c // 3)

                if val in rows[r] or val in cols[c] or val in boxes[box]:
                    return False

                rows[r].add(val)
                cols[c].add(val)
                boxes[box].add(val)

        return True

# Try it out — press Run
sol = Solution()
board1 = [
    ["1","2",".",".","3",".",".",".","."],
    ["4",".",".","5",".",".",".",".","."],
    [".","9","8",".",".",".",".",".","3"],
    ["5",".",".",".","6",".",".",".","4"],
    [".",".",".","8",".","3",".",".","5"],
    ["7",".",".",".","2",".",".",".","6"],
    [".",".",".",".",".",".","2",".","."],
    [".",".",".","4","1","9",".",".","8"],
    [".",".",".",".","8",".",".","7","9"],
]
print(sol.isValidSudoku(board1))  # True

board2 = [row[:] for row in board1]
board2[2][2] = "1"  # creates duplicate 1 in top-left box
print(sol.isValidSudoku(board2))  # False`,
          caption: 'Python — O(1) hash sets for rows, cols, and boxes',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function isValidSudoku(board: string[][]): boolean {
  const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set());
  const cols: Set<string>[] = Array.from({ length: 9 }, () => new Set());
  const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(val) || cols[c].has(val) || boxes[box].has(val)) {
        return false;
      }

      rows[r].add(val);
      cols[c].add(val);
      boxes[box].add(val);
    }
  }

  return true;
}

// Try it out — press Run
const board1 = [
  ["1","2",".",".","3",".",".",".","."],
  ["4",".",".","5",".",".",".",".","."],
  [".","9","8",".",".",".",".",".","3"],
  ["5",".",".",".","6",".",".",".","4"],
  [".",".",".","8",".","3",".",".","5"],
  ["7",".",".",".","2",".",".",".","6"],
  [".",".",".",".",".",".","2",".","."],
  [".",".",".","4","1","9",".",".","8"],
  [".",".",".",".","8",".",".","7","9"],
];
console.log(isValidSudoku(board1)); // true
const board2 = board1.map(r => [...r]);
board2[2][2] = "1";
console.log(isValidSudoku(board2)); // false`,
          caption: 'TypeScript — O(1) hash sets for rows, cols, and boxes',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module6;
