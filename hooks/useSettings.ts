import { useState, useEffect } from 'react';

export const useSettings = () => {
  // 时间设置
  const [focusDuration, setFocusDuration] = useState(Number(localStorage.getItem('focusDuration')) || 1500);
  const [breakDuration, setBreakDuration] = useState(Number(localStorage.getItem('breakDuration')) || 300);
  const [longBreakDuration, setLongBreakDuration] = useState(Number(localStorage.getItem('longBreakDuration')) || 900);
  const [sessionsPerRound, setSessionsPerRound] = useState(Number(localStorage.getItem('sessionsPerRound')) || 4);
  const [dailyGoal, setDailyGoal] = useState(Number(localStorage.getItem('dailyGoal')) || 8);

  // 功能设置
  const [isBreathingGuideEnabled, setIsBreathingGuideEnabled] = useState(localStorage.getItem('isBreathingGuideEnabled') === 'true');
  const [isDesktopNotificationsEnabled, setIsDesktopNotificationsEnabled] = useState(localStorage.getItem('isDesktopNotificationsEnabled') === 'true');

  // 音频设置
  const [masterVolume, setMasterVolume] = useState(Number(localStorage.getItem('masterVolume') ?? 0.5));
  const [isMuted, setIsMuted] = useState(localStorage.getItem('isMuted') === 'true');
  const [activeSounds, setActiveSounds] = useState<any[]>(JSON.parse(localStorage.getItem('activeSounds') || '[]'));
  const [isCompletionSoundEnabled, setIsCompletionSoundEnabled] = useState(localStorage.getItem('isCompletionSoundEnabled') === 'true');
  const [selectedCompletionSoundId, setSelectedCompletionSoundId] = useState(localStorage.getItem('selectedCompletionSoundId') || 'bell');

  // 主题设置
  const [focusBgColor, setFocusBgColor] = useState(localStorage.getItem('focusBgColor') || '#f8e0e0');
  const [focusTextColor, setFocusTextColor] = useState(localStorage.getItem('focusTextColor') || '#6b5a5a');
  const [breakBgColor, setBreakBgColor] = useState(localStorage.getItem('breakBgColor') || '#fdf6f6');
  const [breakTextColor, setBreakTextColor] = useState(localStorage.getItem('breakTextColor') || '#6b5a5a');
  const [longBreakBgColor, setLongBreakBgColor] = useState(localStorage.getItem('longBreakBgColor') || '#f5efef');
  const [longBreakTextColor, setLongBreakTextColor] = useState(localStorage.getItem('longBreakTextColor') || '#6b5a5a');

  // 持久化设置
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
  useEffect(() => { localStorage.setItem('selectedCompletionSoundId', selectedCompletionSoundId) }, [selectedCompletionSoundId]);
  useEffect(() => { localStorage.setItem('focusBgColor', focusBgColor) }, [focusBgColor]);
  useEffect(() => { localStorage.setItem('focusTextColor', focusTextColor) }, [focusTextColor]);
  useEffect(() => { localStorage.setItem('breakBgColor', breakBgColor) }, [breakBgColor]);
  useEffect(() => { localStorage.setItem('breakTextColor', breakTextColor) }, [breakTextColor]);
  useEffect(() => { localStorage.setItem('longBreakBgColor', longBreakBgColor) }, [longBreakBgColor]);
  useEffect(() => { localStorage.setItem('longBreakTextColor', longBreakTextColor) }, [longBreakTextColor]);

  return {
    // 时间设置
    focusDuration,
    setFocusDuration,
    breakDuration,
    setBreakDuration,
    longBreakDuration,
    setLongBreakDuration,
    sessionsPerRound,
    setSessionsPerRound,
    dailyGoal,
    setDailyGoal,
    
    // 功能设置
    isBreathingGuideEnabled,
    setIsBreathingGuideEnabled,
    isDesktopNotificationsEnabled,
    setIsDesktopNotificationsEnabled,
    
    // 音频设置
    masterVolume,
    setMasterVolume,
    isMuted,
    setIsMuted,
    activeSounds,
    setActiveSounds,
    isCompletionSoundEnabled,
    setIsCompletionSoundEnabled,
    selectedCompletionSoundId,
    setSelectedCompletionSoundId,
    
    // 主题设置
    focusBgColor,
    setFocusBgColor,
    focusTextColor,
    setFocusTextColor,
    breakBgColor,
    setBreakBgColor,
    breakTextColor,
    setBreakTextColor,
    longBreakBgColor,
    setLongBreakBgColor,
    longBreakTextColor,
    setLongBreakTextColor
  };
};

