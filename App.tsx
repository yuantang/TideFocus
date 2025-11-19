import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, Sound, Task, ActiveSound, Achievement, Stats } from './types';
import { SOUNDS, COMPLETION_SOUNDS, REMINDER_SOUNDS, DEFAULT_FOCUS_MINUTES, DEFAULT_BREAK_MINUTES, DEFAULT_LONG_BREAK_MINUTES, DEFAULT_SESSIONS_PER_ROUND, LONG_BREAK_QUOTES, getLocalizedAchievements } from './constants';
import TimerPanel from './components/TimerPanel';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import IntentionModal from './components/IntentionModal';
import TaskListModal from './components/TaskListModal';
import ToastContainer from './components/ToastContainer';
import AchievementUnlockModal from './components/AchievementUnlockModal';
import AuthModal from './components/AuthModal';
import AccountModal from './components/AccountModal';
import SyncIndicator from './components/SyncIndicator';
import { InfoIcon } from './components/Icons';
import { formatTime, updateFavicon } from './utils';
import { useToast } from './hooks/useToast';
import { useAuth } from './hooks/useAuth';
import { useCloudSync } from './hooks/useCloudSync';
import { useRealtimeSync } from './hooks/useRealtimeSync';
import { useAutoSync } from './hooks/useAutoSync';
import { useOfflineQueue } from './hooks/useOfflineQueue';
import { getWeekdayName } from './i18n';


const DEFAULT_FOCUS_BG = '#f8e0e0';
const DEFAULT_FOCUS_TEXT = '#6b5a5a';
const DEFAULT_BREAK_BG = '#fdf6f6';
const DEFAULT_BREAK_TEXT = '#6b5a5a';
const DEFAULT_LONG_BREAK_BG = '#f5efef';
const DEFAULT_LONG_BREAK_TEXT = '#6b5a5a';


export default function App() {
  // Toast hook
  const { toasts, removeToast, success, error, warning, info } = useToast();

  // 认证和云端同步
  const { isAuthenticated, configured: supabaseConfigured } = useAuth();
  const { syncAll } = useCloudSync();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // 实时同步
  const { isConnected: realtimeConnected, lastUpdate: realtimeLastUpdate } = useRealtimeSync();

  // 自动同步
  const { triggerSync, isSyncing: autoSyncing } = useAutoSync({
    enabled: isAuthenticated,
    debounceMs: 3000,
    syncOnVisibilityChange: true,
    syncOnFocus: true,
    periodicSyncIntervalMs: 5 * 60 * 1000 // 5分钟
  });

  // 离线队列
  const { isOnline, queueLength, isProcessing: queueProcessing } = useOfflineQueue();

  const [mode, setMode] = useState<TimerMode>('focus');

  const [focusDuration, setFocusDuration] = useState(() => Number(localStorage.getItem('focusDuration')) || DEFAULT_FOCUS_MINUTES * 60);
  const [breakDuration, setBreakDuration] = useState(() => Number(localStorage.getItem('breakDuration')) || DEFAULT_BREAK_MINUTES * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(() => Number(localStorage.getItem('longBreakDuration')) || DEFAULT_LONG_BREAK_MINUTES * 60);
  const [sessionsPerRound, setSessionsPerRound] = useState(() => Number(localStorage.getItem('sessionsPerRound')) || DEFAULT_SESSIONS_PER_ROUND);
  const [dailyGoal, setDailyGoal] = useState(() => Number(localStorage.getItem('dailyGoal')) || 8);
  const [isBreathingGuideEnabled, setIsBreathingGuideEnabled] = useState(() => localStorage.getItem('isBreathingGuideEnabled') === 'true');
  const [isDesktopNotificationsEnabled, setIsDesktopNotificationsEnabled] = useState(() => localStorage.getItem('isDesktopNotificationsEnabled') === 'true');
  
  const [masterVolume, setMasterVolume] = useState(() => Number(localStorage.getItem('masterVolume') ?? 0.5));
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('isMuted') === 'true');
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.5);
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>(() => {
    const saved = localStorage.getItem('activeSounds');
    return saved ? JSON.parse(saved) : [{ id: 'rain', volume: 0.5 }];
  });
  const [isCompletionSoundEnabled, setIsCompletionSoundEnabled] = useState(() => localStorage.getItem('isCompletionSoundEnabled') === 'true');
  const [selectedCompletionSound, setSelectedCompletionSound] = useState<Sound>(() => COMPLETION_SOUNDS.find(s => s.id === localStorage.getItem('selectedCompletionSoundId')) || COMPLETION_SOUNDS[1]);

  const [focusBgColor, setFocusBgColor] = useState(() => localStorage.getItem('focusBgColor') || DEFAULT_FOCUS_BG);
  const [focusTextColor, setFocusTextColor] = useState(() => localStorage.getItem('focusTextColor') || DEFAULT_FOCUS_TEXT);
  const [breakBgColor, setBreakBgColor] = useState(() => localStorage.getItem('breakBgColor') || DEFAULT_BREAK_BG);
  const [breakTextColor, setBreakTextColor] = useState(() => localStorage.getItem('breakTextColor') || DEFAULT_BREAK_TEXT);
  const [longBreakBgColor, setLongBreakBgColor] = useState(() => localStorage.getItem('longBreakBgColor') || DEFAULT_LONG_BREAK_BG);
  const [longBreakTextColor, setLongBreakTextColor] = useState(() => localStorage.getItem('longBreakTextColor') || DEFAULT_LONG_BREAK_TEXT);
  
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0); 
  const [dailySessionsCompleted, setDailySessionsCompleted] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState<{ day: string; count: number; isToday: boolean }[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [focusStreak, setFocusStreak] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // 新增统计数据
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [nightSessions, setNightSessions] = useState(0);
  const [morningSessions, setMorningSessions] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [perfectWeeks, setPerfectWeeks] = useState(0);
  const [goalStreakDays, setGoalStreakDays] = useState(0);
  
  const [isCurrentBreakLong, setIsCurrentBreakLong] = useState(false);
  const [longBreakQuote, setLongBreakQuote] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const [intention, setIntention] = useState('');
  const [showIntentionPrompt, setShowIntentionPrompt] = useState(false);
  const [linkedTaskId, setLinkedTaskId] = useState<string | null>(null);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskList, setShowTaskList] = useState(false);

  // 成就解锁动画
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  const [showAchievementUnlock, setShowAchievementUnlock] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement>>(
    SOUNDS.reduce((acc, sound) => {
      if (sound.url) {
        try {
          const audio = new Audio(sound.url);
          audio.loop = true;

          // 添加错误处理
          audio.addEventListener('error', (e) => {
            console.error(`Failed to load audio: ${sound.name}`, e);
          });

          acc[sound.id] = audio;
        } catch (error) {
          console.error(`Failed to create audio for ${sound.name}:`, error);
        }
      }
      return acc;
    }, {} as Record<string, HTMLAudioElement>)
  );
  const completionAudioRef = useRef<HTMLAudioElement>(new Audio());
  const intervalRef = useRef<number | null>(null);
  
  // Persist settings
  useEffect(() => { localStorage.setItem('focusDuration', String(focusDuration)) }, [focusDuration]);
  useEffect(() => { localStorage.setItem('breakDuration', String(breakDuration)) }, [breakDuration]);
  useEffect(() => { localStorage.setItem('longBreakDuration', String(longBreakDuration)) }, [longBreakDuration]);
  useEffect(() => { localStorage.setItem('sessionsPerRound', String(sessionsPerRound)) }, [sessionsPerRound]);
  useEffect(() => { localStorage.setItem('dailyGoal', String(dailyGoal))}, [dailyGoal]);
  useEffect(() => { localStorage.setItem('isBreathingGuideEnabled', String(isBreathingGuideEnabled)) }, [isBreathingGuideEnabled]);
  useEffect(() => { localStorage.setItem('isDesktopNotificationsEnabled', String(isDesktopNotificationsEnabled))}, [isDesktopNotificationsEnabled]);
  useEffect(() => { localStorage.setItem('masterVolume', String(masterVolume)) }, [masterVolume]);
  useEffect(() => { localStorage.setItem('isMuted', String(isMuted)) }, [isMuted]);
  useEffect(() => { localStorage.setItem('activeSounds', JSON.stringify(activeSounds)) }, [activeSounds]);
  useEffect(() => { localStorage.setItem('isCompletionSoundEnabled', String(isCompletionSoundEnabled)) }, [isCompletionSoundEnabled]);
  useEffect(() => { localStorage.setItem('selectedCompletionSoundId', selectedCompletionSound.id) }, [selectedCompletionSound]);
  useEffect(() => { localStorage.setItem('focusBgColor', focusBgColor) }, [focusBgColor]);
  useEffect(() => { localStorage.setItem('focusTextColor', focusTextColor) }, [focusTextColor]);
  useEffect(() => { localStorage.setItem('breakBgColor', breakBgColor) }, [breakBgColor]);
  useEffect(() => { localStorage.setItem('breakTextColor', breakTextColor) }, [breakTextColor]);
  useEffect(() => { localStorage.setItem('longBreakBgColor', longBreakBgColor) }, [longBreakBgColor]);
  useEffect(() => { localStorage.setItem('longBreakTextColor', longBreakTextColor) }, [longBreakTextColor]);

  // Load progress history, achievements, and tasks
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    // History & Stats
    const historyRaw = localStorage.getItem('focusHistory');
    let history: Record<string, number> = historyRaw ? JSON.parse(historyRaw) : {};
    setDailySessionsCompleted(history[todayStr] || 0);
    const total = Object.values(history).reduce((sum, count) => sum + count, 0);
    setTotalSessions(total);

    let streak = 0;
    const d = new Date();
    while ((history[d.toISOString().split('T')[0]] || 0) > 0) {
        streak++;
        d.setDate(d.getDate() - 1);
    }
    setFocusStreak(streak);

    // 加载新增统计数据
    const savedTotalFocusMinutes = Number(localStorage.getItem('totalFocusMinutes') || 0);
    setTotalFocusMinutes(savedTotalFocusMinutes);

    const savedCompletedTasks = Number(localStorage.getItem('completedTasks') || 0);
    setCompletedTasks(savedCompletedTasks);

    const savedNightSessions = Number(localStorage.getItem('nightSessions') || 0);
    setNightSessions(savedNightSessions);

    const savedMorningSessions = Number(localStorage.getItem('morningSessions') || 0);
    setMorningSessions(savedMorningSessions);

    const savedLongestSession = Number(localStorage.getItem('longestSession') || 0);
    setLongestSession(savedLongestSession);

    const savedPerfectWeeks = Number(localStorage.getItem('perfectWeeks') || 0);
    setPerfectWeeks(savedPerfectWeeks);

    const savedGoalStreakDays = Number(localStorage.getItem('goalStreakDays') || 0);
    setGoalStreakDays(savedGoalStreakDays);

    const progressData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(new Date().getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        progressData.push({
            day: getWeekdayName(date.getDay(), true),
            count: history[dateStr] || 0,
            isToday: i === 0,
        });
    }
    setWeeklyProgress(progressData);

    // Achievements
    const savedAchievements = localStorage.getItem('unlockedAchievements');
    const unlocked = savedAchievements ? JSON.parse(savedAchievements) : [];
    setUnlockedAchievements(unlocked);
    
    // Tasks (reset daily)
    const taskDataRaw = localStorage.getItem('dailyTasks');
    if (taskDataRaw) {
        const taskData = JSON.parse(taskDataRaw);
        if (taskData.date === todayStr) {
            setTasks(taskData.tasks);
        } else {
            localStorage.removeItem('dailyTasks');
        }
    }
  }, []);

  const totalDuration = mode === 'focus' ? focusDuration : (isCurrentBreakLong ? longBreakDuration : breakDuration);
  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const isLongBreakMode = mode === 'break' && isCurrentBreakLong;
  
  useEffect(() => {
    if (isActive) {
      document.title = `${formatTime(timeLeft)} - ${mode === 'focus' ? 'Focus' : 'Break'}`;
      const faviconMode = isLongBreakMode ? 'long_break' : mode;
      const faviconColor = isLongBreakMode ? longBreakTextColor : (mode === 'focus' ? focusTextColor : breakTextColor);
      updateFavicon(progress, faviconMode, faviconColor);
    } else {
      document.title = 'TideFocus';
      updateFavicon(0, 'inactive', '');
    }
  }, [isActive, timeLeft, mode, progress, isLongBreakMode, focusTextColor, breakTextColor, longBreakTextColor]);


  const primeAudio = useCallback(async () => {
      const audiosToPrime = [
          ...Object.values(audioRefs.current), 
          completionAudioRef.current
      ];
      for (const audio of audiosToPrime) {
          if (audio && audio.src && audio.paused) {
              try {
                  audio.volume = 0;
                  await audio.play();
                  audio.pause();
              } catch (error) {
                  console.warn('Audio priming failed.', error);
              }
          }
      }
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    if (isDesktopNotificationsEnabled && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }, [isDesktopNotificationsEnabled]);
  
  const checkAchievements = useCallback((stats: Stats) => {
    const ACHIEVEMENTS = getLocalizedAchievements();
    const newUnlocks: string[] = [];
    ACHIEVEMENTS.forEach(ach => {
        if (!unlockedAchievements.includes(ach.id) && ach.condition(stats)) {
            newUnlocks.push(ach.id);
        }
    });
    if (newUnlocks.length > 0) {
        const allNewUnlocks = [...unlockedAchievements, ...newUnlocks];
        setUnlockedAchievements(allNewUnlocks);
        localStorage.setItem('unlockedAchievements', JSON.stringify(allNewUnlocks));

        // 显示成就解锁动画
        const firstNew = ACHIEVEMENTS.find(a => a.id === newUnlocks[0]);
        if (firstNew) {
          setUnlockedAchievement(firstNew);
          setShowAchievementUnlock(true);
          success(`🎉 成就解锁：${firstNew.name}`);
        }
    }
  }, [unlockedAchievements, success]);

  const switchMode = useCallback(() => {
    const wasFocus = mode === 'focus';

    if (wasFocus) {
      if (linkedTaskId) {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map(t => {
              if (t.id === linkedTaskId) {
                // 增加番茄钟计数
                return { ...t, pomodoroCount: t.pomodoroCount + 1 };
              }
              return t;
            });
            const todayStr = new Date().toISOString().split('T')[0];
            localStorage.setItem('dailyTasks', JSON.stringify({ date: todayStr, tasks: newTasks }));
            return newTasks;
        });
        setLinkedTaskId(null);
      }
      setIntention('');

      const newDailyCount = dailySessionsCompleted + 1;
      const newTotalSessions = totalSessions + 1;
      setDailySessionsCompleted(newDailyCount);
      setTotalSessions(newTotalSessions);

      // 更新累计专注时长
      const sessionMinutes = Math.floor(focusDuration / 60);
      const newTotalFocusMinutes = totalFocusMinutes + sessionMinutes;
      setTotalFocusMinutes(newTotalFocusMinutes);
      localStorage.setItem('totalFocusMinutes', String(newTotalFocusMinutes));

      // 更新最长单次专注
      if (sessionMinutes > longestSession) {
        setLongestSession(sessionMinutes);
        localStorage.setItem('longestSession', String(sessionMinutes));
      }

      // 检查时段并更新统计
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 23 || hour < 5) {
        // 夜间专注 (23:00-05:00)
        const newNightSessions = nightSessions + 1;
        setNightSessions(newNightSessions);
        localStorage.setItem('nightSessions', String(newNightSessions));
      } else if (hour >= 5 && hour < 7) {
        // 早晨专注 (05:00-07:00)
        const newMorningSessions = morningSessions + 1;
        setMorningSessions(newMorningSessions);
        localStorage.setItem('morningSessions', String(newMorningSessions));
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const history: Record<string, number> = JSON.parse(localStorage.getItem('focusHistory') || '{}');
      history[todayStr] = newDailyCount;
      localStorage.setItem('focusHistory', JSON.stringify(history));

      let currentStreak = focusStreak;
      if (newDailyCount > 0) {
          const d = new Date();
          let s = 0;
          while ((history[d.toISOString().split('T')[0]] || 0) > 0) {
              s++;
              d.setDate(d.getDate() - 1);
          }
          currentStreak = s;
          setFocusStreak(s);
      }

      // 检查是否达成每日目标
      let newGoalStreakDays = goalStreakDays;
      if (dailyGoal > 0 && newDailyCount >= dailyGoal) {
        // 检查昨天是否也达成了目标
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayCount = history[yesterdayStr] || 0;

        if (yesterdayCount >= dailyGoal || goalStreakDays === 0) {
          newGoalStreakDays = goalStreakDays + 1;
          setGoalStreakDays(newGoalStreakDays);
          localStorage.setItem('goalStreakDays', String(newGoalStreakDays));
        }
      }

      checkAchievements({
        totalSessions: newTotalSessions,
        focusStreak: currentStreak,
        dailyGoal,
        dailySessionsCompleted: newDailyCount,
        totalFocusMinutes: newTotalFocusMinutes,
        completedTasks,
        nightSessions: hour >= 23 || hour < 5 ? nightSessions + 1 : nightSessions,
        morningSessions: hour >= 5 && hour < 7 ? morningSessions + 1 : morningSessions,
        longestSession: Math.max(longestSession, sessionMinutes),
        perfectWeeks,
        goalStreakDays: newGoalStreakDays
      });

      setWeeklyProgress(prev => prev.map(d => d.isToday ? { ...d, count: newDailyCount } : d));

      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      const isLongBreak = newSessionCount > 0 && sessionsPerRound > 0 && newSessionCount % sessionsPerRound === 0;
      setIsCurrentBreakLong(isLongBreak);
      
      const breakTime = isLongBreak ? longBreakDuration : breakDuration;
      showNotification('Focus complete!', `Time for a ${breakTime / 60}-minute break.`);

      if (isLongBreak) {
        setLongBreakQuote(LONG_BREAK_QUOTES[Math.floor(Math.random() * LONG_BREAK_QUOTES.length)]);
      }
      setTimeLeft(breakTime);
      setMode('break');
      setIsActive(true);

    } else { // was break
      const nextSessionIsLongBreak = sessionsPerRound > 0 && (sessionCount + 1) % sessionsPerRound === 0;
      showNotification('Break is over!', `Time to focus${nextSessionIsLongBreak ? ' before your long break' : ''}.`);
      setIsCurrentBreakLong(false);
      setTimeLeft(focusDuration);
      setMode('focus');
      setIsActive(false);
      setShowIntentionPrompt(true);
    }
  }, [mode, focusDuration, breakDuration, longBreakDuration, sessionCount, sessionsPerRound, dailySessionsCompleted, totalSessions, focusStreak, checkAchievements, linkedTaskId, dailyGoal, showNotification]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (isCompletionSoundEnabled && completionAudioRef.current.src) {
              completionAudioRef.current.play().catch(console.error);
            }
            switchMode();
            return 0; 
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, switchMode, isCompletionSoundEnabled]);

  const toggleTimer = () => {
     if (mode === 'focus' && !isActive && !intention) {
        setShowIntentionPrompt(true);
        return;
    }
    if (!userInteracted) {
        primeAudio();
        setUserInteracted(true);
    }
    setIsActive(!isActive);
  };
  
  const handleNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    switchMode();
  };

  const handleStartFocus = (newIntention: string, taskId: string | null) => {
    setIntention(newIntention);
    setLinkedTaskId(taskId);
    setShowIntentionPrompt(false);
    if (!userInteracted) { primeAudio(); setUserInteracted(true); }
    setIsActive(true);
  };
  
  const handleSaveSettings = (settings: any) => {
    setFocusDuration(settings.focus * 60);
    setBreakDuration(settings.break * 60);
    setLongBreakDuration(settings.longBreak * 60);
    setSessionsPerRound(settings.sessionsPerRound);
    setDailyGoal(settings.dailyGoal);
    setIsBreathingGuideEnabled(settings.isBreathingGuideEnabled);
    setIsDesktopNotificationsEnabled(settings.isDesktopNotificationsEnabled);
    setActiveSounds(settings.activeSounds);
    setIsCompletionSoundEnabled(settings.isCompletionSoundEnabled);
    setSelectedCompletionSound(settings.completionSound);
    setFocusBgColor(settings.focusBg);
    setFocusTextColor(settings.focusText);
    setBreakBgColor(settings.breakBg);
    setBreakTextColor(settings.breakText);
    setLongBreakBgColor(settings.longBreakBg);
    setLongBreakTextColor(settings.longBreakText);
    setShowSettings(false);
    
    if (!isActive) {
      if (mode === 'focus') setTimeLeft(settings.focus * 60);
      else if (isCurrentBreakLong) setTimeLeft(settings.longBreak * 60);
      else setTimeLeft(settings.break * 60);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, select, button, textarea')) return;
      if (event.code === 'Space') { event.preventDefault(); toggleTimer(); }
      if (event.code === 'ArrowRight') { event.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, toggleTimer, handleNext]);

  // Audio Management: Update completion sound src when selection changes
  useEffect(() => {
    completionAudioRef.current.src = selectedCompletionSound.url;
  }, [selectedCompletionSound]);


  useEffect(() => {
      const activeSoundIds = activeSounds.map(s => s.id);
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
          if (!audio) return; // 跳过加载失败的音频

          const audioElement = audio as HTMLAudioElement;
          const soundIsActive = activeSoundIds.includes(id);
          const shouldBePlaying = soundIsActive && isActive;

          try {
            if (shouldBePlaying && audioElement.paused) {
                audioElement.play().catch(e => console.error(`Failed to play sound ${id}`, e));
            } else if (!shouldBePlaying && !audioElement.paused) {
                audioElement.pause();
            }

            if (soundIsActive) {
                const activeSound = activeSounds.find(s => s.id === id);
                if (activeSound) audioElement.volume = activeSound.volume * masterVolume;
            }
          } catch (error) {
            console.error(`Error managing audio ${id}:`, error);
          }
      });

      try {
        completionAudioRef.current.volume = masterVolume;
      } catch (error) {
        console.error('Error setting completion audio volume:', error);
      }
  }, [isActive, activeSounds, masterVolume]);

  const toggleMute = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      setMasterVolume(volumeBeforeMute);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      setVolumeBeforeMute(masterVolume);
      setMasterVolume(0);
      setIsMuted(true);
    }
  };

  const addTask = (text: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        priority,
        tags: [],
        pomodoroCount: 0,
        createdAt: Date.now()
      };
      setTasks(prev => {
          const newTasks = [...prev, newTask];
          const todayStr = new Date().toISOString().split('T')[0];
          localStorage.setItem('dailyTasks', JSON.stringify({ date: todayStr, tasks: newTasks }));
          return newTasks;
      });
      success('任务已添加');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
      const wasCompleted = tasks.find(t => t.id === id)?.completed;
      setTasks(prev => {
          const newTasks = prev.map(t => {
            if (t.id === id) {
              const updatedTask = { ...t, ...updates };
              // 如果任务被标记为完成，记录完成时间
              if (updates.completed && !t.completed) {
                updatedTask.completedAt = Date.now();
              }
              // 如果任务被标记为未完成，清除完成时间
              if (updates.completed === false && t.completed) {
                updatedTask.completedAt = undefined;
              }
              return updatedTask;
            }
            return t;
          });
           const todayStr = new Date().toISOString().split('T')[0];
          localStorage.setItem('dailyTasks', JSON.stringify({ date: todayStr, tasks: newTasks }));
          return newTasks;
      });

      // 更新完成任务计数
      if (updates.completed !== undefined && wasCompleted !== updates.completed) {
        if (updates.completed) {
          const newCompletedTasks = completedTasks + 1;
          setCompletedTasks(newCompletedTasks);
          localStorage.setItem('completedTasks', String(newCompletedTasks));
          success('任务已完成 ✓');
        } else {
          const newCompletedTasks = Math.max(0, completedTasks - 1);
          setCompletedTasks(newCompletedTasks);
          localStorage.setItem('completedTasks', String(newCompletedTasks));
          info('任务已标记为未完成');
        }
      }
  };

  const deleteTask = (id: string) => {
      setTasks(prev => {
          const newTasks = prev.filter(t => t.id !== id);
           const todayStr = new Date().toISOString().split('T')[0];
          localStorage.setItem('dailyTasks', JSON.stringify({ date: todayStr, tasks: newTasks }));
          return newTasks;
      });
      info('任务已删除');
  };
  
  const controlsTextColor = isLongBreakMode ? longBreakTextColor : (mode === 'focus' ? focusTextColor : breakTextColor);
  
  return (
    <div className="h-screen w-screen flex flex-col font-sans antialiased overflow-hidden">
      {/* 右上角按钮组 */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3" style={{ color: controlsTextColor }}>
        {/* 云端同步指示器 */}
        {supabaseConfigured && (
          <SyncIndicator
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenAccount={() => setShowAccountModal(true)}
          />
        )}

        {/* 信息按钮 */}
        <button onClick={() => setShowInfo(true)} className="p-2 rounded-full text-current/70 hover:text-current transition-colors" aria-label="Show app information">
          <InfoIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow w-full flex flex-row">
          {isLongBreakMode ? (
            <div className="w-full h-full transition-colors duration-500" style={{ backgroundColor: longBreakBgColor, color: longBreakTextColor }}>
                <TimerPanel mode={'break'} isActive={isActive} timeLeft={timeLeft} progress={progress} bgColor="transparent" textColor={longBreakTextColor} isLongBreak={true} quote={longBreakQuote} isBreathingGuideEnabled={isBreathingGuideEnabled}/>
            </div>
          ) : (
            <>
              <div className={`w-1/2 h-full transition-all duration-500 ${mode === 'break' ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundColor: focusBgColor, color: focusTextColor }}>
                  <TimerPanel mode={'focus'} isActive={isActive && mode === 'focus'} timeLeft={mode === 'focus' ? timeLeft : focusDuration} progress={mode === 'focus' ? progress : 0} bgColor="transparent" textColor={focusTextColor} isLongBreak={false} intention={intention}/>
              </div>
              <div className={`w-1/2 h-full transition-all duration-500 ${mode === 'focus' ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundColor: breakBgColor, color: breakTextColor }}>
                  <TimerPanel mode={'break'} isActive={isActive && mode === 'break'} timeLeft={mode === 'break' ? timeLeft : breakDuration} progress={mode === 'break' ? progress : 0} bgColor="transparent" textColor={breakTextColor} isLongBreak={false} isBreathingGuideEnabled={isBreathingGuideEnabled}/>
              </div>
            </>
          )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
          <Controls isActive={isActive} onToggle={toggleTimer} onNext={handleNext} volume={masterVolume} onVolumeChange={setMasterVolume} isMuted={isMuted} onToggleMute={toggleMute} sessionCount={sessionCount} onSettingsClick={() => setShowSettings(true)} timeLeft={timeLeft} totalDuration={totalDuration} progress={progress} mode={mode} isFullscreen={isFullscreen} onToggleFullscreen={handleToggleFullscreen} textColor={controlsTextColor} sessionsPerRound={sessionsPerRound} isLongBreakNext={mode === 'focus' && sessionsPerRound > 0 && (sessionCount + 1) % sessionsPerRound === 0} onTasksClick={() => setShowTaskList(true)}/>
      </div>

       <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} onSave={handleSaveSettings}
        currentSettings={{
          focus: focusDuration / 60, break: breakDuration / 60, longBreak: longBreakDuration / 60,
          sessionsPerRound, dailyGoal, isBreathingGuideEnabled, isDesktopNotificationsEnabled,
          activeSounds, isCompletionSoundEnabled, completionSound: selectedCompletionSound,
          focusBg: focusBgColor, focusText: focusTextColor, breakBg: breakBgColor, breakText: breakTextColor,
          longBreakBg: longBreakBgColor, longBreakText: longBreakTextColor,
        }}/>
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        dailyGoal={dailyGoal}
        dailySessionsCompleted={dailySessionsCompleted}
        weeklyProgress={weeklyProgress}
        totalSessions={totalSessions}
        focusStreak={focusStreak}
        unlockedAchievements={unlockedAchievements}
        stats={{
          totalSessions,
          focusStreak,
          dailySessionsCompleted,
          dailyGoal,
          totalFocusMinutes,
          completedTasks,
          nightSessions,
          morningSessions,
          longestSession,
          perfectWeeks,
          goalStreakDays
        }}
      />
      <IntentionModal
        isOpen={showIntentionPrompt}
        onStart={handleStartFocus}
        onClose={() => setShowIntentionPrompt(false)}
        tasks={tasks.filter(t => !t.completed)}
      />
      <TaskListModal isOpen={showTaskList} onClose={() => setShowTaskList(false)} tasks={tasks} onAddTask={addTask} onUpdateTask={updateTask} onDeleteTask={deleteTask} />

      {/* 成就解锁动画 */}
      <AchievementUnlockModal
        achievement={unlockedAchievement}
        isOpen={showAchievementUnlock}
        onClose={() => {
          setShowAchievementUnlock(false);
          setUnlockedAchievement(null);
        }}
      />

      {/* Toast 通知 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* 账号管理模态框 */}
      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </div>
  );
}