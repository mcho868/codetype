import { create } from "zustand";

export type GameStatus = "idle" | "running" | "completed";

type GameState = {
  status: GameStatus;
  userInput: string;
  targetCode: string;
  startTime: number | null;
  mistakes: number;
  mistakeIndices: Set<number>;

  startGame: (code: string) => void;
  handleInput: (input: string) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  status: "idle",
  userInput: "",
  targetCode: "",
  startTime: null,
  mistakes: 0,
  mistakeIndices: new Set(),

  startGame: (code) =>
    set({
      status: "idle",
      userInput: "",
      targetCode: code,
      startTime: null,
      mistakes: 0,
      mistakeIndices: new Set(),
    }),

  handleInput: (input) => {
    const { targetCode, status, startTime } = get();
    if (!targetCode || status === "completed") return;

    let mistakes = 0;
    const mistakeIndices = new Set<number>();
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] !== targetCode[i]) {
        mistakes += 1;
        mistakeIndices.add(i);
      }
    }

    const shouldStart = startTime === null && input.length > 0;
    const isCompleted = input.length >= targetCode.length;

    set({
      userInput: input,
      mistakes,
      mistakeIndices,
      status: isCompleted ? "completed" : shouldStart ? "running" : status,
      startTime: shouldStart ? Date.now() : startTime,
    });
  },

  resetGame: () =>
    set((state) => ({
      status: "idle",
      userInput: "",
      startTime: null,
      mistakes: 0,
      mistakeIndices: new Set(),
      targetCode: state.targetCode,
    })),
}));
