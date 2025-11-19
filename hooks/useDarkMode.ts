import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'auto';
  });

  const [isDark, setIsDark] = useState(false);

  // 检测系统主题
  const getSystemTheme = useCallback(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // 更新实际的暗黑模式状态
  useEffect(() => {
    if (theme === 'auto') {
      setIsDark(getSystemTheme());
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme, getSystemTheme]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // 应用主题到 DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 持久化主题设置
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  }, []);

  const setLightMode = useCallback(() => setTheme('light'), []);
  const setDarkMode = useCallback(() => setTheme('dark'), []);
  const setAutoMode = useCallback(() => setTheme('auto'), []);

  return {
    theme,
    isDark,
    toggleTheme,
    setLightMode,
    setDarkMode,
    setAutoMode,
    setTheme
  };
};

// 暗黑模式配色方案
export const darkThemeColors = {
  focus: {
    bg: '#2d1f1f',
    text: '#f5e6e6'
  },
  break: {
    bg: '#1a1a1a',
    text: '#f0f0f0'
  },
  longBreak: {
    bg: '#252525',
    text: '#e8e8e8'
  }
};

// 浅色模式配色方案（默认）
export const lightThemeColors = {
  focus: {
    bg: '#f8e0e0',
    text: '#6b5a5a'
  },
  break: {
    bg: '#fdf6f6',
    text: '#6b5a5a'
  },
  longBreak: {
    bg: '#f5efef',
    text: '#6b5a5a'
  }
};

// 根据暗黑模式获取颜色
export const getThemeColors = (isDark: boolean) => {
  return isDark ? darkThemeColors : lightThemeColors;
};

