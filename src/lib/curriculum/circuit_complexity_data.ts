import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "circuit-complexity",
  title: "Circuit Complexity",
  difficulty: "expert",
  category: "Complexity",
  description: "Lower bounds for Boolean circuits.",
  runtime: "N/A",
  variants: {
    typescript: `type Gate = "AND" | "OR" | "NOT";

type Circuit = { gates: Gate[] };

function gateCount(circuit: Circuit): number {
  return circuit.gates.length;
}`,
    javascript: `function gateCount(circuit) {
  return circuit.gates.length;
}`,
    python: `def gate_count(circuit):
    return len(circuit["gates"])`,
    java: `int gateCount(java.util.List<String> gates) {
    return gates.size();
}`,
    csharp: `int GateCount(List<string> gates)
{
    return gates.Count;
}`,
    c: `// Circuit Complexity (toy example)
#include <stdlib.h>

typedef enum { GATE_AND, GATE_OR, GATE_NOT, GATE_INPUT } GateType;

typedef struct Gate {
  GateType type;
  int input_a;
  int input_b;
} Gate;

int eval_gate(const Gate *gates, const int *inputs, int idx) {
  Gate g = gates[idx];
  if (g.type == GATE_INPUT) return inputs[g.input_a];
  if (g.type == GATE_NOT) return !eval_gate(gates, inputs, g.input_a);
  int a = eval_gate(gates, inputs, g.input_a);
  int b = eval_gate(gates, inputs, g.input_b);
  return (g.type == GATE_AND) ? (a && b) : (a || b);
}

int circuit_size(const Gate *gates, int n) {
  return n;
}`,
  },
};

export default algorithm;
