import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, Sound } from './types';
import { SOUNDS, COMPLETION_SOUNDS, REMINDER_SOUNDS, DEFAULT_FOCUS_MINUTES, DEFAULT_BREAK_MINUTES, DEFAULT_LONG_BREAK_MINUTES, DEFAULT_SESSIONS_PER_ROUND, LONG_BREAK_QUOTES } from './constants';
import TimerPanel from './components/TimerPanel';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import { InfoIcon } from './components/Icons';
import { formatTime } from './utils';


const DEFAULT_FOCUS_BG = '#f8e0e0';
const DEFAULT_FOCUS_TEXT = '#6b5a5a';
const DEFAULT_BREAK_BG = '#fdf6f6';
const DEFAULT_BREAK_TEXT = '#6b5a5a';
const DEFAULT_LONG_BREAK_BG = '#f5efef';
const DEFAULT_LONG_BREAK_TEXT = '#6b5a5a';


export default function App() {
  const [mode, setMode] = useState<TimerMode>('focus');
  
  const [focusDuration, setFocusDuration] = useState(() => Number(localStorage.getItem('focusDuration')) || DEFAULT_FOCUS_MINUTES * 60);
  const [breakDuration, setBreakDuration] = useState(() => Number(localStorage.getItem('breakDuration')) || DEFAULT_BREAK_MINUTES * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(() => Number(localStorage.getItem('longBreakDuration')) || DEFAULT_LONG_BREAK_MINUTES * 60);
  const [sessionsPerRound, setSessionsPerRound] = useState(() => Number(localStorage.getItem('sessionsPerRound')) || DEFAULT_SESSIONS_PER_ROUND);
  const [dailyGoal, setDailyGoal] = useState(() => Number(localStorage.getItem('dailyGoal')) || 8);
  
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('volume') ?? 0.5));
  const [selectedSound, setSelectedSound] = useState<Sound>(() => SOUNDS.find(s => s.id === localStorage.getItem('selectedSoundId')) || SOUNDS[0]);
  const [isCompletionSoundEnabled, setIsCompletionSoundEnabled] = useState(() => localStorage.getItem('isCompletionSoundEnabled') === 'true');
  const [selectedCompletionSound, setSelectedCompletionSound] = useState<Sound>(() => COMPLETION_SOUNDS.find(s => s.id === localStorage.getItem('selectedCompletionSoundId')) || COMPLETION_SOUNDS[1]);
  const [isLongBreakReminderSoundEnabled, setIsLongBreakReminderSoundEnabled] = useState(() => localStorage.getItem('isLongBreakReminderSoundEnabled') === 'true');
  const [selectedLongBreakReminderSound, setSelectedLongBreakReminderSound] = useState<Sound>(() => REMINDER_SOUNDS.find(s => s.id === localStorage.getItem('selectedLongBreakReminderSoundId')) || REMINDER_SOUNDS[1]);


  const [focusBgColor, setFocusBgColor] = useState(() => localStorage.getItem('focusBgColor') || DEFAULT_FOCUS_BG);
  const [focusTextColor, setFocusTextColor] = useState(() => localStorage.getItem('focusTextColor') || DEFAULT_FOCUS_TEXT);
  const [breakBgColor, setBreakBgColor] = useState(() => localStorage.getItem('breakBgColor') || DEFAULT_BREAK_BG);
  const [breakTextColor, setBreakTextColor] = useState(() => localStorage.getItem('breakTextColor') || DEFAULT_BREAK_TEXT);
  const [longBreakBgColor, setLongBreakBgColor] = useState(() => localStorage.getItem('longBreakBgColor') || DEFAULT_LONG_BREAK_BG);
  const [longBreakTextColor, setLongBreakTextColor] = useState(() => localStorage.getItem('longBreakTextColor') || DEFAULT_LONG_BREAK_TEXT);
  
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0); // number of completed focus sessions in current round
  const [dailySessionsCompleted, setDailySessionsCompleted] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState<{ day: string; count: number; isToday: boolean }[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [focusStreak, setFocusStreak] = useState(0);
  const [isCurrentBreakLong, setIsCurrentBreakLong] = useState(false);
  const [longBreakQuote, setLongBreakQuote] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const completionAudioRef = useRef<HTMLAudioElement>(new Audio());
  const reminderAudioRef = useRef<HTMLAudioElement>(new Audio());
  const intervalRef = useRef<number | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  // Persist settings
  useEffect(() => { localStorage.setItem('focusDuration', String(focusDuration)) }, [focusDuration]);
  useEffect(() => { localStorage.setItem('breakDuration', String(breakDuration)) }, [breakDuration]);
  useEffect(() => { localStorage.setItem('longBreakDuration', String(longBreakDuration)) }, [longBreakDuration]);
  useEffect(() => { localStorage.setItem('sessionsPerRound', String(sessionsPerRound)) }, [sessionsPerRound]);
  useEffect(() => { localStorage.setItem('dailyGoal', String(dailyGoal))}, [dailyGoal]);
  useEffect(() => { localStorage.setItem('volume', String(volume)) }, [volume]);
  useEffect(() => { localStorage.setItem('selectedSoundId', selectedSound.id) }, [selectedSound]);
  useEffect(() => { localStorage.setItem('isCompletionSoundEnabled', String(isCompletionSoundEnabled)) }, [isCompletionSoundEnabled]);
  useEffect(() => { localStorage.setItem('selectedCompletionSoundId', selectedCompletionSound.id) }, [selectedCompletionSound]);
  useEffect(() => { localStorage.setItem('isLongBreakReminderSoundEnabled', String(isLongBreakReminderSoundEnabled)) }, [isLongBreakReminderSoundEnabled]);
  useEffect(() => { localStorage.setItem('selectedLongBreakReminderSoundId', selectedLongBreakReminderSound.id) }, [selectedLongBreakReminderSound]);
  useEffect(() => { localStorage.setItem('focusBgColor', focusBgColor) }, [focusBgColor]);
  useEffect(() => { localStorage.setItem('focusTextColor', focusTextColor) }, [focusTextColor]);
  useEffect(() => { localStorage.setItem('breakBgColor', breakBgColor) }, [breakBgColor]);
  useEffect(() => { localStorage.setItem('breakTextColor', breakTextColor) }, [breakTextColor]);
  useEffect(() => { localStorage.setItem('longBreakBgColor', longBreakBgColor) }, [longBreakBgColor]);
  useEffect(() => { localStorage.setItem('longBreakTextColor', longBreakTextColor) }, [longBreakTextColor]);

  // Load progress history and calculate daily/weekly stats
  useEffect(() => {
    // One-time migration from old format
    const oldProgressRaw = localStorage.getItem('dailyProgress');
    const historyRaw = localStorage.getItem('focusHistory');
    let history = historyRaw ? JSON.parse(historyRaw) : {};
    
    if (oldProgressRaw && !historyRaw) {
      try {
        const oldProgress = JSON.parse(oldProgressRaw);
        if (oldProgress.date && typeof oldProgress.count === 'number') {
          history[oldProgress.date] = oldProgress.count;
          localStorage.setItem('focusHistory', JSON.stringify(history));
          localStorage.removeItem('dailyProgress');
        }
      } catch (e) {
        console.error("Failed to migrate old progress", e);
      }
    }
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Set daily completed sessions
    setDailySessionsCompleted(history[todayStr] || 0);
    
    // Calculate total sessions
    const total = Object.values(history).reduce((sum: number, count: any) => sum + (typeof count === 'number' ? count : 0), 0);
    setTotalSessions(total);

    // Calculate focus streak
    let streak = 0;
    const d = new Date();
    while (history[d.toISOString().split('T')[0]] > 0) {
        streak++;
        d.setDate(d.getDate() - 1);
    }
    setFocusStreak(streak);


    // Calculate weekly progress for the last 7 days
    const progressData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleString('en-US', { weekday: 'short' });

        progressData.push({
            day: dayName,
            count: history[dateStr] || 0,
            isToday: i === 0,
        });
    }
    setWeeklyProgress(progressData);
  }, []);

  // Dynamic page title
  useEffect(() => {
    if (isActive) {
      document.title = `${formatTime(timeLeft)} - ${mode === 'focus' ? 'Focus' : 'Break'}`;
    } else {
      document.title = 'Gentle Focus Timer';
    }
  }, [isActive, timeLeft, mode]);
  
  const fadeAudio = useCallback((targetVolume: number, duration: number, onComplete?: () => void) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    const audio = audioRef.current;
    if (!audio.src && targetVolume === 0) {
      onComplete?.();
      return;
    }
    const initialVolume = audio.volume;
    const step = (targetVolume - initialVolume) / (duration / 50);
    let currentVolume = initialVolume;

    fadeIntervalRef.current = window.setInterval(() => {
        currentVolume += step;
        if ((step > 0 && currentVolume >= targetVolume) || (step < 0 && currentVolume <= targetVolume)) {
            audio.volume = targetVolume;
            if(fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
            onComplete?.();
        } else if (audio) { // Check if audio still exists
            audio.volume = currentVolume;
        }
    }, 50);
  }, []);

  const switchMode = useCallback(() => {
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    
    if (mode === 'focus') {
      const newDailyCount = dailySessionsCompleted + 1;
      setDailySessionsCompleted(newDailyCount);
      setTotalSessions(prev => prev + 1);
      
      const todayStr = new Date().toISOString().split('T')[0];
      const history = JSON.parse(localStorage.getItem('focusHistory') || '{}');
      history[todayStr] = newDailyCount;
      localStorage.setItem('focusHistory', JSON.stringify(history));
      
      // Recalculate streak in case today was the first session
      if(newDailyCount === 1) {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        let currentStreak = 1;
        while (history[d.toISOString().split('T')[0]] > 0) {
            currentStreak++;
            d.setDate(d.getDate() - 1);
        }
        setFocusStreak(currentStreak);
      }


      setWeeklyProgress(prev => {
        const newWeeklyProgress = [...prev];
        const todayIndex = newWeeklyProgress.findIndex(d => d.isToday);
        if (todayIndex !== -1) {
          newWeeklyProgress[todayIndex].count = newDailyCount;
        }
        return newWeeklyProgress;
      });

      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      const isLongBreak = newSessionCount > 0 && sessionsPerRound > 0 && newSessionCount % sessionsPerRound === 0;
      setIsCurrentBreakLong(isLongBreak);
      if (isLongBreak) {
        const randomQuote = LONG_BREAK_QUOTES[Math.floor(Math.random() * LONG_BREAK_QUOTES.length)];
        setLongBreakQuote(randomQuote);
      }
      setTimeLeft(isLongBreak ? longBreakDuration : breakDuration);
    } else {
      setIsCurrentBreakLong(false);
      setTimeLeft(focusDuration);
       // Check if the upcoming focus session is the last one before a long break
      const isNextFocusLastInRound = sessionsPerRound > 0 && (sessionCount) % sessionsPerRound === sessionsPerRound - 1;
      if (isNextFocusLastInRound && isLongBreakReminderSoundEnabled && reminderAudioRef.current.src) {
        reminderAudioRef.current.play().catch(console.error);
      }
    }
    setMode(nextMode);
  }, [mode, focusDuration, breakDuration, longBreakDuration, sessionCount, sessionsPerRound, dailySessionsCompleted, isLongBreakReminderSoundEnabled]);

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
    const audio = audioRef.current;
    if (isActive) { // about to pause
        fadeAudio(0, 500, () => audio.pause());
    } else { // about to play
        if (audio.src) {
            audio.volume = 0;
            audio.play().catch(error => {
                if (error.name !== 'AbortError') console.error("Audio play failed:", error);
            });
            fadeAudio(volume, 1000);
        }
    }
    setIsActive(!isActive);
  };
  
  const handleNext = () => {
    // 1. Stop the current timer interval.
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 2. If the timer was running, pause the audio.
    if (isActive) {
      audioRef.current.pause();
    }

    // 3. Set up the state for the next session (mode, timeLeft, etc.).
    switchMode();

    // 4. Set the timer to be active for the new session. This will be picked
    // up by the timer's useEffect to start the countdown.
    setIsActive(true);

    // 5. Explicitly start the audio for the new session.
    // This is needed because the audio useEffect might not trigger if the sound source doesn't change.
    const audio = audioRef.current;
    if (audio.src) { // Check if there is a sound source to play
      audio.volume = 0;
      audio.play().catch(error => {
        if (error.name !== 'AbortError') console.error("Audio play failed:", error);
      });
      fadeAudio(volume, 1000);
    }
  };
  
  const handleSaveSettings = (settings: { 
    focus: number, break: number, longBreak: number, sessionsPerRound: number, dailyGoal: number,
    sound: Sound, isCompletionSoundEnabled: boolean, completionSound: Sound,
    isLongBreakReminderSoundEnabled: boolean, longBreakReminderSound: Sound,
    focusBg: string, focusText: string, breakBg: string, breakText: string,
    longBreakBg: string, longBreakText: string,
  }) => {
    const newFocus = settings.focus * 60;
    const newBreak = settings.break * 60;
    const newLongBreak = settings.longBreak * 60;

    setFocusDuration(newFocus);
    setBreakDuration(newBreak);
    setLongBreakDuration(newLongBreak);
    setSessionsPerRound(settings.sessionsPerRound);
    setDailyGoal(settings.dailyGoal);
    setSelectedSound(settings.sound);
    setIsCompletionSoundEnabled(settings.isCompletionSoundEnabled);
    setSelectedCompletionSound(settings.completionSound);
    setIsLongBreakReminderSoundEnabled(settings.isLongBreakReminderSoundEnabled);
    setSelectedLongBreakReminderSound(settings.longBreakReminderSound);
    setFocusBgColor(settings.focusBg);
    setFocusTextColor(settings.focusText);
    setBreakBgColor(settings.breakBg);
    setBreakTextColor(settings.breakText);
    setLongBreakBgColor(settings.longBreakBg);
    setLongBreakTextColor(settings.longBreakText);
    setShowSettings(false);
    
    if (!isActive) {
      if (mode === 'focus') setTimeLeft(newFocus);
      else if (isCurrentBreakLong) setTimeLeft(newLongBreak);
      else setTimeLeft(newBreak);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(`Fullscreen Error: ${err.message}`));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, select, button')) {
          return;
      }
      if (event.code === 'Space') {
        event.preventDefault();
        toggleTimer();
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, toggleTimer, handleNext]);


  // Audio Management with preloading and error handling
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    // Add error handler
    const handleAudioError = (e: Event) => {
      console.error("Audio loading error:", e);
      setAudioError("无法加载音频文件，请检查网络连接或选择其他音频");
      setIsAudioLoading(false);
    };

    // Add loaded handler
    const handleAudioLoaded = () => {
      setIsAudioLoading(false);
      setAudioError(null);
    };

    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('canplaythrough', handleAudioLoaded);

    const changeSound = (newSound: Sound) => {
        fadeAudio(0, 500, () => {
            if (newSound.url) {
                setIsAudioLoading(true);
                setAudioError(null);
                audio.src = newSound.url;

                // Preload the audio
                audio.load();

                if (isActive) {
                    audio.volume = 0;
                    audio.play().catch(error => {
                        console.error("Audio play failed:", error);
                        setAudioError("音频播放失败，请尝试重新播放");
                        setIsAudioLoading(false);
                    });
                    fadeAudio(volume, 1000);
                }
            } else {
                audio.removeAttribute('src');
                setIsAudioLoading(false);
                setAudioError(null);
            }
        });
    }

    if(audio.src !== selectedSound.url) {
        changeSound(selectedSound);
    }

    return () => {
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('canplaythrough', handleAudioLoaded);
    };
  }, [selectedSound, isActive, volume, fadeAudio]);

  useEffect(() => {
    if (isActive) {
      fadeAudio(volume, 300);
    } else {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Preload completion sound
  useEffect(() => {
    const audio = completionAudioRef.current;
    if (selectedCompletionSound.url) {
      audio.src = selectedCompletionSound.url;
      audio.load(); // Preload
    }
  }, [selectedCompletionSound]);

  // Preload reminder sound
  useEffect(() => {
    const audio = reminderAudioRef.current;
    if (selectedLongBreakReminderSound.url) {
      audio.src = selectedLongBreakReminderSound.url;
      audio.load(); // Preload
    }
  }, [selectedLongBreakReminderSound]);


  const totalDuration = mode === 'focus' ? focusDuration : (isCurrentBreakLong ? longBreakDuration : breakDuration);
  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  
  const isLongBreakNext = mode === 'focus' && sessionsPerRound > 0 && (sessionCount + 1) % sessionsPerRound === 0;

  const isLongBreakMode = mode === 'break' && isCurrentBreakLong;
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
            // Long Break - Single Panel
            <div 
                className="w-full h-full transition-colors duration-500"
                style={{ backgroundColor: longBreakBgColor, color: longBreakTextColor }}
            >
                <TimerPanel
                    mode={'break'}
                    isActive={isActive}
                    timeLeft={timeLeft}
                    progress={progress}
                    bgColor="transparent"
                    textColor={longBreakTextColor}
                    isLongBreak={true}
                    quote={longBreakQuote}
                />
            </div>
          ) : (
            // Focus / Short Break - Split Screen
            <>
              <div 
                  className={`w-1/2 h-full transition-all duration-500 ${mode === 'break' ? 'opacity-50' : 'opacity-100'}`}
                  style={{ backgroundColor: focusBgColor, color: focusTextColor }}
              >
                  <TimerPanel
                      mode={'focus'}
                      isActive={isActive && mode === 'focus'}
                      timeLeft={mode === 'focus' ? timeLeft : focusDuration}
                      progress={mode === 'focus' ? progress : 0}
                      bgColor="transparent"
                      textColor={focusTextColor}
                      isLongBreak={false}
                  />
              </div>
              <div
                  className={`w-1/2 h-full transition-all duration-500 ${mode === 'focus' ? 'opacity-50' : 'opacity-100'}`}
                  style={{ backgroundColor: breakBgColor, color: breakTextColor }}
              >
                  <TimerPanel
                      mode={'break'}
                      isActive={isActive && mode === 'break'}
                      timeLeft={mode === 'break' ? timeLeft : breakDuration}
                      progress={mode === 'break' ? progress : 0}
                      bgColor="transparent"
                      textColor={breakTextColor}
                      isLongBreak={false}
                  />
              </div>
            </>
          )}
      </div>


      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
          {/* Audio error notification */}
          {audioError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm flex items-center justify-between">
              <span>{audioError}</span>
              <button
                onClick={() => setAudioError(null)}
                className="ml-2 text-red-600 hover:text-red-800 font-bold"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/* Audio loading indicator */}
          {isAudioLoading && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-sm">
              <span>正在加载音频...</span>
            </div>
          )}

          <Controls
              isActive={isActive}
              onToggle={toggleTimer}
              onNext={handleNext}
              volume={volume}
              onVolumeChange={setVolume}
              sessionCount={sessionCount}
              onSettingsClick={() => setShowSettings(true)}
              timeLeft={timeLeft}
              totalDuration={totalDuration}
              progress={progress}
              mode={mode}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              textColor={controlsTextColor}
              sessionsPerRound={sessionsPerRound}
              isLongBreakNext={isLongBreakNext}
          />
      </div>
       <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentSettings={{
          focus: focusDuration / 60,
          break: breakDuration / 60,
          longBreak: longBreakDuration / 60,
          sessionsPerRound: sessionsPerRound,
          dailyGoal: dailyGoal,
          sound: selectedSound,
          isCompletionSoundEnabled: isCompletionSoundEnabled,
          completionSound: selectedCompletionSound,
          isLongBreakReminderSoundEnabled: isLongBreakReminderSoundEnabled,
          longBreakReminderSound: selectedLongBreakReminderSound,
          focusBg: focusBgColor,
          focusText: focusTextColor,
          breakBg: breakBgColor,
          breakText: breakTextColor,
          longBreakBg: longBreakBgColor,
          longBreakText: longBreakTextColor,
        }}
      />
      <InfoModal 
        isOpen={showInfo} 
        onClose={() => setShowInfo(false)}
        dailyGoal={dailyGoal}
        dailySessionsCompleted={dailySessionsCompleted}
        weeklyProgress={weeklyProgress}
        totalSessions={totalSessions}
        focusStreak={focusStreak}
      />
    </div>
  );
}