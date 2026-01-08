import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "sgd",
  title: "Stochastic Gradient Descent (SGD)",
  difficulty: "expert",
  category: "Machine Learning",
  description: "Iterative optimization for model parameters.",
  runtime: "O(d)",
  variants: {
    typescript: `function sgd(weights: number[], gradients: number[], lr: number): number[] {
  return weights.map((w, i) => w - lr * gradients[i]);
}`,
    javascript: `function sgd(weights, gradients, lr) {
  return weights.map((w, i) => w - lr * gradients[i]);
}`,
    python: `def sgd(weights, gradients, lr):
    return [w - lr * g for w, g in zip(weights, gradients)]`,
    java: `public double[] sgd(double[] weights, double[] gradients, double lr) {
    double[] result = new double[weights.length];
    for (int i = 0; i < weights.length; i++) result[i] = weights[i] - lr * gradients[i];
    return result;
}`,
    csharp: `public double[] Sgd(double[] weights, double[] gradients, double lr)
{
    var result = new double[weights.Length];
    for (int i = 0; i < weights.Length; i++)
    {
        result[i] = weights[i] - lr * gradients[i];
    }
    return result;
}`,
    c: `// Stochastic Gradient Descent for linear regression
#include <stdlib.h>

void sgd_linear(double *x, double *y, int n, int iters, double lr, double *w, double *b) {
  for (int it = 0; it < iters; it++) {
    int i = rand() % n;
    double pred = (*w) * x[i] + (*b);
    double err = pred - y[i];
    *w -= lr * err * x[i];
    *b -= lr * err;
  }
}`,
  },
};

export default algorithm;
