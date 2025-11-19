import { useCallback } from 'react';
import { Task, Stats } from '../types';

interface BackupData {
  version: string;
  timestamp: number;
  settings: {
    focusDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    sessionsPerRound: number;
    dailyGoal: number;
    isBreathingGuideEnabled: boolean;
    isDesktopNotificationsEnabled: boolean;
    masterVolume: number;
    isMuted: boolean;
    activeSounds: any[];
    isCompletionSoundEnabled: boolean;
    selectedCompletionSoundId: string;
    focusBgColor: string;
    focusTextColor: string;
    breakBgColor: string;
    breakTextColor: string;
    longBreakBgColor: string;
    longBreakTextColor: string;
  };
  history: Record<string, number>;
  tasks: { date: string; tasks: Task[] } | null;
  achievements: string[];
  stats: {
    totalFocusMinutes: number;
    completedTasks: number;
    nightSessions: number;
    morningSessions: number;
    longestSession: number;
    perfectWeeks: number;
    goalStreakDays: number;
  };
}

export const useDataBackup = () => {
  // 收集所有数据
  const collectData = useCallback((): BackupData => {
    const data: BackupData = {
      version: '1.0.0',
      timestamp: Date.now(),
      settings: {
        focusDuration: Number(localStorage.getItem('focusDuration')) || 1500,
        breakDuration: Number(localStorage.getItem('breakDuration')) || 300,
        longBreakDuration: Number(localStorage.getItem('longBreakDuration')) || 900,
        sessionsPerRound: Number(localStorage.getItem('sessionsPerRound')) || 4,
        dailyGoal: Number(localStorage.getItem('dailyGoal')) || 8,
        isBreathingGuideEnabled: localStorage.getItem('isBreathingGuideEnabled') === 'true',
        isDesktopNotificationsEnabled: localStorage.getItem('isDesktopNotificationsEnabled') === 'true',
        masterVolume: Number(localStorage.getItem('masterVolume') ?? 0.5),
        isMuted: localStorage.getItem('isMuted') === 'true',
        activeSounds: JSON.parse(localStorage.getItem('activeSounds') || '[]'),
        isCompletionSoundEnabled: localStorage.getItem('isCompletionSoundEnabled') === 'true',
        selectedCompletionSoundId: localStorage.getItem('selectedCompletionSoundId') || 'bell',
        focusBgColor: localStorage.getItem('focusBgColor') || '#f8e0e0',
        focusTextColor: localStorage.getItem('focusTextColor') || '#6b5a5a',
        breakBgColor: localStorage.getItem('breakBgColor') || '#fdf6f6',
        breakTextColor: localStorage.getItem('breakTextColor') || '#6b5a5a',
        longBreakBgColor: localStorage.getItem('longBreakBgColor') || '#f5efef',
        longBreakTextColor: localStorage.getItem('longBreakTextColor') || '#6b5a5a',
      },
      history: JSON.parse(localStorage.getItem('focusHistory') || '{}'),
      tasks: localStorage.getItem('dailyTasks') ? JSON.parse(localStorage.getItem('dailyTasks')!) : null,
      achievements: JSON.parse(localStorage.getItem('unlockedAchievements') || '[]'),
      stats: {
        totalFocusMinutes: Number(localStorage.getItem('totalFocusMinutes')) || 0,
        completedTasks: Number(localStorage.getItem('completedTasks')) || 0,
        nightSessions: Number(localStorage.getItem('nightSessions')) || 0,
        morningSessions: Number(localStorage.getItem('morningSessions')) || 0,
        longestSession: Number(localStorage.getItem('longestSession')) || 0,
        perfectWeeks: Number(localStorage.getItem('perfectWeeks')) || 0,
        goalStreakDays: Number(localStorage.getItem('goalStreakDays')) || 0,
      }
    };
    return data;
  }, []);

  // 导出数据为 JSON 文件
  const exportData = useCallback(() => {
    try {
      const data = collectData();
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `tidefocus-backup-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true, message: '数据导出成功！' };
    } catch (error) {
      console.error('Export failed:', error);
      return { success: false, message: '数据导出失败，请重试' };
    }
  }, [collectData]);

  // 从文件导入数据
  const importData = useCallback((file: File): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data: BackupData = JSON.parse(content);
          
          // 验证数据版本
          if (!data.version || !data.timestamp) {
            resolve({ success: false, message: '无效的备份文件格式' });
            return;
          }

          // 恢复设置
          Object.entries(data.settings).forEach(([key, value]) => {
            if (typeof value === 'object') {
              localStorage.setItem(key, JSON.stringify(value));
            } else {
              localStorage.setItem(key, String(value));
            }
          });

          // 恢复历史记录
          localStorage.setItem('focusHistory', JSON.stringify(data.history));

          // 恢复任务
          if (data.tasks) {
            localStorage.setItem('dailyTasks', JSON.stringify(data.tasks));
          }

          // 恢复成就
          localStorage.setItem('unlockedAchievements', JSON.stringify(data.achievements));

          // 恢复统计数据
          Object.entries(data.stats).forEach(([key, value]) => {
            localStorage.setItem(key, String(value));
          });

          resolve({ success: true, message: '数据导入成功！请刷新页面以应用更改' });
        } catch (error) {
          console.error('Import failed:', error);
          resolve({ success: false, message: '数据导入失败，文件可能已损坏' });
        }
      };

      reader.onerror = () => {
        resolve({ success: false, message: '文件读取失败' });
      };

      reader.readAsText(file);
    });
  }, []);

  return {
    exportData,
    importData,
    collectData
  };
};

