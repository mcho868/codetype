import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "p-vs-np",
  title: "P vs NP (Theory)",
  difficulty: "expert",
  category: "Complexity",
  description: "Polynomial-time solvable vs verifiable problems.",
  runtime: "N/A",
  variants: {
    typescript: `const problems = ["SAT", "TSP", "VertexCover", "Clique"];

function isVerifier(solution: string): boolean {
  return solution.length > 0;
}

const statement = "P vs NP asks if every verifiable problem is solvable fast.";`,
    javascript: `const problems = ["SAT", "TSP", "VertexCover", "Clique"];

function isVerifier(solution) {
  return solution.length > 0;
}

const statement = "P vs NP asks if every verifiable problem is solvable fast.";`,
    python: `problems = ["SAT", "TSP", "VertexCover", "Clique"]

def is_verifier(solution):
    return len(solution) > 0

statement = "P vs NP asks if every verifiable problem is solvable fast."`,
    java: `String[] problems = {"SAT", "TSP", "VertexCover", "Clique"};

boolean isVerifier(String solution) {
    return solution.length() > 0;
}

String statement = "P vs NP asks if every verifiable problem is solvable fast.";`,
    csharp: `string[] problems = { "SAT", "TSP", "VertexCover", "Clique" };

bool IsVerifier(string solution)
{
    return solution.Length > 0;
}

string statement = "P vs NP asks if every verifiable problem is solvable fast.";`,
    c: `// P vs NP (SAT verifier + brute force solver)
#include <stddef.h>

int verify_sat(int n, int m, int clauses[][3], int assignment[]) {
  for (int i = 0; i < m; i++) {
    int satisfied = 0;
    for (int j = 0; j < 3; j++) {
      int lit = clauses[i][j];
      int var = lit > 0 ? lit : -lit;
      int val = assignment[var - 1];
      if ((lit > 0 && val) || (lit < 0 && !val)) {
        satisfied = 1;
        break;
      }
    }
    if (!satisfied) return 0;
  }
  return 1;
}

int solve_sat_bruteforce(int n, int m, int clauses[][3], int *out_assignment) {
  int total = 1 << n;
  for (int mask = 0; mask < total; mask++) {
    for (int i = 0; i < n; i++) out_assignment[i] = (mask >> i) & 1;
    if (verify_sat(n, m, clauses, out_assignment)) return 1;
  }
  return 0;
}`,
  },
};

export default algorithm;
