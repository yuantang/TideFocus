import { useState, useEffect, useCallback } from 'react';
import { Stats } from '../types';

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalFocusMinutes: Number(localStorage.getItem('totalFocusMinutes')) || 0,
    completedTasks: Number(localStorage.getItem('completedTasks')) || 0,
    nightSessions: Number(localStorage.getItem('nightSessions')) || 0,
    morningSessions: Number(localStorage.getItem('morningSessions')) || 0,
    longestSession: Number(localStorage.getItem('longestSession')) || 0,
    perfectWeeks: Number(localStorage.getItem('perfectWeeks')) || 0,
    goalStreakDays: Number(localStorage.getItem('goalStreakDays')) || 0
  });

  // 持久化统计数据
  useEffect(() => {
    localStorage.setItem('totalFocusMinutes', String(stats.totalFocusMinutes));
    localStorage.setItem('completedTasks', String(stats.completedTasks));
    localStorage.setItem('nightSessions', String(stats.nightSessions));
    localStorage.setItem('morningSessions', String(stats.morningSessions));
    localStorage.setItem('longestSession', String(stats.longestSession));
    localStorage.setItem('perfectWeeks', String(stats.perfectWeeks));
    localStorage.setItem('goalStreakDays', String(stats.goalStreakDays));
  }, [stats]);

  const updateStats = useCallback((updates: Partial<Stats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  }, []);

  const incrementStat = useCallback((key: keyof Stats, amount: number = 1) => {
    setStats(prev => ({
      ...prev,
      [key]: prev[key] + amount
    }));
  }, []);

  return {
    stats,
    updateStats,
    incrementStat
  };
};

