import { useState, useEffect, useCallback } from 'react';

export const useHistory = () => {
  const [history, setHistory] = useState<Record<string, number>>({});

  // 加载历史记录
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('focusHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      setHistory({});
    }
  }, []);

  // 持久化历史记录
  const saveHistory = useCallback((newHistory: Record<string, number>) => {
    try {
      localStorage.setItem('focusHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, []);

  const incrementToday = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setHistory(prev => {
      const newHistory = {
        ...prev,
        [today]: (prev[today] || 0) + 1
      };
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const getTodayCount = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return history[today] || 0;
  }, [history]);

  const getWeeklyProgress = useCallback(() => {
    const today = new Date();
    const weekProgress = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' });
      
      weekProgress.push({
        day: dayName,
        count: history[dateStr] || 0,
        isToday: i === 0
      });
    }
    
    return weekProgress;
  }, [history]);

  return {
    history,
    incrementToday,
    getTodayCount,
    getWeeklyProgress
  };
};

