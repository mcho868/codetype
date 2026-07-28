export interface JavaOopWeekPlan {
  week: number;
  lectureRange: string;
  title: string;
  moduleSlugs: string[];
}

export const JAVA_OOP_WEEK_PLAN: JavaOopWeekPlan[] = [
  {
    week: 1,
    lectureRange: "L1-L3",
    title: "Intro to Java, Hello World, and OOD basics",
    moduleSlugs: ["java-0"],
  },
  {
    week: 2,
    lectureRange: "L4-L6",
    title: "Expressions, loops, and arrays",
    moduleSlugs: ["23", "24", "25"],
  },
  {
    week: 3,
    lectureRange: "L7-L9",
    title: "Classes, constructors, inheritance, and polymorphism",
    moduleSlugs: ["java-1", "java-2", "java-3"],
  },
  {
    week: 4,
    lectureRange: "L10-L12",
    title: "Binding and abstraction",
    moduleSlugs: ["7", "java-4"],
  },
  {
    week: 5,
    lectureRange: "L13-L15",
    title: "Interfaces and nested classes",
    moduleSlugs: ["java-5", "8"],
  },
  {
    week: 6,
    lectureRange: "L16-L17",
    title: "Generics and type-safe reusable code",
    moduleSlugs: ["9"],
  },
  {
    week: 7,
    lectureRange: "L18-L20",
    title: "UML modelling and object relationships",
    moduleSlugs: ["18", "6"],
  },
  {
    week: 8,
    lectureRange: "L21-L23",
    title: "Maintainability, SOLID, and clean code",
    moduleSlugs: ["10", "16", "11"],
  },
  {
    week: 9,
    lectureRange: "L24-L26",
    title: "Patterns, design quality, and testing",
    moduleSlugs: ["12", "13", "14", "17"],
  },
  {
    week: 10,
    lectureRange: "L27-L28",
    title: "GUI architecture and MVC",
    moduleSlugs: ["19", "15"],
  },
  {
    week: 11,
    lectureRange: "L29-L30",
    title: "Java threads and synchronization",
    moduleSlugs: ["20", "21"],
  },
  {
    week: 12,
    lectureRange: "L31-L32",
    title: "Locks, visibility, and GUI concurrency",
    moduleSlugs: ["22"],
  },
];

export const JAVA_OOP_SECTION_BY_SLUG = new Map(
  JAVA_OOP_WEEK_PLAN.flatMap((week) =>
    week.moduleSlugs.map((slug) => [slug, `Week ${week.week} · ${week.lectureRange}`] as const)
  )
);
