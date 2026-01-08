import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "convex-hull",
  title: "Convex Hull (Graham Scan)",
  difficulty: "hard",
  category: "Computational Geometry",
  description: "Compute hull of points in O(n log n).",
  runtime: "O(n log n)",
  variants: {
    typescript: `type Point = { x: number; y: number };

function convexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  const cross = (o: Point, a: Point, b: Point) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Point[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: Point[] = [];
  for (const p of sorted.slice().reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}`,
    javascript: `function convexHull(points) {
  const sorted = [...points].sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (const p of [...sorted].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}`,
    python: `def convex_hull(points):
    points = sorted(points)

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]`,
    java: `public java.util.List<int[]> convexHull(java.util.List<int[]> points) {
    points.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));
    java.util.List<int[]> lower = new java.util.ArrayList<>();
    for (int[] p : points) {
        while (lower.size() >= 2) {
            int[] o = lower.get(lower.size() - 2);
            int[] a = lower.get(lower.size() - 1);
            if ((a[0] - o[0]) * (p[1] - o[1]) - (a[1] - o[1]) * (p[0] - o[0]) > 0) break;
            lower.remove(lower.size() - 1);
        }
        lower.add(p);
    }
    java.util.List<int[]> upper = new java.util.ArrayList<>();
    for (int i = points.size() - 1; i >= 0; i--) {
        int[] p = points.get(i);
        while (upper.size() >= 2) {
            int[] o = upper.get(upper.size() - 2);
            int[] a = upper.get(upper.size() - 1);
            if ((a[0] - o[0]) * (p[1] - o[1]) - (a[1] - o[1]) * (p[0] - o[0]) > 0) break;
            upper.remove(upper.size() - 1);
        }
        upper.add(p);
    }
    upper.remove(upper.size() - 1);
    lower.remove(lower.size() - 1);
    lower.addAll(upper);
    return lower;
}`,
    csharp: `public List<(int x, int y)> ConvexHull(List<(int x, int y)> points)
{
    points.Sort((a, b) => a.x == b.x ? a.y.CompareTo(b.y) : a.x.CompareTo(b.x));

    int Cross((int x, int y) o, (int x, int y) a, (int x, int y) b)
        => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

    var lower = new List<(int x, int y)>();
    foreach (var p in points)
    {
        while (lower.Count >= 2 && Cross(lower[^2], lower[^1], p) <= 0) lower.RemoveAt(lower.Count - 1);
        lower.Add(p);
    }

    var upper = new List<(int x, int y)>();
    for (int i = points.Count - 1; i >= 0; i--)
    {
        var p = points[i];
        while (upper.Count >= 2 && Cross(upper[^2], upper[^1], p) <= 0) upper.RemoveAt(upper.Count - 1);
        upper.Add(p);
    }

    lower.RemoveAt(lower.Count - 1);
    upper.RemoveAt(upper.Count - 1);
    lower.AddRange(upper);
    return lower;
}`,
    c: `// Convex Hull (Monotonic Chain)
#include <stdlib.h>

typedef struct {
  long long x;
  long long y;
} Point;

static int cmp_point(const void *a, const void *b) {
  const Point *p = (const Point *)a;
  const Point *q = (const Point *)b;
  if (p->x != q->x) return (p->x > q->x) - (p->x < q->x);
  return (p->y > q->y) - (p->y < q->y);
}

static long long cross(Point a, Point b, Point c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int convex_hull(Point *pts, int n, Point *out) {
  if (n <= 1) { if (n == 1) out[0] = pts[0]; return n; }
  qsort(pts, n, sizeof(Point), cmp_point);
  int k = 0;
  for (int i = 0; i < n; i++) {
    while (k >= 2 && cross(out[k - 2], out[k - 1], pts[i]) <= 0) k--;
    out[k++] = pts[i];
  }
  for (int i = n - 2, t = k + 1; i >= 0; i--) {
    while (k >= t && cross(out[k - 2], out[k - 1], pts[i]) <= 0) k--;
    out[k++] = pts[i];
  }
  return k - 1;
}`,
  },
};

export default algorithm;
