/**
 * 数据同步辅助工具
 * 
 * 功能：
 * 1. 收集所有需要同步的用户数据
 * 2. 构建完整的统计数据对象
 * 3. 确保所有本地数据都能正确同步
 */

export interface UserStats {
  // 基础统计
  totalSessions: number;
  dailySessionsCompleted: number;
  focusStreak: number;
  totalFocusMinutes: number;
  completedTasks: number;
  
  // 时间段统计
  nightSessions: number;
  morningSessions: number;
  longestSession: number;
  
  // 目标相关
  goalStreakDays: number;
  perfectWeeks: number;
  
  // 其他统计
  lastUpdated: string;
}

/**
 * 从 localStorage 收集所有统计数据
 */
export const collectUserStats = (): UserStats => {
  return {
    totalSessions: Number(localStorage.getItem('totalSessions') || 0),
    dailySessionsCompleted: Number(localStorage.getItem('dailySessionsCompleted') || 0),
    focusStreak: Number(localStorage.getItem('focusStreak') || 0),
    totalFocusMinutes: Number(localStorage.getItem('totalFocusMinutes') || 0),
    completedTasks: Number(localStorage.getItem('completedTasks') || 0),
    nightSessions: Number(localStorage.getItem('nightSessions') || 0),
    morningSessions: Number(localStorage.getItem('morningSessions') || 0),
    longestSession: Number(localStorage.getItem('longestSession') || 0),
    goalStreakDays: Number(localStorage.getItem('goalStreakDays') || 0),
    perfectWeeks: Number(localStorage.getItem('perfectWeeks') || 0),
    lastUpdated: new Date().toISOString()
  };
};

/**
 * 将统计数据保存到 localStorage
 */
export const saveUserStats = (stats: UserStats): void => {
  localStorage.setItem('totalSessions', String(stats.totalSessions));
  localStorage.setItem('dailySessionsCompleted', String(stats.dailySessionsCompleted));
  localStorage.setItem('focusStreak', String(stats.focusStreak));
  localStorage.setItem('totalFocusMinutes', String(stats.totalFocusMinutes));
  localStorage.setItem('completedTasks', String(stats.completedTasks));
  localStorage.setItem('nightSessions', String(stats.nightSessions));
  localStorage.setItem('morningSessions', String(stats.morningSessions));
  localStorage.setItem('longestSession', String(stats.longestSession));
  localStorage.setItem('goalStreakDays', String(stats.goalStreakDays));
  localStorage.setItem('perfectWeeks', String(stats.perfectWeeks));
  
  // 同时保存到 userStats 对象（用于云端同步）
  localStorage.setItem('userStats', JSON.stringify(stats));
};

/**
 * 合并两个统计数据对象（取最大值）
 */
export const mergeUserStats = (local: UserStats, cloud: UserStats): UserStats => {
  return {
    totalSessions: Math.max(local.totalSessions, cloud.totalSessions),
    dailySessionsCompleted: Math.max(local.dailySessionsCompleted, cloud.dailySessionsCompleted),
    focusStreak: Math.max(local.focusStreak, cloud.focusStreak),
    totalFocusMinutes: Math.max(local.totalFocusMinutes, cloud.totalFocusMinutes),
    completedTasks: Math.max(local.completedTasks, cloud.completedTasks),
    nightSessions: Math.max(local.nightSessions, cloud.nightSessions),
    morningSessions: Math.max(local.morningSessions, cloud.morningSessions),
    longestSession: Math.max(local.longestSession, cloud.longestSession),
    goalStreakDays: Math.max(local.goalStreakDays, cloud.goalStreakDays),
    perfectWeeks: Math.max(local.perfectWeeks, cloud.perfectWeeks),
    lastUpdated: new Date().toISOString()
  };
};

/**
 * 在数据变化时自动同步统计数据
 */
export const syncStatsToStorage = (): void => {
  const stats = collectUserStats();
  localStorage.setItem('userStats', JSON.stringify(stats));
  console.log('📊 Stats synced to userStats:', stats);
};

/**
 * 从 userStats 恢复所有统计数据到独立的 localStorage 键
 */
export const restoreStatsFromStorage = (): void => {
  const userStatsStr = localStorage.getItem('userStats');
  if (!userStatsStr) return;

  try {
    const stats: UserStats = JSON.parse(userStatsStr);
    saveUserStats(stats);
    console.log('📊 Stats restored from userStats:', stats);
  } catch (error) {
    console.error('Failed to restore stats:', error);
  }
};

/**
 * 检查是否需要同步统计数据
 */
export const needsStatsSync = (): boolean => {
  const userStatsStr = localStorage.getItem('userStats');
  if (!userStatsStr) return true;

  try {
    const savedStats: UserStats = JSON.parse(userStatsStr);
    const currentStats = collectUserStats();

    // 比较关键字段是否有变化
    return (
      savedStats.totalSessions !== currentStats.totalSessions ||
      savedStats.totalFocusMinutes !== currentStats.totalFocusMinutes ||
      savedStats.completedTasks !== currentStats.completedTasks ||
      savedStats.focusStreak !== currentStats.focusStreak
    );
  } catch (error) {
    return true;
  }
};

/**
 * 打印当前所有统计数据（用于调试）
 */
export const debugPrintStats = (): void => {
  const stats = collectUserStats();
  console.log('📊 Current User Stats:', {
    ...stats,
    achievements: JSON.parse(localStorage.getItem('unlockedAchievements') || '[]'),
    history: JSON.parse(localStorage.getItem('focusHistory') || '{}'),
    tasks: JSON.parse(localStorage.getItem('dailyTasks') || '{"date":"","tasks":[]}')
  });
};

