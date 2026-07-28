function isValidSudoku(board: string[][]): boolean {
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
console.log(isValidSudoku(board2)); // false

export {};
