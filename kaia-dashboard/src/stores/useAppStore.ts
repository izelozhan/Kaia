import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LinkItem,
  Note,
  NowPlaying,
  PomodoroPhase,
  PomodoroState,
  Priority,
  QuoteState,
  Task,
} from "@/types";
import { todayKey } from "@/lib/utils";

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Morning Meditation",
    completed: false,
    priority: "mid",
    dateKey: todayKey(),
  },
  {
    id: "2",
    title: "Review Today's Top 3",
    completed: true,
    priority: "high",
    dateKey: todayKey(),
  },
  {
    id: "3",
    title: "Hydrate (500ml)",
    completed: false,
    priority: "low",
    dateKey: todayKey(),
  },
  {
    id: "4",
    title: "Inbox Zero Clean",
    completed: false,
    priority: "mid",
    dateKey: todayKey(),
  },
];

const defaultNotes: Note[] = [
  {
    id: "n1",
    title: "Project Idea",
    body: "Revamp the user profile section with a cleaner bento-grid layout for metrics.",
    color: "pink",
    pinned: false,
  },
  {
    id: "n2",
    title: "Quick Reminder",
    body: "Pick up ingredients for the dinner party on Thursday night!",
    color: "yellow",
    pinned: false,
  },
];

const defaultLinks: LinkItem[] = [
  { id: "l1", title: "Design Inspo", url: "https://figma.com", tagIds: [] },
  { id: "l2", title: "Tailwind Docs", url: "https://tailwindcss.com", tagIds: [] },
  { id: "l3", title: "Reading List", url: "https://example.com", tagIds: [] },
  { id: "l4", title: "Huberman Lab", url: "https://hubermanlab.com", tagIds: [] },
];

const defaultQuote: QuoteState = {
  text: "The sun himself is weak when he first rises; and gathers strength and courage as the day gets on.",
  author: "Charles Dickens",
  dateKey: todayKey(),
};

const defaultNowPlaying: NowPlaying = {
  title: "Morning Coffee Chill",
  artist: "Lofi Radio",
  progress: 0.67,
  duration: 100,
  isPlaying: false,
};

interface AppState {
  tasks: Task[];
  notes: Note[];
  links: LinkItem[];
  quote: QuoteState;
  pomodoro: PomodoroState;
  nowPlaying: NowPlaying;
  addTask: (title: string, priority?: Priority) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addNote: (title: string, body: string, color: Note["color"]) => void;
  toggleNotePin: (id: string) => void;
  addLink: (title: string, url: string) => void;
  setQuote: (text: string, author: string) => void;
  setPomodoroSettings: (focusMinutes: number, breakMinutes: number) => void;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  tickPomodoro: () => void;
  setNowPlaying: (partial: Partial<NowPlaying>) => void;
}

const initialPomodoro: PomodoroState = {
  focusMinutes: 25,
  breakMinutes: 5,
  phase: "idle",
  secondsLeft: 25 * 60,
  sessionsCompleted: 0,
  isRunning: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tasks: defaultTasks,
      notes: defaultNotes,
      links: defaultLinks,
      quote: defaultQuote,
      pomodoro: initialPomodoro,
      nowPlaying: defaultNowPlaying,

      addTask: (title, priority = "mid") =>
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
              priority,
              dateKey: todayKey(),
            },
          ],
        })),

      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      addNote: (title, body, color) =>
        set((s) => ({
          notes: [
            { id: crypto.randomUUID(), title, body, color, pinned: false },
            ...s.notes,
          ],
        })),

      toggleNotePin: (id) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned } : n
          ),
        })),

      addLink: (title, url) =>
        set((s) => ({
          links: [
            ...s.links,
            { id: crypto.randomUUID(), title, url, tagIds: [] },
          ],
        })),

      setQuote: (text, author) =>
        set({ quote: { text, author, dateKey: todayKey() } }),

      setPomodoroSettings: (focusMinutes, breakMinutes) =>
        set((s) => ({
          pomodoro: {
            ...s.pomodoro,
            focusMinutes,
            breakMinutes,
            secondsLeft:
              s.pomodoro.phase === "break"
                ? breakMinutes * 60
                : focusMinutes * 60,
          },
        })),

      startPomodoro: () => {
        const { pomodoro } = get();
        const phase: PomodoroPhase =
          pomodoro.phase === "idle" ? "focus" : pomodoro.phase;
        const secondsLeft =
          pomodoro.phase === "idle"
            ? pomodoro.focusMinutes * 60
            : pomodoro.secondsLeft;
        set({
          pomodoro: {
            ...pomodoro,
            phase,
            secondsLeft,
            isRunning: true,
          },
        });
      },

      pausePomodoro: () =>
        set((s) => ({
          pomodoro: { ...s.pomodoro, isRunning: false },
        })),

      resetPomodoro: () =>
        set((s) => ({
          pomodoro: {
            ...s.pomodoro,
            phase: "idle",
            secondsLeft: s.pomodoro.focusMinutes * 60,
            isRunning: false,
          },
        })),

      tickPomodoro: () => {
        const { pomodoro } = get();
        if (!pomodoro.isRunning) return;

        if (pomodoro.secondsLeft <= 1) {
          if (pomodoro.phase === "focus") {
            set({
              pomodoro: {
                ...pomodoro,
                phase: "break",
                secondsLeft: pomodoro.breakMinutes * 60,
                sessionsCompleted: pomodoro.sessionsCompleted + 1,
                isRunning: false,
              },
            });
          } else {
            set({
              pomodoro: {
                ...pomodoro,
                phase: "focus",
                secondsLeft: pomodoro.focusMinutes * 60,
                isRunning: false,
              },
            });
          }
          return;
        }

        set({
          pomodoro: {
            ...pomodoro,
            secondsLeft: pomodoro.secondsLeft - 1,
          },
        });
      },

      setNowPlaying: (partial) =>
        set((s) => ({ nowPlaying: { ...s.nowPlaying, ...partial } })),
    }),
    { name: "kaia-storage" }
  )
);
