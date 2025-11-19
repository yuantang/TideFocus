import { useState, useEffect, useCallback } from 'react';
import { getLocalizedAchievements } from '../constants';
import { Stats } from '../types';

export const useAchievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [newlyUnlockedAchievement, setNewlyUnlockedAchievement] = useState<string | null>(null);

  // 加载成就
  useEffect(() => {
    try {
      const saved = localStorage.getItem('unlockedAchievements');
      if (saved) {
        setUnlockedAchievements(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load achievements:', error);
      setUnlockedAchievements([]);
    }
  }, []);

  // 持久化成就
  const saveAchievements = useCallback((achievements: string[]) => {
    try {
      localStorage.setItem('unlockedAchievements', JSON.stringify(achievements));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(achievementId)) {
        return prev;
      }
      const newAchievements = [...prev, achievementId];
      saveAchievements(newAchievements);
      setNewlyUnlockedAchievement(achievementId);
      return newAchievements;
    });
  }, [saveAchievements]);

  const checkAchievements = useCallback((stats: Stats, todayCount: number) => {
    const ACHIEVEMENTS = getLocalizedAchievements();
    
    ACHIEVEMENTS.forEach(achievement => {
      if (unlockedAchievements.includes(achievement.id)) {
        return;
      }

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first-session':
          shouldUnlock = stats.totalFocusMinutes >= 25;
          break;
        case 'early-bird':
          shouldUnlock = stats.morningSessions >= 1;
          break;
        case 'night-owl':
          shouldUnlock = stats.nightSessions >= 1;
          break;
        case 'week-warrior':
          shouldUnlock = stats.goalStreakDays >= 7;
          break;
        case 'task-master':
          shouldUnlock = stats.completedTasks >= 10;
          break;
        case 'focus-master':
          shouldUnlock = stats.totalFocusMinutes >= 500;
          break;
        case 'marathon':
          shouldUnlock = stats.longestSession >= 120;
          break;
        case 'perfect-week':
          shouldUnlock = stats.perfectWeeks >= 1;
          break;
        case 'daily-hero':
          shouldUnlock = todayCount >= 8;
          break;
        case 'century':
          shouldUnlock = stats.totalFocusMinutes >= 2500;
          break;
      }

      if (shouldUnlock) {
        unlockAchievement(achievement.id);
      }
    });
  }, [unlockedAchievements, unlockAchievement]);

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlockedAchievement(null);
  }, []);

  return {
    unlockedAchievements,
    newlyUnlockedAchievement,
    unlockAchievement,
    checkAchievements,
    clearNewlyUnlocked
  };
};

