import type { Module } from './types';

const module22: Module = {
  id: 'module-22',
  slug: '22',
  title: 'Locks, Visibility & GUI Concurrency',
  description: 'Reason about blocking, visibility, and responsive framework-based programs when multiple threads interact with shared state.',
  icon: '🔒',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-22-1',
      title: 'Locks, Blocking, and Visibility',
      content: `Concurrency is not only about "who runs first". It is also about **who can see what state**, and **who is blocked waiting for access**.

Key ideas:
- A **lock** (or monitor) protects access to shared state
- A thread may become **blocked** while waiting to acquire that lock
- Correct synchronization also helps with **visibility**, making sure one thread sees updates performed by another

In COMPSCI 230 terms, this means correctness depends on both mutual exclusion and consistent communication of state across threads.`,
      codeExamples: [
        {
          language: 'java',
          code: `class SafeFlag {
    private boolean ready = false;

    public synchronized void markReady() {
        ready = true;
    }

    public synchronized boolean isReady() {
        return ready;
    }
}

public class Main {
    public static void main(String[] args) {
        SafeFlag flag = new SafeFlag();
        flag.markReady();
        System.out.println(flag.isReady());
    }
}`,
          caption: 'The same synchronization mechanism can protect both access ordering and visibility of writes.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-22-2',
      title: 'Concurrency in GUI Frameworks',
      content: `Framework-based programs such as Swing GUIs introduce an extra rule: the interface must stay responsive.

That leads to a common pattern:
1. UI event happens on the framework’s main event thread
2. Long-running work moves to a background thread
3. The result is applied back safely after the work finishes

If you perform the long-running work directly in the event handler, the UI freezes. If you update shared state carelessly from multiple threads, the program becomes inconsistent. This is why COMPSCI 230 treats GUI event handling and concurrency as connected ideas.`,
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
          caption: 'Move slow work off the GUI thread, then synchronize the handoff back to the interface.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q22-1',
      type: 'multiple-choice',
      prompt: 'Why might a thread become blocked?',
      choices: [
        { id: 'a', text: 'Because Java forbids multiple threads' },
        { id: 'b', text: 'Because it is waiting for a lock or another synchronization condition' },
        { id: 'c', text: 'Because all blocked threads are terminated immediately' },
        { id: 'd', text: 'Because it called println()' },
      ],
      correctAnswer: 'b',
      explanation: 'Blocked and waiting states happen when a thread cannot yet proceed safely.',
    },
    {
      id: 'q22-2',
      type: 'true-false',
      prompt: 'Synchronization helps both mutual exclusion and visibility of shared state changes.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Correct synchronization is about safe access and consistent observation of updates.',
    },
    {
      id: 'q22-3',
      type: 'fill-in-blank',
      prompt: 'In a GUI app, slow background work should not run directly on the UI ______.',
      correctAnswer: 'thread',
      explanation: 'Running long tasks on the UI thread makes the interface unresponsive.',
    },
    {
      id: 'q22-4',
      type: 'multiple-choice',
      prompt: 'What is the main reason to move a long-running task off the GUI event thread?',
      choices: [
        { id: 'a', text: 'To make code compile faster' },
        { id: 'b', text: 'To keep the interface responsive' },
        { id: 'c', text: 'To disable synchronization' },
        { id: 'd', text: 'To avoid using objects' },
      ],
      correctAnswer: 'b',
      explanation: 'A responsive GUI should not freeze while background work is running.',
    },
    {
      id: 'q22-5',
      type: 'code-challenge',
      language: 'java',
      prompt: `Write a Java program that prints exactly:\nUI still responsive\nDownloading...\nFinished download\nSafe to refresh the view\nUse a Runnable worker, start it on a Thread, and join before printing the final line.`,
      starterCode: `public class Main {\n    static class DownloadTask implements Runnable {\n        @Override\n        public void run() {\n            // TODO\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        // TODO\n    }\n}`,
      expectedOutput: 'UI still responsive\nDownloading...\nFinished download\nSafe to refresh the view',
      correctAnswer: '__code__',
      explanation: 'Print the UI line first, run the background task on a Thread, join it, then print the final refresh line.',
    },
  ],
};

export default module22;
