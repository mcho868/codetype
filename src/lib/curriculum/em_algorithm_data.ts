import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "em-algorithm",
  title: "EM Algorithm",
  difficulty: "expert",
  category: "Machine Learning",
  description: "Expectation-Maximization for latent variables.",
  runtime: "O(nk)",
  variants: {
    typescript: `type Params = { mean: number; variance: number };

function emStep(data: number[], params: Params): Params {
  const responsibilities = data.map((x) => 1 / (1 + Math.abs(x - params.mean)));
  const weightSum = responsibilities.reduce((a, b) => a + b, 0);
  const newMean = data.reduce((sum, x, i) => sum + x * responsibilities[i], 0) / weightSum;
  const newVar = data.reduce((sum, x, i) => sum + responsibilities[i] * (x - newMean) ** 2, 0) / weightSum;
  return { mean: newMean, variance: newVar };
}`,
    javascript: `function emStep(data, params) {
  const responsibilities = data.map((x) => 1 / (1 + Math.abs(x - params.mean)));
  const weightSum = responsibilities.reduce((a, b) => a + b, 0);
  const newMean = data.reduce((sum, x, i) => sum + x * responsibilities[i], 0) / weightSum;
  const newVar = data.reduce((sum, x, i) => sum + responsibilities[i] * (x - newMean) ** 2, 0) / weightSum;
  return { mean: newMean, variance: newVar };
}`,
    python: `def em_step(data, params):
    responsibilities = [1 / (1 + abs(x - params["mean"])) for x in data]
    weight_sum = sum(responsibilities)
    new_mean = sum(x * r for x, r in zip(data, responsibilities)) / weight_sum
    new_var = sum(r * (x - new_mean) ** 2 for x, r in zip(data, responsibilities)) / weight_sum
    return {"mean": new_mean, "variance": new_var}`,
    java: `public double[] emStep(double[] data, double mean) {
    double[] resp = new double[data.length];
    double weightSum = 0;
    for (int i = 0; i < data.length; i++) {
        resp[i] = 1.0 / (1.0 + Math.abs(data[i] - mean));
        weightSum += resp[i];
    }
    double newMean = 0;
    for (int i = 0; i < data.length; i++) newMean += data[i] * resp[i];
    newMean /= weightSum;
    double newVar = 0;
    for (int i = 0; i < data.length; i++) newVar += resp[i] * Math.pow(data[i] - newMean, 2);
    newVar /= weightSum;
    return new double[] { newMean, newVar };
}`,
    csharp: `public (double mean, double variance) EmStep(double[] data, double mean)
{
    var resp = data.Select(x => 1.0 / (1.0 + Math.Abs(x - mean))).ToArray();
    double weightSum = resp.Sum();
    double newMean = data.Zip(resp, (x, r) => x * r).Sum() / weightSum;
    double newVar = data.Zip(resp, (x, r) => r * Math.Pow(x - newMean, 2)).Sum() / weightSum;
    return (newMean, newVar);
}`,
    c: `// EM Algorithm for 1D Gaussian Mixture (2 components)
#include <math.h>

static double gaussian(double x, double mu, double sigma2) {
  double diff = x - mu;
  return exp(-diff * diff / (2.0 * sigma2)) / sqrt(2.0 * M_PI * sigma2);
}

void em_gmm_1d(const double *data, int n, int iters,
               double *mu1, double *mu2, double *s1, double *s2, double *w1) {
  double w2 = 1.0 - *w1;
  for (int it = 0; it < iters; it++) {
    double sum_r1 = 0.0, sum_r2 = 0.0;
    double sum_x1 = 0.0, sum_x2 = 0.0;
    double sum_v1 = 0.0, sum_v2 = 0.0;
    for (int i = 0; i < n; i++) {
      double p1 = (*w1) * gaussian(data[i], *mu1, *s1);
      double p2 = w2 * gaussian(data[i], *mu2, *s2);
      double r1 = p1 / (p1 + p2);
      double r2 = 1.0 - r1;
      sum_r1 += r1;
      sum_r2 += r2;
      sum_x1 += r1 * data[i];
      sum_x2 += r2 * data[i];
    }
    *mu1 = sum_x1 / sum_r1;
    *mu2 = sum_x2 / sum_r2;
    for (int i = 0; i < n; i++) {
      double p1 = (*w1) * gaussian(data[i], *mu1, *s1);
      double p2 = w2 * gaussian(data[i], *mu2, *s2);
      double r1 = p1 / (p1 + p2);
      double r2 = 1.0 - r1;
      double d1 = data[i] - *mu1;
      double d2 = data[i] - *mu2;
      sum_v1 += r1 * d1 * d1;
      sum_v2 += r2 * d2 * d2;
    }
    *s1 = sum_v1 / sum_r1;
    *s2 = sum_v2 / sum_r2;
    *w1 = sum_r1 / n;
    w2 = 1.0 - *w1;
  }
}`,
  },
};

export default algorithm;
