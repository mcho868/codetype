import type { Module } from './types';

const module15: Module = {
  id: 'module-15',
  slug: '15',
  title: 'MVC Architecture',
  description: 'Separate data, presentation, and logic into Model, View, and Controller — and connect them with the Observer pattern.',
  icon: '🏗️',
  color: 'from-amber-500 to-yellow-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-15-1',
      title: 'MVC Overview',
      content: `**MVC (Model-View-Controller)** is an architectural pattern that separates an application into three interconnected parts:

- **Model** — holds the application's data and business logic. It knows nothing about the UI.
- **View** — displays data from the Model to the user. It knows nothing about how data is stored.
- **Controller** — receives input (user actions), updates the Model, and tells the View to refresh.

**Why MVC?**
- **Separation of concerns** — each layer has exactly one job. Change the UI without touching data logic, and vice versa.
- **Testability** — Models and Controllers can be tested without a running UI.
- **Parallel development** — frontend and backend teams can work independently.

**Data flow:**
1. User interacts with the **View**
2. **Controller** receives the event, validates input, updates the **Model**
3. **View** reads from the **Model** and re-renders

**Real examples:** Spring MVC (Java web), Android Activities (Controller) + XML layouts (View) + data classes (Model), Ruby on Rails.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Model — pure data and business rules, no UI code
public class TemperatureModel {
    private double celsius;

    public void setCelsius(double celsius) {
        this.celsius = celsius;
    }

    public double getCelsius() { return celsius; }
    public double getFahrenheit() { return celsius * 9.0 / 5.0 + 32; }
}

// View — displays data, no business logic
public class TemperatureView {
    public void display(double celsius, double fahrenheit) {
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
    }
}

// Controller — wires Model and View together
public class TemperatureController {
    private TemperatureModel model;
    private TemperatureView view;

    public TemperatureController(TemperatureModel model, TemperatureView view) {
        this.model = model;
        this.view = view;
    }

    public void setTemperature(double celsius) {
        model.setCelsius(celsius);
        updateView();
    }

    public void updateView() {
        view.display(model.getCelsius(), model.getFahrenheit());
    }
}

public class Main {
    public static void main(String[] args) {
        TemperatureModel model = new TemperatureModel();
        TemperatureView view = new TemperatureView();
        TemperatureController controller = new TemperatureController(model, view);

        controller.setTemperature(100.0);
        controller.setTemperature(0.0);
    }
}`,
          caption: 'Model holds the conversion logic, View just prints, Controller orchestrates — changing the display format only touches TemperatureView.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-15-2',
      title: 'Implementing MVC — Student Grade Tracker',
      content: `Let's build a more complete MVC example: a student grade tracker.

**StudentModel** — stores student name and a list of grades; computes average.
**StudentView** — formats and prints the student report card.
**StudentController** — accepts new grades, coordinates Model updates and View refreshes.

**Key observations:**
- The Model never prints anything — it just stores and computes.
- The View never stores data — it formats what the Controller passes from the Model.
- The Controller is the only class that talks to both Model and View.
- To swap from console output to a GUI, only the View changes.
- To change the grading formula, only the Model changes.

This strict separation is the power of MVC.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.ArrayList;
import java.util.List;

// Model
public class StudentModel {
    private String name;
    private List<Integer> grades = new ArrayList<>();

    public StudentModel(String name) { this.name = name; }

    public void addGrade(int grade) { grades.add(grade); }

    public String getName() { return name; }

    public double getAverage() {
        if (grades.isEmpty()) return 0;
        int sum = 0;
        for (int g : grades) sum += g;
        return (double) sum / grades.size();
    }

    public List<Integer> getGrades() { return grades; }
}

// View
public class StudentView {
    public void printReport(String name, List<Integer> grades, double average) {
        System.out.println("=== Student Report ===");
        System.out.println("Name: " + name);
        System.out.println("Grades: " + grades);
        System.out.printf("Average: %.1f%n", average);
    }
}

// Controller
public class StudentController {
    private StudentModel model;
    private StudentView view;

    public StudentController(StudentModel model, StudentView view) {
        this.model = model;
        this.view = view;
    }

    public void addGrade(int grade) {
        model.addGrade(grade);
    }

    public void showReport() {
        view.printReport(model.getName(), model.getGrades(), model.getAverage());
    }
}

public class Main {
    public static void main(String[] args) {
        StudentModel model = new StudentModel("Alice");
        StudentView view = new StudentView();
        StudentController controller = new StudentController(model, view);

        controller.addGrade(85);
        controller.addGrade(92);
        controller.addGrade(78);
        controller.showReport();
    }
}`,
          caption: 'StudentController is the only class that knows about both Model and View — swap either layer without touching the other.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-15-3',
      title: 'MVC with Observer — Automatic View Updates',
      content: `A weakness of basic MVC: the Controller must manually call \`updateView()\` after every change. What if the Model changes from multiple sources?

**Solution**: Combine MVC with the **Observer pattern**. The Model becomes the Subject; Views register as Observers and update automatically whenever data changes.

**Benefits of MVC + Observer:**
- Multiple Views can listen to the same Model (e.g., a chart and a table both showing the same data)
- The Model doesn't need to know which Views exist — it just notifies all registered observers
- Views stay in sync automatically — no forgotten \`updateView()\` calls

**The flow:**
1. View registers itself with the Model as an Observer
2. Controller updates the Model
3. Model notifies all registered Views
4. Views pull the latest data and re-render

This is the foundation of many modern reactive frameworks.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.ArrayList;
import java.util.List;

// Observer interface
public interface ModelObserver {
    void onModelChanged();
}

// Model — acts as Subject
public class ScoreModel {
    private int score = 0;
    private List<ModelObserver> observers = new ArrayList<>();

    public void addObserver(ModelObserver obs) { observers.add(obs); }

    public void incrementScore(int points) {
        score += points;
        notifyObservers();
    }

    public int getScore() { return score; }

    private void notifyObservers() {
        for (ModelObserver obs : observers) obs.onModelChanged();
    }
}

// View — implements Observer; pulls data from Model when notified
public class ScoreView implements ModelObserver {
    private ScoreModel model;
    private String displayName;

    public ScoreView(String name, ScoreModel model) {
        this.displayName = name;
        this.model = model;
        model.addObserver(this);    // register self
    }

    public void onModelChanged() {
        System.out.println("[" + displayName + "] Score: " + model.getScore());
    }
}

// Controller
public class ScoreController {
    private ScoreModel model;
    public ScoreController(ScoreModel model) { this.model = model; }
    public void addPoints(int pts) { model.incrementScore(pts); }
}

public class Main {
    public static void main(String[] args) {
        ScoreModel model = new ScoreModel();
        new ScoreView("Panel A", model);   // registers itself
        new ScoreView("Panel B", model);   // registers itself

        ScoreController ctrl = new ScoreController(model);
        ctrl.addPoints(10);
        ctrl.addPoints(5);
    }
}`,
          caption: 'Both ScoreView instances update automatically — the Controller never calls updateView(). Adding a third view requires zero changes to Controller or Model.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q15-1',
      type: 'multiple-choice',
      prompt: 'In MVC, which component is responsible for storing data and business logic?',
      choices: [
        { id: 'a', text: 'View' },
        { id: 'b', text: 'Controller' },
        { id: 'c', text: 'Model' },
        { id: 'd', text: 'Observer' },
      ],
      correctAnswer: 'c',
      explanation: 'The Model holds the application\'s data and business rules. It has no knowledge of how the data is displayed or what triggered the update.',
    },
    {
      id: 'q15-2',
      type: 'true-false',
      prompt: 'In MVC, the View is allowed to contain business logic such as tax calculations.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The View\'s job is strictly presentation — it formats and displays data. Any business logic (calculations, validations, rules) belongs in the Model.',
    },
    {
      id: 'q15-3',
      type: 'fill-in-blank',
      prompt: 'MVC stands for Model, View, and _______.',
      correctAnswer: 'Controller',
      explanation: 'Controller is the third component — it handles user input, updates the Model, and coordinates with the View to refresh the display.',
    },
    {
      id: 'q15-4',
      type: 'multiple-choice',
      prompt: 'What is the main benefit of combining MVC with the Observer pattern?',
      choices: [
        { id: 'a', text: 'The Controller no longer needs to exist' },
        { id: 'b', text: 'Views update automatically when the Model changes, without manual calls' },
        { id: 'c', text: 'The Model can contain UI code' },
        { id: 'd', text: 'Only one View can be attached to a Model' },
      ],
      correctAnswer: 'b',
      explanation: 'When the Model is a Subject, all registered Views are notified automatically on state changes. This eliminates forgotten updateView() calls and supports multiple simultaneous Views.',
    },
    {
      id: 'q15-5',
      type: 'multiple-choice',
      prompt: 'If you want to switch from a console UI to a graphical UI in an MVC app, which component changes?',
      choices: [
        { id: 'a', text: 'Model' },
        { id: 'b', text: 'Controller' },
        { id: 'c', text: 'View' },
        { id: 'd', text: 'All three' },
      ],
      correctAnswer: 'c',
      explanation: 'Only the View changes when swapping the display technology. The Model and Controller remain identical — this is the key benefit of separation of concerns.',
    },
    {
      id: 'q15-6',
      type: 'true-false',
      prompt: 'In MVC with Observer, the Model must know the concrete type of each View that observes it.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The Model only knows the Observer interface. It calls onModelChanged() polymorphically — it has no idea whether the observer is a console view, a chart, or a GUI panel.',
    },
    {
      id: 'q15-7',
      type: 'fill-in-blank',
      prompt: 'In MVC, the _______ receives user input and decides how to update the Model.',
      correctAnswer: 'Controller',
      explanation: 'The Controller is the entry point for user actions. It validates input, calls the appropriate Model methods, and then triggers a View refresh.',
    },
    {
      id: 'q15-8',
      type: 'multiple-choice',
      prompt: 'Which of the following best describes "separation of concerns" in MVC?',
      choices: [
        { id: 'a', text: 'Each class handles multiple unrelated tasks' },
        { id: 'b', text: 'Model, View, and Controller each have a distinct responsibility with minimal overlap' },
        { id: 'c', text: 'The Controller merges Model and View duties' },
        { id: 'd', text: 'All logic is centralized in the View for simplicity' },
      ],
      correctAnswer: 'b',
      explanation: 'Separation of concerns means each MVC component owns exactly one aspect: data (Model), display (View), or coordination (Controller). Changes in one layer don\'t ripple into others.',
    },
    {
      id: 'q15-9',
      type: 'multiple-choice',
      prompt: 'In MVC with Observer, when does the View re-render?',
      choices: [
        { id: 'a', text: 'On a fixed timer' },
        { id: 'b', text: 'When the user manually requests a refresh' },
        { id: 'c', text: 'When the Model notifies it via the Observer callback' },
        { id: 'd', text: 'When the Controller directly updates the View fields' },
      ],
      correctAnswer: 'c',
      explanation: 'The Model calls onModelChanged() on all registered observers when its state changes. Each View then pulls the latest data from the Model and re-renders automatically.',
    },
    {
      id: 'q15-10',
      type: 'true-false',
      prompt: 'Adding a second View to an MVC+Observer application requires modifying the Model class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The second View simply registers itself as an Observer — the Model\'s notifyObservers() loop handles it automatically. No changes needed in Model, Controller, or existing Views.',
    },
    {
      id: 'q15-11',
      type: 'multiple-choice',
      prompt: 'Which is a real-world framework that uses MVC architecture?',
      choices: [
        { id: 'a', text: 'JUnit' },
        { id: 'b', text: 'Spring MVC' },
        { id: 'c', text: 'Gradle' },
        { id: 'd', text: 'Git' },
      ],
      correctAnswer: 'b',
      explanation: 'Spring MVC is a Java web framework built around the MVC pattern — controllers handle HTTP requests, models hold data, and views (JSP/Thymeleaf templates) render HTML.',
    },
    {
      id: 'q15-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a simple MVC Counter.\nCounterModel stores an integer value starting at 0 with an increment() method and getValue() getter.\nCounterView has a display(int value) method that prints "Count: X".\nCounterController has an increment() method that updates the model, and a show() method that calls the view.\nIncrement 3 times then show.\nExpected output:\nCount: 3`,
      starterCode: `public class Main {\n    static class CounterModel {\n        private int value = 0;\n        public void increment() { value++; }\n        public int getValue() { return value; }\n    }\n\n    static class CounterView {\n        public void display(int value) {\n            // print "Count: " + value\n        }\n    }\n\n    static class CounterController {\n        private CounterModel model;\n        private CounterView view;\n\n        CounterController(CounterModel m, CounterView v) {\n            model = m;\n            view = v;\n        }\n\n        public void increment() {\n            // update model\n        }\n\n        public void show() {\n            // tell view to display model value\n        }\n    }\n\n    public static void main(String[] args) {\n        CounterModel model = new CounterModel();\n        CounterView view = new CounterView();\n        CounterController ctrl = new CounterController(model, view);\n        ctrl.increment();\n        ctrl.increment();\n        ctrl.increment();\n        ctrl.show();\n    }\n}`,
      expectedOutput: 'Count: 3',
      correctAnswer: '__code__',
      explanation: 'CounterView.display prints "Count: " + value. CounterController.increment() calls model.increment(). CounterController.show() calls view.display(model.getValue()). Three increments bring value to 3.',
    },
    {
      id: 'q15-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement MVC+Observer for a counter.\nCounterModel notifies observers when incremented.\nCounterView implements ModelObserver and prints "Count: X" when notified.\nRegister the view, increment 2 times.\nExpected output:\nCount: 1\nCount: 2`,
      starterCode: `import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    interface ModelObserver {\n        void onChanged(int value);\n    }\n\n    static class CounterModel {\n        private int value = 0;\n        private List<ModelObserver> observers = new ArrayList<>();\n\n        public void addObserver(ModelObserver obs) { observers.add(obs); }\n\n        public void increment() {\n            value++;\n            // notify all observers\n        }\n\n        public int getValue() { return value; }\n    }\n\n    static class CounterView implements ModelObserver {\n        public void onChanged(int value) {\n            // print "Count: " + value\n        }\n    }\n\n    public static void main(String[] args) {\n        CounterModel model = new CounterModel();\n        CounterView view = new CounterView();\n        model.addObserver(view);\n        model.increment();\n        model.increment();\n    }\n}`,
      expectedOutput: 'Count: 1\nCount: 2',
      correctAnswer: '__code__',
      explanation: 'CounterModel.increment() increases value then loops over observers calling obs.onChanged(value). CounterView.onChanged prints "Count: " + value. Each increment triggers an automatic view update.',
    },
  ],
};

export default module15;
