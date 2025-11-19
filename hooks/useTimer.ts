import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerMode = 'focus' | 'break' | 'longBreak';

interface UseTimerProps {
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsPerRound: number;
  onComplete: (mode: TimerMode) => void;
}

export const useTimer = ({
  focusDuration,
  breakDuration,
  longBreakDuration,
  sessionsPerRound,
  onComplete
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // 更新时间显示
  useEffect(() => {
    if (mode === 'focus') setTimeLeft(focusDuration);
    else if (mode === 'break') setTimeLeft(breakDuration);
    else setTimeLeft(longBreakDuration);
  }, [mode, focusDuration, breakDuration, longBreakDuration]);

  // 计时器逻辑
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            onComplete(mode);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, mode, onComplete]);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(focusDuration);
    else if (mode === 'break') setTimeLeft(breakDuration);
    else setTimeLeft(longBreakDuration);
  }, [mode, focusDuration, breakDuration, longBreakDuration]);

  const skipToNext = useCallback(() => {
    setIsActive(false);
    if (mode === 'focus') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (newCount % sessionsPerRound === 0) {
        setMode('longBreak');
      } else {
        setMode('break');
      }
    } else {
      setMode('focus');
    }
  }, [mode, sessionCount, sessionsPerRound]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
  }, []);

  return {
    timeLeft,
    isActive,
    mode,
    sessionCount,
    toggleTimer,
    resetTimer,
    skipToNext,
    switchMode,
    setSessionCount
  };
};

