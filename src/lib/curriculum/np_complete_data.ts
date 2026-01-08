import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "np-complete",
  title: "NP-Complete Problems",
  difficulty: "expert",
  category: "Complexity",
  description: "Canonical NP-complete problems and reductions.",
  runtime: "Exponential",
  variants: {
    typescript: `const npComplete = ["SAT", "TSP", "VertexCover", "Clique"];

function reduceSAT(instance: string): string {
  return "Reduced(" + instance + ")";
}`,
    javascript: `const npComplete = ["SAT", "TSP", "VertexCover", "Clique"];

function reduceSAT(instance) {
  return "Reduced(" + instance + ")";
}`,
    python: `np_complete = ["SAT", "TSP", "VertexCover", "Clique"]

def reduce_sat(instance):
    return f"Reduced({instance})"`,
    java: `String[] npComplete = {"SAT", "TSP", "VertexCover", "Clique"};

String reduceSAT(String instance) {
    return "Reduced(" + instance + ")";
}`,
    csharp: `string[] npComplete = { "SAT", "TSP", "VertexCover", "Clique" };

string ReduceSat(string instance)
{
    return $"Reduced({instance})";
}`,
    c: `// NP-Complete (toy reductions)
#include <stdio.h>
#include <string.h>

void reduce_sat(const char *instance, char *out, size_t out_size) {
  snprintf(out, out_size, "Reduced(%s)", instance);
}

int is_np_complete_problem(const char *name) {
  const char *known[] = {"SAT", "TSP", "VertexCover", "Clique"};
  for (int i = 0; i < 4; i++) {
    if (strcmp(name, known[i]) == 0) return 1;
  }
  return 0;
}`,
  },
};

export default algorithm;
