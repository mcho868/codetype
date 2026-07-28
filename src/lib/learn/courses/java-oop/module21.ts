import type { Module } from './types';

const module21: Module = {
  id: 'module-21',
  slug: '21',
  title: 'Thread Lifecycle & Synchronization',
  description: 'Follow a thread through its lifecycle and coordinate shared work safely with join(), synchronized sections, and careful state updates.',
  icon: '⏱️',
  color: 'from-emerald-500 to-green-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-21-1',
      title: 'A Thread’s Life',
      content: `A Java thread does not just jump from "created" to "done". It moves through a **lifecycle**:

- **New**: the \`Thread\` object has been created
- **Runnable**: the thread is eligible to run
- **Running**: the scheduler is currently executing it
- **Blocked / Waiting / Timed Waiting**: the thread is paused, waiting for a lock, notification, \`join()\`, or a timeout
- **Terminated**: the \`run()\` method has finished

This matters because concurrent bugs often come from assuming a thread has already finished when it has not. Methods like \`join()\` and \`sleep()\` give you basic control over that timing.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class Worker implements Runnable {
        @Override
        public void run() {
            System.out.println("Worker started");
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("Worker finished");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(new Worker());
        System.out.println(worker.getState()); // NEW
        worker.start();
        System.out.println(worker.getState()); // RUNNABLE or TIMED_WAITING
        worker.join();
        System.out.println(worker.getState()); // TERMINATED
    }
}`,
          caption: 'Thread state changes are observable, and join() ensures the main thread waits until the worker is done.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-21-2',
      title: 'Shared State, Critical Sections, and synchronized',
      content: `A **critical section** is a part of your code that must not be interleaved unsafely with another thread running the same logic.

For example:
\`\`\`java
count = count + 1;
\`\`\`
is really a read, a calculation, and a write. Two threads can overlap those steps and lose an update.

The \`synchronized\` keyword protects a critical section by allowing only one thread at a time to execute it for the same monitor. It is a basic tool for preventing race conditions when you have shared mutable state.`,
      codeExamples: [
        {
          language: 'java',
          code: `class Counter {
    private int value = 0;

    public synchronized void increment() {
        value++;
    }

    public int getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };

        Thread a = new Thread(task);
        Thread b = new Thread(task);
        a.start();
        b.start();
        a.join();
        b.join();

        System.out.println(counter.getValue());
    }
}`,
          caption: 'Protect the update, then join the workers before reading the final result.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q21-1',
      type: 'multiple-choice',
      prompt: 'What does `join()` do?',
      choices: [
        { id: 'a', text: 'It creates a new thread' },
        { id: 'b', text: 'It waits for another thread to finish' },
        { id: 'c', text: 'It automatically synchronizes all methods' },
        { id: 'd', text: 'It stops a running thread immediately' },
      ],
      correctAnswer: 'b',
      explanation: 'join() blocks until the target thread has completed.',
    },
    {
      id: 'q21-2',
      type: 'true-false',
      prompt: 'A thread can be in a waiting or blocked state before it terminates.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Threads often pause while waiting for locks, timeouts, or other threads before resuming work.',
    },
    {
      id: 'q21-3',
      type: 'fill-in-blank',
      prompt: 'A code region that must not be unsafely interleaved between threads is called a critical ______.',
      correctAnswer: 'section',
      explanation: 'Critical sections are the shared update regions you must protect from unsafe overlap.',
    },
    {
      id: 'q21-4',
      type: 'multiple-choice',
      prompt: 'Why can `count = count + 1` be unsafe across threads?',
      choices: [
        { id: 'a', text: 'Because addition is forbidden in Java threads' },
        { id: 'b', text: 'Because it is a multi-step read/modify/write operation' },
        { id: 'c', text: 'Because integers cannot be shared' },
        { id: 'd', text: 'Because join() must always be called first' },
      ],
      correctAnswer: 'b',
      explanation: 'The update is not one indivisible action, so overlapping execution can lose updates.',
    },
    {
      id: 'q21-5',
      type: 'code-challenge',
      language: 'java',
      prompt: `Create a Counter class with a synchronized increment() method. In main, start two threads; each should increment the same Counter 500 times. Join both threads, then print the final counter value. The expected output is:\n1000`,
      starterCode: `public class Main {\n    static class Counter {\n        private int value = 0;\n\n        public synchronized void increment() {\n            // TODO\n        }\n\n        public int getValue() {\n            return value;\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        Runnable task = () -> {\n            for (int i = 0; i < 500; i++) {\n                // TODO\n            }\n        };\n\n        // TODO: create two threads, start them, join them, print final value\n    }\n}`,
      expectedOutput: '1000',
      correctAnswer: '__code__',
      explanation: 'Protect the increment with synchronized, have both threads share the same Counter instance, then join before printing.',
    },
  ],
};

export default module21;
