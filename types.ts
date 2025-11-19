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
  totalFocusMinutes: number; // 累计专注时长（分钟）
  completedTasks: number; // 完成的任务数
  nightSessions: number; // 夜间专注次数（23:00-05:00）
  morningSessions: number; // 早晨专注次数（05:00-07:00）
  longestSession: number; // 最长单次专注（分钟）
  perfectWeeks: number; // 完美周数（连续7天达成目标）
  goalStreakDays: number; // 连续达成目标天数
}

export type AchievementCategory = 'focus' | 'task' | 'time' | 'streak';

export interface AchievementProgress {
  current: number;
  total: number;
  percentage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }> | string; // 支持组件或 emoji
  category: AchievementCategory;
  condition: (stats: Stats) => boolean;
  progress?: (stats: Stats) => AchievementProgress;
  unlockedAt?: number;
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

export interface PomodoroTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  focusDuration: number; // 分钟
  breakDuration: number; // 分钟
  longBreakDuration: number; // 分钟
  sessionsPerRound: number;
  isCustom?: boolean;
  createdAt?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  duration: number; // 实际专注时长（分钟）
  mode: TimerMode;
  intention?: string; // 专注意图
  taskId?: string; // 关联的任务ID
  quality?: number; // 专注质量（1-5星）
  notes?: string; // 笔记和反思
  templateId?: string; // 使用的模板ID
}
