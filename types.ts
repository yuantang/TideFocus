export type TimerMode = 'focus' | 'break';

export interface Sound {
  id: string;
  name: string;
  url: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ActiveSound {
  id: string;
  volume: number;
}

export interface Stats {
  totalSessions: number;
  focusStreak: number;
  dailySessionsCompleted: number;
  dailyGoal: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  condition: (stats: Stats) => boolean;
}
