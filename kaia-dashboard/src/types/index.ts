export type Priority = "low" | "mid" | "high";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dateKey: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  color: "pink" | "yellow";
  pinned: boolean;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  folderId?: string;
  tagIds: string[];
}

export interface QuoteState {
  text: string;
  author: string;
  dateKey: string;
}

export type PomodoroPhase = "focus" | "break" | "idle";

export interface PomodoroState {
  focusMinutes: number;
  breakMinutes: number;
  phase: PomodoroPhase;
  secondsLeft: number;
  sessionsCompleted: number;
  isRunning: boolean;
}

export interface NowPlaying {
  title: string;
  artist: string;
  imageUrl?: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
}


