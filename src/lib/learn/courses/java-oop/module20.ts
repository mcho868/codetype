import type { Module } from './types';

const module20: Module = {
  id: 'module-20',
  slug: '20',
  title: 'Introduction to Java Threads',
  description: 'Understand what a thread is, how to start one, and why concurrent execution matters in Java programs.',
  icon: '🧵',
  color: 'from-lime-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-20-1',
      title: 'What Is a Thread?',
      content: `A **thread** is an independent path of execution inside a program. A single Java process can run multiple threads at the same time.

Why do we care?
- GUIs should stay responsive while background work runs
- Servers often handle multiple requests concurrently
- Some problems naturally split into parallel tasks

In Java, a common pattern is:
1. Put the work inside a class that implements \`Runnable\`
2. Wrap it in a \`Thread\`
3. Call \`start()\`

Important: calling \`run()\` directly does **not** start a new thread. It just runs like a normal method call.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class Worker implements Runnable {
        @Override
        public void run() {
            System.out.println("Worker thread running");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(new Worker());
        t.start();
        t.join();   // wait for worker to finish
        System.out.println("Main done");
    }
}`,
          caption: 'start() launches a new thread; join() waits for it to finish.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-20-2',
      title: 'Shared State and Race Conditions',
      content: `Concurrency gets dangerous when threads share mutable data.

A **race condition** happens when the result depends on unpredictable timing. For example, if two threads both do:
\`\`\`java
count = count + 1;
\`\`\`
that is not one indivisible action. It is really:
1. read \`count\`
2. add 1
3. write back

If two threads interleave those steps, updates can be lost.

Java provides the \`synchronized\` keyword to make critical sections execute one thread at a time.`,
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

        System.out.println(counter.getValue());   // reliably 2000
    }
}`,
          caption: 'synchronized protects a shared mutable counter from lost updates.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-20-3',
      title: 'Concurrency in Framework-Based Programs',
      content: `Concurrency matters especially in **framework-based** software such as GUIs.

In a GUI app:
- the UI thread should stay responsive
- long-running work should move to background threads
- shared state updates must be coordinated carefully

This is why COMPSCI 230-style material often treats **event handling** and **multithreading** together. A button click may trigger work on a background thread, and then the result must be pushed back to the UI safely.

At this level, the core ideas to master are:
- when to use a background thread
- why shared mutable state is risky
- how \`join()\`, \`synchronized\`, and message-passing style callbacks help control complexity`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class DownloadTask implements Runnable {
        @Override
        public void run() {
            System.out.println("Downloading...");
            System.out.println("Finished download");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("UI still responsive");
        Thread worker = new Thread(new DownloadTask());
        worker.start();
        worker.join();
        System.out.println("Safe to refresh the view");
    }
}`,
          caption: 'A GUI-style mental model: keep the interface responsive, move slow work off the main thread, then synchronize.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q20-1',
      type: 'multiple-choice',
      prompt: 'What does calling `start()` on a Thread do?',
      choices: [
        { id: 'a', text: 'It runs the code immediately on the current thread only' },
        { id: 'b', text: 'It creates a new thread and schedules run() to execute there' },
        { id: 'c', text: 'It pauses the program permanently' },
        { id: 'd', text: 'It synchronizes all objects automatically' },
      ],
      correctAnswer: 'b',
      explanation: 'start() creates a new thread of execution. Calling run() directly does not.',
    },
    {
      id: 'q20-2',
      type: 'true-false',
      prompt: 'Calling run() directly on a Runnable or Thread is the same thing as starting a new thread.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'run() is just a method call. Only start() launches a new thread.',
    },
    {
      id: 'q20-3',
      type: 'fill-in-blank',
      prompt: 'The Thread method used to wait for another thread to finish is ______.',
      correctAnswer: 'join',
      explanation: 'join() blocks until the target thread has completed.',
    },
    {
      id: 'q20-4',
      type: 'multiple-choice',
      prompt: 'What is a race condition?',
      choices: [
        { id: 'a', text: 'When two threads deliberately compete for speed' },
        { id: 'b', text: 'When the correctness of a program depends on unpredictable execution timing' },
        { id: 'c', text: 'When a thread finishes too early' },
        { id: 'd', text: 'When a class extends Runnable' },
      ],
      correctAnswer: 'b',
      explanation: 'Race conditions happen when shared state is updated without proper coordination, so timing changes the result.',
    },
    {
      id: 'q20-5',
      type: 'true-false',
      prompt: 'The `synchronized` keyword can be used to protect a critical section that updates shared mutable state.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'synchronized ensures only one thread at a time executes the protected section for the same monitor.',
    },
    {
      id: 'q20-6',
      type: 'code-challenge',
      language: 'java',
      prompt: `Create a Worker class that implements Runnable.\nIts run() method should print exactly:\nWorking...\nDone\nIn main, start a Thread with Worker and call join() so the output is deterministic.`,
      starterCode: `public class Main {\n    static class Worker implements Runnable {\n        @Override\n        public void run() {\n            // print Working... then Done\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        // create thread, start it, then join it\n    }\n}`,
      expectedOutput: 'Working...\nDone',
      correctAnswer: '__code__',
      explanation: 'Implement Runnable, wrap it in a Thread, call start(), then join() so the program waits for the worker to finish.',
    },
  ],
};

export default module20;
