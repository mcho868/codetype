import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "fine-grained-complexity",
  title: "Fine-Grained Complexity",
  difficulty: "expert",
  category: "Complexity",
  description: "Hardness under conjectures like SETH.",
  runtime: "N/A",
  variants: {
    typescript: `const conjectures = ["SETH", "3SUM-hard", "APSP-hard"];

function isHard(problem: string): boolean {
  return conjectures.some((c) => problem.includes(c));
}`,
    javascript: `const conjectures = ["SETH", "3SUM-hard", "APSP-hard"];

function isHard(problem) {
  return conjectures.some((c) => problem.includes(c));
}`,
    python: `conjectures = ["SETH", "3SUM-hard", "APSP-hard"]

def is_hard(problem):
    return any(c in problem for c in conjectures)`,
    java: `String[] conjectures = {"SETH", "3SUM-hard", "APSP-hard"};

boolean isHard(String problem) {
    for (String c : conjectures) {
        if (problem.contains(c)) return true;
    }
    return false;
}`,
    csharp: `string[] conjectures = { "SETH", "3SUM-hard", "APSP-hard" };

bool IsHard(string problem)
{
    return conjectures.Any(c => problem.Contains(c));
}`,
    c: `// Fine-Grained Complexity (Orthogonal Vectors check)
#include <stdlib.h>

int has_orthogonal_pair(const unsigned int *a, const unsigned int *b, int n, int dim) {
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      int ok = 1;
      for (int k = 0; k < dim; k++) {
        if (a[i * dim + k] & b[j * dim + k]) { ok = 0; break; }
      }
      if (ok) return 1;
    }
  }
  return 0;
}`,
  },
};

export default algorithm;
