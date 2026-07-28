import type { Module } from './types';

const module19: Module = {
  id: 'module-19',
  slug: '19',
  title: 'GUI Programming & Event Handling',
  description: 'Understand event-driven design, listeners, and framework-style GUI structure without treating the interface as a giant main method.',
  icon: '🖱️',
  color: 'from-fuchsia-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-19-1',
      title: 'Event-Driven Programming',
      content: `A **GUI program** is different from a straight-line console program. In a console app, \`main()\` usually runs top to bottom. In a GUI app, \`main()\` sets up windows and components, then the program mostly waits for **events**:

- A button click
- A key press
- A mouse movement
- A menu selection

This is called **event-driven programming**. Instead of asking "what line executes next?", you ask "what callback should run when this event happens?"

This is one of the big reasons frameworks matter in COMPSCI 230-style material: the framework owns the main event loop, and your code plugs behavior into it.`,
      codeExamples: [
        {
          language: 'java',
          code: `import javax.swing.JButton;
import javax.swing.JFrame;
import java.awt.FlowLayout;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Counter");
        JButton button = new JButton("Click me");

        button.addActionListener(e -> System.out.println("Button clicked"));

        frame.setLayout(new FlowLayout());
        frame.add(button);
        frame.setSize(300, 120);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}`,
          caption: 'A Swing button registers an ActionListener; the framework calls it later when the event occurs.',
        },
      ],
    },
    {
      id: 'lesson-19-2',
      title: 'Listeners, Callbacks, and Separation of Concerns',
      content: `A **listener** is just an object whose method gets called when something interesting happens. In Swing, a button uses an **ActionListener**. In web apps, you might call this an event handler or callback.

The design mistake to avoid is putting all logic directly inside the listener body. Good structure usually looks like this:
- The **View** creates widgets and forwards events
- The **Controller** decides what action to take
- The **Model** stores and updates state

That way, the GUI is only one surface on top of the application logic. You can test the model and controller without clicking real buttons.`,
      codeExamples: [
        {
          language: 'java',
          code: `interface ClickListener {
    void onClick();
}

class Button {
    private ClickListener listener;

    public void setListener(ClickListener listener) {
        this.listener = listener;
    }

    public void click() {
        if (listener != null) {
            listener.onClick();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Button button = new Button();
        button.setListener(() -> System.out.println("Handled click"));
        button.click();
    }
}`,
          caption: 'A tiny framework-style callback model: register a listener now, invoke it later.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-19-3',
      title: 'Framework Thinking',
      content: `A **framework** is not just a library. With a library, your code calls the library. With a framework, the framework calls **your** code at the right time. This is often called **inversion of control**.

GUI frameworks, web frameworks, and game engines all work this way:
- You provide components, handlers, or callbacks
- The framework decides when to invoke them
- Your design must fit the lifecycle rules of the framework

In Java GUI work, this means you should think in terms of:
- component creation
- event registration
- state updates
- UI refresh

instead of one long procedural method.`,
      codeExamples: [
        {
          language: 'java',
          code: `class CounterModel {
    private int value = 0;

    public void increment() {
        value++;
    }

    public int getValue() {
        return value;
    }
}

class CounterController {
    private CounterModel model;

    CounterController(CounterModel model) {
        this.model = model;
    }

    public void onIncrementButtonClicked() {
        model.increment();
        System.out.println("Count: " + model.getValue());
    }
}`,
          caption: 'The GUI event should delegate into controller/model code rather than storing all logic in the button itself.',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q19-1',
      type: 'multiple-choice',
      prompt: 'What best describes event-driven programming?',
      choices: [
        { id: 'a', text: 'Code always runs top-to-bottom with no interruptions' },
        { id: 'b', text: 'The program waits for events, then dispatches callbacks when they occur' },
        { id: 'c', text: 'Every method must be recursive' },
        { id: 'd', text: 'Only console applications can use it' },
      ],
      correctAnswer: 'b',
      explanation: 'GUI applications spend much of their time waiting for user or system events, then reacting through callbacks.',
    },
    {
      id: 'q19-2',
      type: 'true-false',
      prompt: 'In a GUI framework, the framework often controls the main loop and calls your event handlers later.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'That is the core of inversion of control in framework-based software.',
    },
    {
      id: 'q19-3',
      type: 'fill-in-blank',
      prompt: 'A method registered to run later when something happens is commonly called a ______.',
      correctAnswer: 'callback',
      explanation: 'Listeners and event handlers are common forms of callbacks.',
    },
    {
      id: 'q19-4',
      type: 'multiple-choice',
      prompt: 'Why is it a design smell to put all business logic directly inside a button click handler?',
      choices: [
        { id: 'a', text: 'Because buttons cannot call methods' },
        { id: 'b', text: 'Because it tightly couples UI code and application logic' },
        { id: 'c', text: 'Because Java forbids state changes in listeners' },
        { id: 'd', text: 'Because listeners cannot print output' },
      ],
      correctAnswer: 'b',
      explanation: 'Putting everything in the handler makes the code harder to test, reuse, and maintain.',
    },
    {
      id: 'q19-5',
      type: 'true-false',
      prompt: 'A framework is just a utility class collection; it never calls your code.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Frameworks typically own the lifecycle and call your code at designated extension points.',
    },
    {
      id: 'q19-6',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a tiny event-listener simulation.\nCreate an interface ClickListener with onClick().\nCreate a Button class with setListener(ClickListener listener) and click() that calls onClick() if a listener exists.\nIn main, register a listener that prints exactly:\nButton clicked\nThen call click().`,
      starterCode: `public class Main {\n    interface ClickListener {\n        // declare onClick()\n    }\n\n    static class Button {\n        private ClickListener listener;\n\n        public void setListener(ClickListener listener) {\n            // store listener\n        }\n\n        public void click() {\n            // call listener.onClick() when listener is not null\n        }\n    }\n\n    public static void main(String[] args) {\n        Button button = new Button();\n        // register listener and trigger click\n    }\n}`,
      expectedOutput: 'Button clicked',
      correctAnswer: '__code__',
      explanation: 'This models the callback structure that GUI frameworks use: register behavior first, invoke it later when the event occurs.',
    },
  ],
};

export default module19;
