import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "stack-queue",
  title: "Stack / Queue Operations",
  difficulty: "easy",
  category: "Data Structures",
  description: "Basic LIFO/FIFO operations.",
  runtime: "O(1)",
  variants: {
    typescript: `class Stack<T> {
  private items: T[] = [];
  push(value: T) { this.items.push(value); }
  pop(): T | undefined { return this.items.pop(); }
}

class Queue<T> {
  private items: T[] = [];
  enqueue(value: T) { this.items.push(value); }
  dequeue(): T | undefined { return this.items.shift(); }
}`,
    javascript: `class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); }
  pop() { return this.items.pop(); }
}

class Queue {
  constructor() { this.items = []; }
  enqueue(value) { this.items.push(value); }
  dequeue() { return this.items.shift(); }
}`,
    python: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, value):
        self.items.append(value)
    def pop(self):
        return self.items.pop() if self.items else None

class Queue:
    def __init__(self):
        self.items = []
    def enqueue(self, value):
        self.items.append(value)
    def dequeue(self):
        return self.items.pop(0) if self.items else None`,
    java: `class Stack<T> {
    private java.util.ArrayList<T> items = new java.util.ArrayList<>();
    void push(T value) { items.add(value); }
    T pop() { return items.isEmpty() ? null : items.remove(items.size() - 1); }
}

class Queue<T> {
    private java.util.ArrayList<T> items = new java.util.ArrayList<>();
    void enqueue(T value) { items.add(value); }
    T dequeue() { return items.isEmpty() ? null : items.remove(0); }
}`,
    csharp: `public class Stack<T>
{
    private readonly List<T> _items = new();
    public void Push(T value) => _items.Add(value);
    public T? Pop()
    {
        if (_items.Count == 0) return default;
        var value = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return value;
    }
}

public class Queue<T>
{
    private readonly List<T> _items = new();
    public void Enqueue(T value) => _items.Add(value);
    public T? Dequeue()
    {
        if (_items.Count == 0) return default;
        var value = _items[0];
        _items.RemoveAt(0);
        return value;
    }
}
`,
    c: `#include <stdlib.h>

typedef struct {
  int *data;
  int top;
  int capacity;
} Stack;

void stack_init(Stack *s, int capacity) {
  s->data = (int *)malloc(sizeof(int) * capacity);
  s->top = -1;
  s->capacity = capacity;
}

void stack_push(Stack *s, int value) {
  if (s->top + 1 < s->capacity) s->data[++s->top] = value;
}

int stack_pop(Stack *s) {
  if (s->top < 0) return 0;
  return s->data[s->top--];
}

typedef struct {
  int *data;
  int head;
  int tail;
  int capacity;
} Queue;

void queue_init(Queue *q, int capacity) {
  q->data = (int *)malloc(sizeof(int) * capacity);
  q->head = 0;
  q->tail = 0;
  q->capacity = capacity;
}

void enqueue(Queue *q, int value) {
  if (q->tail < q->capacity) q->data[q->tail++] = value;
}

int dequeue(Queue *q) {
  if (q->head >= q->tail) return 0;
  return q->data[q->head++];
}`,
  },
};

export default algorithm;
