export type TimerMode = 'focus' | 'break';

export interface Sound {
  id: string;
  name: string;
  url: string;
}

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  tags: string[];
  pomodoroCount: number;
  createdAt: number;
  completedAt?: number;
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

export interface SoundscapePreset {
  id: string;
  name: string;
  description: string;
  sounds: Array<{
    id: string;
    volume: number;
  }>;
}
