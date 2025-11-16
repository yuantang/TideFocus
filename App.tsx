import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, Sound, Task, ActiveSound, Achievement, Stats } from './types';
import { SOUNDS, COMPLETION_SOUNDS, REMINDER_SOUNDS, DEFAULT_FOCUS_MINUTES, DEFAULT_BREAK_MINUTES, DEFAULT_LONG_BREAK_MINUTES, DEFAULT_SESSIONS_PER_ROUND, LONG_BREAK_QUOTES, ACHIEVEMENTS } from './constants';
import TimerPanel from './components/TimerPanel';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import IntentionModal from './components/IntentionModal';
import TaskListModal from './components/TaskListModal';
import ToastContainer from './components/ToastContainer';
import { InfoIcon } from './components/Icons';
import { formatTime, updateFavicon } from './utils';
import { useToast } from './hooks/useToast';


const DEFAULT_FOCUS_BG = '#f8e0e0';
const DEFAULT_FOCUS_TEXT = '#6b5a5a';
const DEFAULT_BREAK_BG = '#fdf6f6';
const DEFAULT_BREAK_TEXT = '#6b5a5a';
const DEFAULT_LONG_BREAK_BG = '#f5efef';
const DEFAULT_LONG_BREAK_TEXT = '#6b5a5a';


export default function App() {
  // Toast hook
  const { toasts, removeToast, success, error, warning, info } = useToast();

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

  const audioRefs = useRef<Record<string, HTMLAudioElement>>(
    SOUNDS.reduce((acc, sound) => {
      if (sound.url) {
        const audio = new Audio(sound.url);
        audio.loop = true;
        acc[sound.id] = audio;
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

    const progressData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(new Date().getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        progressData.push({
            day: date.toLocaleString('en-US', { weekday: 'short' }),
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
      document.title = 'Gentle Focus Timer';
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
        // Optional: show a notification for the new achievement
        const firstNew = ACHIEVEMENTS.find(a => a.id === newUnlocks[0]);
        if (firstNew) {
          showNotification('Milestone Unlocked! ✨', `You've earned: ${firstNew.name}`);
        }
    }
  }, [unlockedAchievements, showNotification]);

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
      
      checkAchievements({ totalSessions: newTotalSessions, focusStreak: currentStreak, dailyGoal, dailySessionsCompleted: newDailyCount });

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
          const soundIsActive = activeSoundIds.includes(id);
          const shouldBePlaying = soundIsActive && isActive;

          if (shouldBePlaying && audio.paused) {
              audio.play().catch(e => console.error(`Failed to play sound ${id}`, e));
          } else if (!shouldBePlaying && !audio.paused) {
              audio.pause();
          }

          if (soundIsActive) {
              const activeSound = activeSounds.find(s => s.id === id);
              if (activeSound) audio.volume = activeSound.volume * masterVolume;
          }
      });
      completionAudioRef.current.volume = masterVolume;
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
      // 只在完成状态改变时显示通知
      if (updates.completed !== undefined && wasCompleted !== updates.completed) {
        if (updates.completed) {
          success('任务已完成 ✓');
        } else {
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
      <div className="absolute top-4 right-4 z-20" style={{ color: controlsTextColor }}>
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
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} dailyGoal={dailyGoal} dailySessionsCompleted={dailySessionsCompleted} weeklyProgress={weeklyProgress} totalSessions={totalSessions} focusStreak={focusStreak} unlockedAchievements={unlockedAchievements} />
      <IntentionModal isOpen={showIntentionPrompt} onStart={handleStartFocus} tasks={tasks.filter(t => !t.completed)} />
      <TaskListModal isOpen={showTaskList} onClose={() => setShowTaskList(false)} tasks={tasks} onAddTask={addTask} onUpdateTask={updateTask} onDeleteTask={deleteTask} />

      {/* Toast 通知 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}