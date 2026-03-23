import type { Module } from './types';

const module13: Module = {
  id: 'module-13',
  slug: '13',
  title: 'Observer, Strategy & Adapter',
  description: 'Decouple subjects from their observers, swap algorithms at runtime, and bridge incompatible interfaces.',
  icon: '🔔',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-13-1',
      title: 'The Observer Pattern',
      content: `**Intent**: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."

**Key insight**: The Subject (the thing being watched) should NOT know anything specific about its Observers. It just keeps a list and notifies them. This means Observers can be added and removed at runtime without changing the Subject.

**Roles:**
- **Subject** — maintains list of observers; notifies them on state change
- **Observer** — interface with an \`update()\` method
- **ConcreteObserver** — specific reaction to the notification

**Real examples:** Event listeners in GUIs, logging systems (logger observes components), stock price feeds (many displays observe one price source), social media notifications.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.ArrayList;
import java.util.List;

public interface Observer {
    void update(String stock, double price);
}

public class StockMarket {
    private List<Observer> observers = new ArrayList<>();
    private String stockName;
    private double price;

    public StockMarket(String stockName) { this.stockName = stockName; }

    public void addObserver(Observer o)    { observers.add(o); }
    public void removeObserver(Observer o) { observers.remove(o); }

    public void setPrice(double newPrice) {
        this.price = newPrice;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer o : observers) {
            o.update(stockName, price);
        }
    }
}

public class PriceDisplay implements Observer {
    private String displayName;
    public PriceDisplay(String name) { this.displayName = name; }
    public void update(String stock, double price) {
        System.out.println("[" + displayName + "] " + stock + ": $" + price);
    }
}

public class PriceAlert implements Observer {
    private double threshold;
    public PriceAlert(double threshold) { this.threshold = threshold; }
    public void update(String stock, double price) {
        if (price > threshold) {
            System.out.println("ALERT: " + stock + " exceeded $" + threshold + "! Now: $" + price);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        StockMarket apple = new StockMarket("AAPL");
        apple.addObserver(new PriceDisplay("Phone App"));
        apple.addObserver(new PriceDisplay("Web App"));
        apple.addObserver(new PriceAlert(180.0));

        apple.setPrice(175.0);
        apple.setPrice(185.0);
    }
}`,
          caption: 'StockMarket notifies every registered Observer on each price change — adding new display types requires zero changes to StockMarket.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-13-2',
      title: 'The Strategy Pattern',
      content: `**Intent**: "Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it."

**Key insight**: Instead of a long if/else chain that selects which algorithm to run, encapsulate each algorithm in its own class. The context simply calls the strategy — it doesn't know or care which one.

**Roles:**
- **Strategy** — interface defining the algorithm
- **ConcreteStrategy** — a specific implementation
- **Context** — holds a Strategy reference; delegates algorithm execution to it

The algorithm can even be swapped at **runtime** — the Context just needs a setter.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.Arrays;

public interface SortStrategy {
    void sort(int[] data);
}

public class BubbleSort implements SortStrategy {
    public void sort(int[] data) {
        // simple bubble sort
        for (int i = 0; i < data.length - 1; i++) {
            for (int j = 0; j < data.length - 1 - i; j++) {
                if (data[j] > data[j + 1]) {
                    int tmp = data[j]; data[j] = data[j + 1]; data[j + 1] = tmp;
                }
            }
        }
    }
}

public class JavaSort implements SortStrategy {
    public void sort(int[] data) {
        Arrays.sort(data);
    }
}

public class Sorter {
    private SortStrategy strategy;
    public Sorter(SortStrategy strategy) { this.strategy = strategy; }
    public void setStrategy(SortStrategy strategy) { this.strategy = strategy; }

    public int[] sort(int[] data) {
        int[] copy = Arrays.copyOf(data, data.length);
        strategy.sort(copy);
        return copy;
    }
}

public class Main {
    public static void main(String[] args) {
        Sorter sorter = new Sorter(new BubbleSort());
        int[] result = sorter.sort(new int[]{5, 2, 8, 1, 9});
        System.out.println(Arrays.toString(result));

        // swap strategy at runtime
        sorter.setStrategy(new JavaSort());
        result = sorter.sort(new int[]{5, 2, 8, 1, 9});
        System.out.println(Arrays.toString(result));
    }
}`,
          caption: 'Sorter delegates to whichever SortStrategy is currently set — the algorithm can change at runtime without touching the Sorter class.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-13-3',
      title: 'The Adapter Pattern',
      content: `**Intent**: "Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces."

Think of it like a power adapter when you travel — your plug hasn't changed, the wall socket hasn't changed, but the adapter bridges the gap.

**Roles:**
- **Target** — the interface the client expects
- **Adaptee** — an existing class with an incompatible interface
- **Adapter** — wraps the Adaptee and implements the Target interface
- **Client** — uses only the Target interface`,
      codeExamples: [
        {
          language: 'java',
          code: `// Client expects this interface
public interface Logger {
    void log(String level, String message);
}

// Existing (old) class with different interface — can't modify it
public class LegacyLogger {
    public void writeInfo(String msg)    { System.out.println("[INFO] " + msg); }
    public void writeWarning(String msg) { System.out.println("[WARN] " + msg); }
    public void writeError(String msg)   { System.out.println("[ERROR] " + msg); }
}

// Adapter: wraps LegacyLogger, implements Logger
public class LegacyLoggerAdapter implements Logger {
    private LegacyLogger legacy;
    public LegacyLoggerAdapter(LegacyLogger legacy) { this.legacy = legacy; }

    public void log(String level, String message) {
        switch (level.toUpperCase()) {
            case "INFO":  legacy.writeInfo(message); break;
            case "WARN":  legacy.writeWarning(message); break;
            case "ERROR": legacy.writeError(message); break;
            default: legacy.writeInfo(message);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Logger logger = new LegacyLoggerAdapter(new LegacyLogger());
        logger.log("INFO", "Application started");
        logger.log("WARN", "Low memory");
        logger.log("ERROR", "Connection failed");
    }
}`,
          caption: 'LegacyLoggerAdapter bridges the gap — the client uses the modern Logger interface while LegacyLogger is never modified.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q13-1',
      type: 'multiple-choice',
      prompt: 'In the Observer pattern, what does the Subject do when its state changes?',
      choices: [
        { id: 'a', text: 'Queries all observers for their state' },
        { id: 'b', text: 'Notifies all registered observers' },
        { id: 'c', text: 'Creates new observer objects' },
        { id: 'd', text: 'Deletes old observers' },
      ],
      correctAnswer: 'b',
      explanation: 'The Subject iterates its list of registered Observers and calls update() on each one, pushing the new state to them automatically.',
    },
    {
      id: 'q13-2',
      type: 'true-false',
      prompt: 'The Subject in the Observer pattern must know the concrete types of its Observers.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The Subject only knows the Observer interface. It calls update() polymorphically — it has no knowledge of PriceDisplay, PriceAlert, or any other concrete type.',
    },
    {
      id: 'q13-3',
      type: 'fill-in-blank',
      prompt: 'The Strategy pattern lets the _______ vary independently from the clients that use it.',
      correctAnswer: 'algorithm',
      explanation: 'By encapsulating algorithms in separate classes, the Strategy pattern decouples the choice of algorithm from the context that uses it.',
    },
    {
      id: 'q13-4',
      type: 'multiple-choice',
      prompt: 'Which pattern converts one interface into another that clients expect?',
      choices: [
        { id: 'a', text: 'Observer' },
        { id: 'b', text: 'Strategy' },
        { id: 'c', text: 'Adapter' },
        { id: 'd', text: 'Command' },
      ],
      correctAnswer: 'c',
      explanation: 'The Adapter pattern wraps an existing class (Adaptee) and exposes the interface the client expects (Target) — bridging incompatible interfaces.',
    },
    {
      id: 'q13-5',
      type: 'multiple-choice',
      prompt: 'Strategy pattern vs if/else: what is the key advantage?',
      choices: [
        { id: 'a', text: 'Strategies run faster' },
        { id: 'b', text: 'Adding a new algorithm means adding a new class, not modifying the context' },
        { id: 'c', text: 'Strategies are always used at compile time' },
        { id: 'd', text: 'Fewer classes overall' },
      ],
      correctAnswer: 'b',
      explanation: 'With Strategy, adding BubbleSort or MergeSort requires only a new class — the Sorter context is never touched. With if/else, you must modify the context every time.',
    },
    {
      id: 'q13-6',
      type: 'true-false',
      prompt: 'In the Strategy pattern, the algorithm can be swapped at runtime by replacing the strategy object in the Context.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'The Context holds a Strategy reference. Calling setStrategy() replaces the algorithm mid-execution — this is one of the key advantages over compile-time switch statements.',
    },
    {
      id: 'q13-7',
      type: 'fill-in-blank',
      prompt: 'In the Adapter pattern, the existing class with the incompatible interface is called the _______.',
      correctAnswer: 'Adaptee',
      explanation: 'The Adaptee is the class you want to use but cannot modify. The Adapter wraps it and exposes the Target interface that the Client expects.',
    },
    {
      id: 'q13-8',
      type: 'multiple-choice',
      prompt: 'Which is a real-world use of the Observer pattern?',
      choices: [
        { id: 'a', text: 'Sorting algorithms' },
        { id: 'b', text: 'Database schemas' },
        { id: 'c', text: 'GUI event listeners' },
        { id: 'd', text: 'File compression' },
      ],
      correctAnswer: 'c',
      explanation: 'GUI event listeners are a textbook Observer use case — a button (Subject) notifies all registered listeners (Observers) when clicked.',
    },
    {
      id: 'q13-9',
      type: 'multiple-choice',
      prompt: 'What does the Observer\'s update() method receive?',
      choices: [
        { id: 'a', text: 'Nothing' },
        { id: 'b', text: 'The entire Subject object or relevant change data' },
        { id: 'c', text: 'Only a boolean changed flag' },
        { id: 'd', text: 'A new Observer reference' },
      ],
      correctAnswer: 'b',
      explanation: 'update() typically receives the data that changed (push model) or a reference to the Subject so the Observer can query what it needs (pull model).',
    },
    {
      id: 'q13-10',
      type: 'true-false',
      prompt: 'The Adapter pattern requires modifying the Adaptee class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The Adaptee is typically a third-party or legacy class you cannot or should not modify. The Adapter wraps it externally without touching it.',
    },
    {
      id: 'q13-11',
      type: 'multiple-choice',
      prompt: 'In the stock market Observer example, adding a new type of display (e.g. SMS Alert) requires:',
      choices: [
        { id: 'a', text: 'Modifying StockMarket' },
        { id: 'b', text: 'Modifying PriceDisplay' },
        { id: 'c', text: 'Adding a new Observer class and registering it' },
        { id: 'd', text: 'Changing the Observer interface' },
      ],
      correctAnswer: 'c',
      explanation: 'The Observer pattern gives a very low Change Ratio for new display types — you write one new class and register it. StockMarket, Observer interface, and all existing displays are untouched.',
    },
    {
      id: 'q13-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement the Observer pattern for a simple weather station.\nWeatherStation notifies observers when temperature changes.\nConsoleDisplay prints 'Temperature: X°C'.\nExpected output:\nTemperature: 22.5°C\nTemperature: 25.0°C`,
      starterCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    interface Observer {
        void update(double temperature);
    }

    static class WeatherStation {
        private List<Observer> observers = new ArrayList<>();
        private double temperature;

        public void addObserver(Observer o) { observers.add(o); }

        public void setTemperature(double temp) {
            this.temperature = temp;
            // notify all observers
        }
    }

    static class ConsoleDisplay implements Observer {
        public void update(double temperature) {
            // print temperature
        }
    }

    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        station.addObserver(new ConsoleDisplay());
        station.setTemperature(22.5);
        station.setTemperature(25.0);
    }
}`,
      expectedOutput: 'Temperature: 22.5°C\nTemperature: 25.0°C',
      correctAnswer: '__code__',
      explanation: 'setTemperature: loop over observers calling o.update(temperature). ConsoleDisplay.update: System.out.println("Temperature: " + temperature + "°C");',
    },
    {
      id: 'q13-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a Strategy pattern for a discount calculator.\nNoDiscount returns the original price.\nPercentageDiscount(double pct) returns price * (1 - pct/100).\nExpected output:\n100.0\n80.0\n90.0`,
      starterCode: `public class Main {
    interface DiscountStrategy {
        double apply(double price);
    }

    static class NoDiscount implements DiscountStrategy {
        public double apply(double price) { return 0; } // fix this
    }

    static class PercentageDiscount implements DiscountStrategy {
        private double percentage;
        PercentageDiscount(double pct) { percentage = pct; }
        public double apply(double price) { return 0; } // fix this
    }

    static class PriceCalculator {
        private DiscountStrategy strategy;
        PriceCalculator(DiscountStrategy s) { strategy = s; }
        public double calculate(double price) { return strategy.apply(price); }
    }

    public static void main(String[] args) {
        PriceCalculator calc = new PriceCalculator(new NoDiscount());
        System.out.println(calc.calculate(100.0));

        calc = new PriceCalculator(new PercentageDiscount(20));
        System.out.println(calc.calculate(100.0));

        calc = new PriceCalculator(new PercentageDiscount(10));
        System.out.println(calc.calculate(100.0));
    }
}`,
      expectedOutput: '100.0\n80.0\n90.0',
      correctAnswer: '__code__',
      explanation: 'NoDiscount.apply: return price; PercentageDiscount.apply: return price * (1 - percentage / 100);',
    },
  ],
};

export default module13;
