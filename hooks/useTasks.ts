import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 加载任务
  useEffect(() => {
    const savedTasks = localStorage.getItem('dailyTasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        const todayStr = new Date().toISOString().split('T')[0];
        
        if (parsed.date === todayStr) {
          setTasks(parsed.tasks || []);
        } else {
          // 新的一天，清空任务
          setTasks([]);
          localStorage.removeItem('dailyTasks');
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        setTasks([]);
      }
    }
  }, []);

  // 持久化任务
  const saveTasks = useCallback((newTasks: Task[]) => {
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem('dailyTasks', JSON.stringify({ date: todayStr, tasks: newTasks }));
  }, []);

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      pomodoroCount: 0,
      createdAt: Date.now()
    };
    setTasks(prev => {
      const newTasks = [...prev, newTask];
      saveTasks(newTasks);
      return newTasks;
    });
  }, [saveTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => {
      const newTasks = prev.map(t => 
        t.id === id ? { ...t, ...updates } : t
      );
      saveTasks(newTasks);
      return newTasks;
    });
  }, [saveTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const newTasks = prev.filter(t => t.id !== id);
      saveTasks(newTasks);
      return newTasks;
    });
  }, [saveTasks]);

  const incrementTaskPomodoro = useCallback((taskId: string) => {
    setTasks(prev => {
      const newTasks = prev.map(t =>
        t.id === taskId ? { ...t, pomodoroCount: t.pomodoroCount + 1 } : t
      );
      saveTasks(newTasks);
      return newTasks;
    });
  }, [saveTasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    incrementTaskPomodoro
  };
};

