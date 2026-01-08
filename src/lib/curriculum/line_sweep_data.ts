import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "line-sweep",
  title: "Line Sweep",
  difficulty: "hard",
  category: "Computational Geometry",
  description: "Process events in sorted order.",
  runtime: "O(n log n)",
  variants: {
    typescript: `type Event = { x: number; delta: number };

function maxOverlap(segments: [number, number][]): number {
  const events: Event[] = [];
  for (const [l, r] of segments) {
    events.push({ x: l, delta: 1 });
    events.push({ x: r, delta: -1 });
  }
  events.sort((a, b) => a.x - b.x || b.delta - a.delta);
  let count = 0;
  let best = 0;
  for (const event of events) {
    count += event.delta;
    if (count > best) best = count;
  }
  return best;
}`,
    javascript: `function maxOverlap(segments) {
  const events = [];
  for (const [l, r] of segments) {
    events.push({ x: l, delta: 1 });
    events.push({ x: r, delta: -1 });
  }
  events.sort((a, b) => a.x - b.x || b.delta - a.delta);
  let count = 0;
  let best = 0;
  for (const event of events) {
    count += event.delta;
    if (count > best) best = count;
  }
  return best;
}`,
    python: `def max_overlap(segments):
    events = []
    for l, r in segments:
        events.append((l, 1))
        events.append((r, -1))
    events.sort(key=lambda e: (e[0], -e[1]))
    count = 0
    best = 0
    for _, delta in events:
        count += delta
        best = max(best, count)
    return best`,
    java: `public int maxOverlap(java.util.List<int[]> segments) {
    java.util.List<int[]> events = new java.util.ArrayList<>();
    for (int[] seg : segments) {
        events.add(new int[] { seg[0], 1 });
        events.add(new int[] { seg[1], -1 });
    }
    events.sort((a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));
    int count = 0;
    int best = 0;
    for (int[] event : events) {
        count += event[1];
        if (count > best) best = count;
    }
    return best;
}`,
    csharp: `public int MaxOverlap(List<(int l, int r)> segments)
{
    var events = new List<(int x, int delta)>();
    foreach (var seg in segments)
    {
        events.Add((seg.l, 1));
        events.Add((seg.r, -1));
    }
    events.Sort((a, b) => a.x == b.x ? b.delta.CompareTo(a.delta) : a.x.CompareTo(b.x));
    int count = 0;
    int best = 0;
    foreach (var ev in events)
    {
        count += ev.delta;
        if (count > best) best = count;
    }
    return best;
}`,
    c: `// Line Sweep for maximum overlap
#include <stdlib.h>

typedef struct {
  int x;
  int delta;
} Event;

static int cmp_event(const void *a, const void *b) {
  const Event *e1 = (const Event *)a;
  const Event *e2 = (const Event *)b;
  if (e1->x != e2->x) return (e1->x > e2->x) - (e1->x < e2->x);
  return (e2->delta - e1->delta);
}

int max_overlap(int *starts, int *ends, int n) {
  Event *events = (Event *)malloc(sizeof(Event) * 2 * n);
  for (int i = 0; i < n; i++) {
    events[2 * i] = (Event){starts[i], 1};
    events[2 * i + 1] = (Event){ends[i], -1};
  }
  qsort(events, 2 * n, sizeof(Event), cmp_event);
  int cur = 0, best = 0;
  for (int i = 0; i < 2 * n; i++) {
    cur += events[i].delta;
    if (cur > best) best = cur;
  }
  free(events);
  return best;
}`,
  },
};

export default algorithm;
