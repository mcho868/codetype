import type { Module } from './types';

const module27: Module = {
  id: 'java-module-27',
  slug: 'java-27',
  title: 'Basic GUI & Event Handling',
  description: 'Build a small Swing interface, paint custom components, and connect user actions to listeners.',
  icon: '🖥️',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-27-1',
      title: 'JFC, AWT, Swing, and components',
      content: `Java GUI programming is built from several related libraries:

- **AWT** provides foundational windowing classes, graphics, colours, layouts, and event types.
- **Swing** is the component toolkit built on top of AWT. Swing components usually have a J prefix, such as \`JFrame\`, \`JPanel\`, and \`JButton\`.
- The **Java Foundation Classes (JFC)** group Swing, AWT, accessibility, Java 2D, and related desktop GUI support.

Most Swing interfaces are assembled from a top-level window, containers, and components:

- \`JFrame\` is a window.
- \`JPanel\` is a container used to group components.
- \`JLabel\`, \`JButton\`, \`JTextField\`, and \`JTextArea\` are common controls.
- A layout manager decides where components are placed. \`FlowLayout\` arranges items in a row, while \`BorderLayout\` provides north, south, east, west, and center regions.

The usual startup sequence is to create the frame, add components, choose what happens when the window closes, call \`pack()\`, and finally call \`setVisible(true)\`.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.BorderLayout;
import java.awt.FlowLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("JFC demo");

        JPanel controls = new JPanel(new FlowLayout());
        controls.add(new JLabel("Status: ready"));
        controls.add(new JButton("Save"));

        frame.add(controls, BorderLayout.NORTH);
        frame.add(new JLabel("Main content", JLabel.CENTER), BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}`,
          caption: 'A JFrame contains panels and controls arranged by layout managers.',
          editable: false,
        },
      ],
    },
    {
      id: 'java-lesson-27-2',
      title: 'Dialogs and text input',
      content: `Swing provides ready-made dialogs for common interactions:

- \`JOptionPane.showMessageDialog\` displays a message.
- \`JOptionPane.showInputDialog\` asks for a short value.
- \`JOptionPane.showConfirmDialog\` asks the user to choose an option.
- \`JColorChooser.showDialog\` provides a colour picker.

For larger forms, put controls such as \`JTextField\` and \`JTextArea\` inside a panel. A \`JTextField\` is useful for one line of input; a \`JTextArea\` is useful for multiple lines. Use \`getText()\` to read the current contents.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JColorChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Contact form");
        JTextField name = new JTextField(14);
        JTextArea notes = new JTextArea(4, 20);

        JPanel form = new JPanel(new BorderLayout());
        form.add(name, BorderLayout.NORTH);
        form.add(new JScrollPane(notes), BorderLayout.CENTER);

        int result = JOptionPane.showConfirmDialog(
            frame, form, "Enter details", JOptionPane.OK_CANCEL_OPTION
        );

        if (result == JOptionPane.OK_OPTION) {
            JOptionPane.showMessageDialog(
                frame, "Hello, " + name.getText() + "!"
            );
            Color chosen = JColorChooser.showDialog(
                frame, "Choose a colour", Color.WHITE
            );
            System.out.println("Colour selected: " + chosen);
        }
    }
}`,
          caption: 'Text controls collect input, while JOptionPane and JColorChooser provide common dialogs.',
          editable: false,
        },
      ],
    },
    {
      id: 'java-lesson-27-3',
      title: 'Custom painting with Graphics2D',
      content: `A custom visual component usually extends \`JPanel\` and overrides \`paintComponent(Graphics g)\`. Always call \`super.paintComponent(g)\` first so Swing can clear and prepare the component.

The \`Graphics\` object supplies drawing operations. Create a copy and cast it to \`Graphics2D\` when you need Java 2D features such as antialiasing. Draw shapes with methods such as \`fillOval\`, \`drawRect\`, and \`drawString\`, then dispose of the copy.

Event handlers should update the component's state and call \`repaint()\`. Swing will schedule another paint pass; application code should not call \`paintComponent\` directly.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main {
    static class Scene extends JPanel {
        private int x = 40;

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON
            );
            g2.setColor(Color.BLUE);
            g2.fillOval(x, 40, 40, 40);
            g2.setColor(Color.BLACK);
            g2.drawString("Java 2D", 20, 120);
            g2.dispose();
        }

        void moveDot() {
            x += 10;
            repaint();
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Painting");
        Scene scene = new Scene();
        frame.add(scene);
        frame.setSize(240, 160);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
        scene.moveDot();
    }
}`,
          caption: 'Custom painting reads component state and asks Swing to repaint after state changes.',
          editable: false,
        },
      ],
    },
    {
      id: 'java-lesson-27-4',
      title: 'Event sources, listeners, and ActionEvent',
      content: `Swing uses an event-driven delegation model. The important roles are:

1. An **event source** is the component where something happens, such as a button.
2. An **event object** carries details about what happened, such as an \`ActionEvent\`.
3. A **listener** is an object with a callback method.
4. The listener is registered with the source, for example with \`button.addActionListener(listener)\`.

When the user activates the button, Swing calls \`actionPerformed\`. The listener can use \`event.getSource()\` or \`event.getActionCommand()\` to identify the event. Named classes, inner classes, anonymous classes, and lambdas are all possible listener implementations.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Main {
    static class CounterPanel extends JPanel {
        private int count = 0;
        private final JLabel status = new JLabel("Clicks: 0");

        CounterPanel() {
            JButton button = new JButton("Click me");
            button.addActionListener(new IncrementHandler());
            setLayout(new FlowLayout());
            add(button);
            add(status);
        }

        private class IncrementHandler implements ActionListener {
            @Override
            public void actionPerformed(ActionEvent event) {
                count++;
                status.setText("Clicks: " + count);
            }
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Events");
        frame.add(new CounterPanel());
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}`,
          caption: 'The button is the source, ActionEvent is the event, and IncrementHandler is the listener.',
          editable: false,
        },
      ],
    },
    {
      id: 'java-lesson-27-5',
      title: 'Mouse events, adapters, and anonymous handlers',
      content: `Mouse input uses \`MouseListener\`, whose five callback methods cover pressed, released, clicked, entered, and exited. If a class implements \`MouseListener\` directly, it must provide all five methods even when it only needs one.

An adapter such as \`MouseAdapter\` supplies empty implementations, so you can override just the callback you need. Anonymous classes are convenient for a small one-off handler. A mouse callback can read the cursor position from \`MouseEvent.getX()\` and \`getY()\`, update state, and call \`repaint()\`.
`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main {
    static class DotPanel extends JPanel {
        private int x = 40;
        private int y = 40;

        DotPanel() {
            addMouseListener(new MouseAdapter() {
                @Override
                public void mousePressed(MouseEvent event) {
                    x = event.getX();
                    y = event.getY();
                    repaint();
                }
            });
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.setColor(Color.RED);
            g.fillOval(x - 8, y - 8, 16, 16);
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Mouse events");
        frame.add(new DotPanel());
        frame.setSize(240, 160);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}`,
          caption: 'MouseAdapter avoids five empty methods when the program only needs mousePressed.',
          editable: false,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-27-1',
      type: 'multiple-choice',
      prompt: 'Which pair of packages supplies most of the AWT and Swing classes used in a basic Java GUI?',
      choices: [
        { id: 'a', text: 'java.sql and java.io' },
        { id: 'b', text: 'java.awt and javax.swing' },
        { id: 'c', text: 'java.net and java.nio' },
        { id: 'd', text: 'java.math and java.time' },
      ],
      correctAnswer: 'b',
      explanation: 'AWT supplies foundational GUI and event classes, while Swing supplies the J-prefixed component toolkit.',
    },
    {
      id: 'java-q-27-2',
      type: 'multiple-choice',
      prompt: 'Which Swing class represents a top-level application window?',
      choices: [
        { id: 'a', text: 'JPanel' },
        { id: 'b', text: 'JLabel' },
        { id: 'c', text: 'JFrame' },
        { id: 'd', text: 'JButton' },
      ],
      correctAnswer: 'c',
      explanation: 'JFrame is the usual top-level window. Panels and controls are placed inside it.',
    },
    {
      id: 'java-q-27-3',
      type: 'fill-in-blank',
      prompt: 'Which JFrame method makes a window appear after it has been configured?',
      correctAnswer: 'setVisible',
      explanation: 'Call setVisible(true) after adding components and configuring the frame.',
    },
    {
      id: 'java-q-27-4',
      type: 'multiple-choice',
      prompt: 'Which layout manager provides the North, South, East, West, and Center regions?',
      choices: [
        { id: 'a', text: 'FlowLayout' },
        { id: 'b', text: 'BorderLayout' },
        { id: 'c', text: 'GridLayout only' },
        { id: 'd', text: 'CardLayout only' },
      ],
      correctAnswer: 'b',
      explanation: 'BorderLayout divides a container into five named regions; FlowLayout places components in a row.',
    },
    {
      id: 'java-q-27-5',
      type: 'multiple-choice',
      prompt: 'What should a custom JPanel normally do first inside paintComponent(Graphics g)?',
      choices: [
        { id: 'a', text: 'Call super.paintComponent(g)' },
        { id: 'b', text: 'Call repaint() repeatedly' },
        { id: 'c', text: 'Create a new JFrame' },
        { id: 'd', text: 'Close the Graphics object before drawing' },
      ],
      correctAnswer: 'a',
      explanation: 'Calling the superclass implementation lets Swing clear and prepare the component before custom drawing.',
    },
    {
      id: 'java-q-27-6',
      type: 'true-false',
      prompt: 'Application code should call paintComponent directly whenever a component needs to be redrawn.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Update state and call repaint(); Swing schedules the painting lifecycle itself.',
    },
    {
      id: 'java-q-27-7',
      type: 'multiple-choice',
      prompt: 'In the Swing delegation model, what is a JButton an example of?',
      choices: [
        { id: 'a', text: 'An event source' },
        { id: 'b', text: 'A checked exception' },
        { id: 'c', text: 'A layout manager' },
        { id: 'd', text: 'A graphics context' },
      ],
      correctAnswer: 'a',
      explanation: 'The button is the source that creates an ActionEvent and notifies registered ActionListeners.',
    },
    {
      id: 'java-q-27-8',
      type: 'fill-in-blank',
      prompt: 'The method used to register an ActionListener on a JButton is ______.',
      correctAnswer: 'addActionListener',
      explanation: 'Register a listener with button.addActionListener(listener) before the event can reach it.',
    },
    {
      id: 'java-q-27-9',
      type: 'multiple-choice',
      prompt: 'Why is MouseAdapter useful?',
      choices: [
        { id: 'a', text: 'It creates a JFrame automatically' },
        { id: 'b', text: 'It supplies empty mouse callback methods so you override only the ones you need' },
        { id: 'c', text: 'It converts mouse events into checked exceptions' },
        { id: 'd', text: 'It replaces every layout manager' },
      ],
      correctAnswer: 'b',
      explanation: 'MouseListener has five methods; MouseAdapter provides default empty implementations for convenience.',
    },
    {
      id: 'java-q-27-10',
      type: 'true-false',
      prompt: 'Calling repaint() asks Swing to schedule another paint pass after component state changes.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'repaint() is a request to Swing. It does not directly call paintComponent synchronously.',
    },
    {
      id: 'java-q-27-11',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Complete this console-only event simulation. Add a listener that prints Button clicked, register it with the Button, and fire the event once.\n\nExpected output:\nButton clicked',
      starterCode: `public class Main {
    interface ClickListener {
        void onClick();
    }

    static class Button {
        private ClickListener listener;

        void addClickListener(ClickListener listener) {
            this.listener = listener;
        }

        void click() {
            if (listener != null) {
                listener.onClick();
            }
        }
    }

    public static void main(String[] args) {
        Button button = new Button();
        // Register a listener and fire the event once
    }
}`,
      expectedOutput: 'Button clicked',
      correctAnswer: '__code__',
      explanation: 'Register a lambda such as button.addClickListener(() -> System.out.println("Button clicked")); and then call button.click().',
    },
  ],
};

export default module27;
