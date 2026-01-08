import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "activity-selection",
  title: "Activity Selection",
  difficulty: "medium",
  category: "Greedy",
  description: "Select max non-overlapping activities.",
  runtime: "O(n log n)",
  variants: {
    typescript: `type Activity = { start: number; end: number };

function selectActivities(activities: Activity[]): Activity[] {
  const sorted = [...activities].sort((a, b) => a.end - b.end);
  const result: Activity[] = [];
  let lastEnd = -Infinity;
  for (const activity of sorted) {
    if (activity.start >= lastEnd) {
      result.push(activity);
      lastEnd = activity.end;
    }
  }
  return result;
}`,
    javascript: `function selectActivities(activities) {
  const sorted = [...activities].sort((a, b) => a.end - b.end);
  const result = [];
  let lastEnd = -Infinity;
  for (const activity of sorted) {
    if (activity.start >= lastEnd) {
      result.push(activity);
      lastEnd = activity.end;
    }
  }
  return result;
}`,
    python: `def select_activities(activities):
    sorted_acts = sorted(activities, key=lambda a: a[1])
    result = []
    last_end = float("-inf")
    for start, end in sorted_acts:
        if start >= last_end:
            result.append((start, end))
            last_end = end
    return result`,
    java: `public List<int[]> selectActivities(List<int[]> activities) {
    activities.sort(java.util.Comparator.comparingInt(a -> a[1]));
    List<int[]> result = new ArrayList<>();
    int lastEnd = Integer.MIN_VALUE;
    for (int[] act : activities) {
        if (act[0] >= lastEnd) {
            result.add(act);
            lastEnd = act[1];
        }
    }
    return result;
}`,
    csharp: `public List<(int start, int end)> SelectActivities(List<(int start, int end)> activities)
{
    var sorted = activities.OrderBy(a => a.end).ToList();
    var result = new List<(int start, int end)>();
    int lastEnd = int.MinValue;
    foreach (var act in sorted)
    {
        if (act.start >= lastEnd)
        {
            result.Add(act);
            lastEnd = act.end;
        }
    }
    return result;
}`,
    c: `// Activity Selection (Greedy)
typedef struct { int start; int end; } Activity;

int cmp_activity_end(const void *a, const void *b) {
  const Activity *x = (const Activity *)a;
  const Activity *y = (const Activity *)b;
  return (x->end > y->end) - (x->end < y->end);
}

int select_activities(Activity *acts, int n, Activity *out) {
  qsort(acts, n, sizeof(Activity), cmp_activity_end);
  int count = 0;
  int last_end = -2147483648;
  for (int i = 0; i < n; i++) {
    if (acts[i].start >= last_end) {
      out[count++] = acts[i];
      last_end = acts[i].end;
    }
  }
  return count;
}`,
  },
};

export default algorithm;
