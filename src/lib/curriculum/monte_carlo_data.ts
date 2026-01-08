import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "monte-carlo",
  title: "Monte Carlo Algorithms",
  difficulty: "expert",
  category: "Randomized",
  description: "Probabilistic algorithms with bounded error.",
  runtime: "Varies",
  variants: {
    typescript: `function estimatePi(samples: number): number {
  let inside = 0;
  for (let i = 0; i < samples; i += 1) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside += 1;
  }
  return (4 * inside) / samples;
}`,
    javascript: `function estimatePi(samples) {
  let inside = 0;
  for (let i = 0; i < samples; i += 1) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside += 1;
  }
  return (4 * inside) / samples;
}`,
    python: `import random

def estimate_pi(samples):
    inside = 0
    for _ in range(samples):
        x = random.random()
        y = random.random()
        if x * x + y * y <= 1:
            inside += 1
    return 4 * inside / samples`,
    java: `public double estimatePi(int samples) {
    java.util.Random random = new java.util.Random();
    int inside = 0;
    for (int i = 0; i < samples; i++) {
        double x = random.nextDouble();
        double y = random.nextDouble();
        if (x * x + y * y <= 1) inside++;
    }
    return 4.0 * inside / samples;
}`,
    csharp: `public double EstimatePi(int samples)
{
    var random = new Random();
    int inside = 0;
    for (int i = 0; i < samples; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1) inside++;
    }
    return 4.0 * inside / samples;
}`,
    c: `// Monte Carlo estimation of PI
#include <stdlib.h>

int monte_carlo_pi(int samples, double *pi_out) {
  int inside = 0;
  for (int i = 0; i < samples; i++) {
    double x = (double)rand() / RAND_MAX;
    double y = (double)rand() / RAND_MAX;
    if (x * x + y * y <= 1.0) inside++;
  }
  *pi_out = 4.0 * inside / samples;
  return 0;
}`,
  },
};

export default algorithm;
