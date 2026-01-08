export type Language = "typescript" | "javascript" | "java" | "csharp" | "python";

export interface Algorithm {
  id: string;
  title: string;
  variants: Record<Language, string>;
}

export const ALGORITHMS: Algorithm[] = [
  {
    id: "bfs",
    title: "Breadth-First Search (BFS)",
    variants: {
      typescript: `function bfs(startNode: Node): void {
  const queue: Node[] = [startNode];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current.id)) continue;

    visited.add(current.id);
    console.log(current.value);

    for (const neighbor of current.neighbors) {
      queue.push(neighbor);
    }
  }
}`,
      javascript: `function bfs(startNode) {
  const queue = [startNode];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current.id)) continue;

    visited.add(current.id);
    console.log(current.value);

    for (const neighbor of current.neighbors) {
      queue.push(neighbor);
    }
  }
}`,
      python: `def bfs(start_node):
    queue = [start_node]
    visited = set()

    while queue:
        current = queue.pop(0)
        if current.id in visited:
            continue

        visited.add(current.id)
        print(current.value)

        for neighbor in current.neighbors:
            queue.append(neighbor)`,
      java: `public void bfs(Node startNode) {
    Queue<Node> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    queue.add(startNode);

    while (!queue.isEmpty()) {
        Node current = queue.poll();
        if (visited.contains(current.id)) {
            continue;
        }

        visited.add(current.id);
        System.out.println(current.value);

        for (Node neighbor : current.neighbors) {
            queue.add(neighbor);
        }
    }
}`,
      csharp: `public void Bfs(Node startNode)
{
    var queue = new Queue<Node>();
    var visited = new HashSet<string>();
    queue.Enqueue(startNode);

    while (queue.Count > 0)
    {
        var current = queue.Dequeue();
        if (visited.Contains(current.Id))
        {
            continue;
        }

        visited.Add(current.Id);
        Console.WriteLine(current.Value);

        foreach (var neighbor in current.Neighbors)
        {
            queue.Enqueue(neighbor);
        }
    }
}`,
    },
  },
  {
    id: "debounce",
    title: "Debounce Function",
    variants: {
      typescript: `function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => func(...args), wait);
  };
}`,
      javascript: `function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
      python: `import threading

class Debouncer:
    def __init__(self, wait):
        self.wait = wait
        self.timer = None

    def call(self, func, *args, **kwargs):
        if self.timer:
            self.timer.cancel()

        self.timer = threading.Timer(self.wait, func, args, kwargs)
        self.timer.start()`,
      java: `public class Debouncer {
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> future;

    public void debounce(Runnable task, long delayMs) {
        if (future != null) {
            future.cancel(false);
        }
        future = scheduler.schedule(task, delayMs, TimeUnit.MILLISECONDS);
    }
}`,
      csharp: `public class Debouncer
{
    private Timer? _timer;

    public void Debounce(Action action, int delayMs)
    {
        _timer?.Dispose();
        _timer = new Timer(_ => action(), null, delayMs, Timeout.Infinite);
    }
}`,
    },
  },
  {
    id: "binary-search",
    title: "Binary Search",
    variants: {
      typescript: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
      javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
      java: `public int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}`,
      csharp: `public int BinarySearch(int[] arr, int target)
{
    int left = 0;
    int right = arr.Length - 1;

    while (left <= right)
    {
        int mid = (left + right) / 2;
        if (arr[mid] == target)
        {
            return mid;
        }
        if (arr[mid] < target)
        {
            left = mid + 1;
        }
        else
        {
            right = mid - 1;
        }
    }

    return -1;
}`,
    },
  },
  {
    id: "singleton",
    title: "Singleton Pattern",
    variants: {
      typescript: `class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}`,
      javascript: `class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  static getInstance() {
    return Singleton.instance || new Singleton();
  }
}`,
      python: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`,
      java: `public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`,
      csharp: `public sealed class Singleton
{
    private static readonly Singleton InstanceValue = new Singleton();

    private Singleton() {}

    public static Singleton Instance => InstanceValue;
}`,
    },
  },
  {
    id: "filter-even",
    title: "Filtering Even Numbers",
    variants: {
      typescript: `function getEvenNumbers(numbers: number[]): number[] {
  return numbers
    .filter((n) => n % 2 === 0)
    .sort((a, b) => a - b);
}`,
      javascript: `function getEvenNumbers(numbers) {
  return numbers
    .filter((n) => n % 2 === 0)
    .sort((a, b) => a - b);
}`,
      python: `def get_even_numbers(numbers):
    evens = [n for n in numbers if n % 2 == 0]
    return sorted(evens)`,
      java: `public List<Integer> getEvenNumbers(List<Integer> numbers) {
    return numbers.stream()
        .filter(n -> n % 2 == 0)
        .sorted()
        .collect(Collectors.toList());
}`,
      csharp: `public List<int> GetEvenNumbers(List<int> numbers)
{
    return numbers
        .Where(n => n % 2 == 0)
        .OrderBy(n => n)
        .ToList();
}`,
    },
  },
];
