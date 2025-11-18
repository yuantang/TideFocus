import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Sound, ActiveSound } from '../types';
import { getLocalizedSounds, getLocalizedCompletionSounds, getLocalizedSoundscapePresets, getLocalizedSoundCategories } from '../constants';
import { CloseIcon, PlayIcon, PauseIcon } from './Icons';
import { getTranslations, getCurrentLanguage, setLanguage, type Language } from '../i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
  currentSettings: {
    focus: number; break: number; longBreak: number; sessionsPerRound: number; dailyGoal: number;
    isBreathingGuideEnabled: boolean; isDesktopNotificationsEnabled: boolean;
    activeSounds: ActiveSound[]; isCompletionSoundEnabled: boolean; completionSound: Sound;
    focusBg: string; focusText: string; breakBg: string; breakText: string;
    longBreakBg: string, longBreakText: string,
  };
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const PRESET_THEMES = [
    { name: 'Rose', focusBg: '#f8e0e0', focusText: '#6b5a5a', breakBg: '#fdf6f6', breakText: '#6b5a5a', longBreakBg: '#f5efef', longBreakText: '#6b5a5a' },
    { name: 'Forest', focusBg: '#e4f1e4', focusText: '#4a5c4a', breakBg: '#f6f9f6', breakText: '#4a5c4a', longBreakBg: '#f2f7f2', longBreakText: '#4a5c4a' },
    { name: 'Sky', focusBg: '#e0f2f8', focusText: '#5a6b7a', breakBg: '#f6fdff', breakText: '#5a6b7a', longBreakBg: '#f2faff', longBreakText: '#5a6b7a' },
    { name: 'Dusk', focusBg: '#2c3e50', focusText: '#ecf0f1', breakBg: '#34495e', breakText: '#ecf0f1', longBreakBg: '#4a637f', longBreakText: '#ecf0f1' },
];

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-center">{label}</label>
    <div className="flex items-center border border-black/10 rounded-md bg-white/50 overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#fdf6f6] focus-within:ring-[#6b5a5a]">
      <div className="relative w-10 h-10 flex-shrink-0">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label={`${label} color picker`} />
        <div className="w-full h-full" style={{ backgroundColor: value }} />
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-transparent border-l border-black/10 focus:outline-none" aria-label={`${label} hex code`} />
    </div>
  </div>
);


const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentSettings }) => {
  const t = getTranslations();
  const SOUNDS = getLocalizedSounds();
  const COMPLETION_SOUNDS = getLocalizedCompletionSounds();
  const SOUND_CATEGORIES = getLocalizedSoundCategories();

  const [focus, setFocus] = useState(currentSettings.focus);
  const [breakTime, setBreakTime] = useState(currentSettings.break);
  const [longBreak, setLongBreak] = useState(currentSettings.longBreak);
  const [sessionsPerRound, setSessionsPerRound] = useState(currentSettings.sessionsPerRound);
  const [dailyGoal, setDailyGoal] = useState(currentSettings.dailyGoal);
  const [isBreathingGuideEnabled, setIsBreathingGuideEnabled] = useState(currentSettings.isBreathingGuideEnabled);
  const [isDesktopNotificationsEnabled, setIsDesktopNotificationsEnabled] = useState(currentSettings.isDesktopNotificationsEnabled);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getCurrentLanguage());
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>(currentSettings.activeSounds);
  const [isCompletionSoundEnabled, setIsCompletionSoundEnabled] = useState(currentSettings.isCompletionSoundEnabled);
  const [completionSound, setCompletionSound] = useState(currentSettings.completionSound);
  const [focusBg, setFocusBg] = useState(currentSettings.focusBg);
  const [focusText, setFocusText] = useState(currentSettings.focusText);
  const [breakBg, setBreakBg] = useState(currentSettings.breakBg);
  const [breakText, setBreakText] = useState(currentSettings.breakText);
  const [longBreakBg, setLongBreakBg] = useState(currentSettings.longBreakBg);
  const [longBreakText, setLongBreakText] = useState(currentSettings.longBreakText);

  // Audio preview state
  const [previewingSound, setPreviewingSound] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Category expansion state
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showCustomMix, setShowCustomMix] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFocus(currentSettings.focus);
      setBreakTime(currentSettings.break);
      setLongBreak(currentSettings.longBreak);
      setSessionsPerRound(currentSettings.sessionsPerRound);
      setDailyGoal(currentSettings.dailyGoal);
      setIsBreathingGuideEnabled(currentSettings.isBreathingGuideEnabled);
      setIsDesktopNotificationsEnabled(currentSettings.isDesktopNotificationsEnabled);
      setActiveSounds(currentSettings.activeSounds);
      setIsCompletionSoundEnabled(currentSettings.isCompletionSoundEnabled);
      setCompletionSound(currentSettings.completionSound);
      setFocusBg(currentSettings.focusBg);
      setFocusText(currentSettings.focusText);
      setBreakBg(currentSettings.breakBg);
      setBreakText(currentSettings.breakText);
      setLongBreakBg(currentSettings.longBreakBg);
      setLongBreakText(currentSettings.longBreakText);
    }
  }, [currentSettings, isOpen]);
  
  const handleToggleNotification = (enabled: boolean) => {
      setIsDesktopNotificationsEnabled(enabled);
      if (enabled && Notification.permission !== 'granted') {
          Notification.requestPermission().then(permission => {
              if (permission !== 'granted') {
                  setIsDesktopNotificationsEnabled(false);
              }
          });
      }
  };

  const handleSoundToggle = (soundId: string, isEnabled: boolean) => {
    if (isEnabled) {
      setActiveSounds(prev => [...prev, { id: soundId, volume: 0.5 }]);
    } else {
      setActiveSounds(prev => prev.filter(s => s.id !== soundId));
    }
  };

  const handleSoundVolumeChange = (soundId: string, volume: number) => {
    setActiveSounds(prev => prev.map(s => s.id === soundId ? { ...s, volume } : s));
  };

  // Apply soundscape preset
  const applyPreset = (presetId: string) => {
    const SOUNDSCAPE_PRESETS = getLocalizedSoundscapePresets();
    const preset = SOUNDSCAPE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setActiveSounds(preset.sounds);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Audio preview functions
  const stopPreview = useCallback(() => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
      previewAudioRef.current = null;
    }
    setPreviewingSound(null);
  }, []);

  const playPreview = useCallback((sound: Sound, isLoop: boolean = false) => {
    stopPreview();
    if (sound.url) {
      const audio = new Audio(sound.url);
      audio.loop = isLoop;
      audio.volume = 0.5;
      audio.play().catch(console.error);
      previewAudioRef.current = audio;
      setPreviewingSound(sound.id);

      if (!isLoop) {
        audio.onended = () => {
          setPreviewingSound(null);
          previewAudioRef.current = null;
        };
      }
    }
  }, [stopPreview]);

  const togglePreview = useCallback((sound: Sound, isLoop: boolean = false) => {
    if (previewingSound === sound.id) {
      stopPreview();
    } else {
      playPreview(sound, isLoop);
    }
  }, [previewingSound, stopPreview, playPreview]);

  // Stop preview when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopPreview();
    }
  }, [isOpen, stopPreview]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ focus, break: breakTime, longBreak, sessionsPerRound, dailyGoal, isBreathingGuideEnabled, isDesktopNotificationsEnabled, activeSounds, isCompletionSoundEnabled, completionSound, focusBg, focusText, breakBg, breakText, longBreakBg, longBreakText });
  };
  
  const applyTheme = (theme: typeof PRESET_THEMES[0]) => {
    setFocusBg(theme.focusBg);
    setFocusText(theme.focusText);
    setBreakBg(theme.breakBg);
    setBreakText(theme.breakText);
    setLongBreakBg(theme.longBreakBg);
    setLongBreakText(theme.longBreakText);
  }

  const handleLanguageChange = (lang: Language) => {
    console.log('🌍 [Language Change] Starting language change to:', lang);
    console.log('🌍 [Language Change] Current language before change:', getCurrentLanguage());
    console.log('🌍 [Language Change] localStorage before change:', localStorage.getItem('language'));

    // 保存语言设置
    setCurrentLanguage(lang);
    setLanguage(lang);

    console.log('🌍 [Language Change] localStorage after setLanguage:', localStorage.getItem('language'));
    console.log('🌍 [Language Change] Reloading page in 200ms...');

    // 使用 setTimeout 确保 localStorage 已保存，并使用硬刷新
    setTimeout(() => {
      console.log('🌍 [Language Change] Final check - localStorage:', localStorage.getItem('language'));
      // 使用 location.href 强制刷新，避免 HMR 干扰
      window.location.href = window.location.href;
    }, 200);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-md relative max-h-full overflow-y-auto" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100" aria-label="Close settings">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{t.settings.title}</h2>

        <div className="space-y-6">
          {/* Language Selector */}
          <div>
            <h3 className="text-md font-semibold opacity-80 text-center mb-3">🌍 {t.settings.language}</h3>
            <div className="bg-black/5 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleLanguageChange('zh-CN')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'zh-CN'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🇨🇳 简体中文
                </button>
                <button
                  onClick={() => handleLanguageChange('zh-TW')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'zh-TW'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🏝️ 繁體中文
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'en'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'es'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🇪🇸 Español
                </button>
                <button
                  onClick={() => handleLanguageChange('ja')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'ja'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🇯🇵 日本語
                </button>
                <button
                  onClick={() => handleLanguageChange('ko')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === 'ko'
                      ? 'bg-[#6b5a5a] text-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  🇰🇷 한국어
                </button>
              </div>
              <p className="text-xs opacity-60 text-center mt-3">
                {t.settings.languageReloadHint}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.settings.timer}</h3>
            <div className="space-y-4 bg-black/5 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="focus-time" className="block text-sm font-medium mb-1">{t.settings.focusDuration}</label>
                        <input id="focus-time" type="number" min="1" max="120" value={focus} onChange={(e) => setFocus(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                    <div>
                    <label htmlFor="break-time" className="block text-sm font-medium mb-1">{t.settings.breakDuration}</label>
                    <input id="break-time" type="number" min="1" max="60" value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="long-break-time" className="block text-sm font-medium mb-1">{t.settings.longBreakDuration}</label>
                        <input id="long-break-time" type="number" min="1" max="60" value={longBreak} onChange={(e) => setLongBreak(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                    <div>
                        <label htmlFor="daily-goal" className="block text-sm font-medium mb-1">{t.settings.dailyGoal}</label>
                        <input id="daily-goal" type="number" min="0" max="24" value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                </div>
                <div>
                    <label htmlFor="sessions-round" className="block text-sm font-medium mb-1">{t.settings.sessionsPerRound}</label>
                     <p className="text-xs opacity-60 mb-1">{t.settings.sessionsPerRoundHint}</p>
                    <input id="sessions-round" type="number" min="0" max="12" value={sessionsPerRound} onChange={(e) => setSessionsPerRound(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                </div>
                 <div className="flex items-center justify-between pt-2">
                    <label htmlFor="breathing-guide-toggle" className="block text-sm font-medium">{t.settings.breathingGuide}</label>
                    <input type="checkbox" id="breathing-guide-toggle" checked={isBreathingGuideEnabled} onChange={e => setIsBreathingGuideEnabled(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#6b5a5a] focus:ring-[#6b5a5a]" />
                </div>
                <div className="flex items-center justify-between pt-2">
                    <label htmlFor="desktop-notifications-toggle" className="block text-sm font-medium">{t.settings.desktopNotifications}</label>
                    <input type="checkbox" id="desktop-notifications-toggle" checked={isDesktopNotificationsEnabled} onChange={e => handleToggleNotification(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#6b5a5a] focus:ring-[#6b5a5a]" />
                </div>
            </div>
          </div>
          
          <div>
             <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.settings.soundscape}</h3>
             <div className="space-y-3 bg-black/5 p-4 rounded-lg">
                {/* Preset Selector */}
                <div className="pb-3 border-b border-black/10">
                  <label className="block text-sm font-medium mb-2 text-center opacity-70">{t.settings.presets}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {getLocalizedSoundscapePresets().map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset.id)}
                        className="px-2 py-1.5 text-xs bg-white/50 hover:bg-white/80 border border-black/10 rounded-md transition-colors text-left"
                        title={preset.description}
                      >
                        <div className="font-medium text-[11px]">{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Sounds - Quick Access */}
                {activeSounds.length > 0 && (
                  <div className="pb-3 border-b border-black/10">
                    <label className="block text-xs font-medium mb-2 opacity-70">{t.settings.currentMix} ({activeSounds.length})</label>
                    <div className="space-y-2">
                      {activeSounds.map(activeSound => {
                        const sound = SOUNDS.find(s => s.id === activeSound.id);
                        if (!sound || sound.id === 'none') return null;
                        const isPreviewing = previewingSound === sound.id;
                        return (
                          <div key={sound.id} className="bg-white/30 rounded-md p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <button
                                onClick={() => togglePreview(sound, true)}
                                className="p-1 hover:bg-black/10 rounded transition-colors flex-shrink-0"
                                aria-label={isPreviewing ? 'Stop' : 'Play'}
                              >
                                {isPreviewing ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
                              </button>
                              <span className="text-xs font-medium flex-grow">{sound.name}</span>
                              <button
                                onClick={() => handleSoundToggle(sound.id, false)}
                                className="text-xs opacity-60 hover:opacity-100 px-1"
                                aria-label="Remove"
                              >
                                ✕
                              </button>
                            </div>
                            <input
                              type="range" min="0" max="1" step="0.01"
                              value={activeSound.volume}
                              onChange={e => handleSoundVolumeChange(sound.id, Number(e.target.value))}
                              className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer"
                              style={{ background: `linear-gradient(to right, ${TEXT_COLOR} ${activeSound.volume * 100}%, rgba(0,0,0,0.1) ${activeSound.volume * 100}%)`}}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add More Sounds - Categorized */}
                <div>
                  <button
                    onClick={() => setShowCustomMix(!showCustomMix)}
                    className="w-full flex items-center justify-center gap-2 text-xs font-medium py-2.5 px-3 bg-white/40 hover:bg-white/60 border border-black/10 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span className="opacity-80">{showCustomMix ? t.settings.hideLibrary : t.settings.browseLibrary}</span>
                    <svg className={`w-3 h-3 transition-transform ${showCustomMix ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showCustomMix && (
                    <div className="mt-2 space-y-2">
                      {SOUND_CATEGORIES.map(category => {
                        const categorySounds = SOUNDS.filter(s => category.sounds.includes(s.id));
                        const isExpanded = expandedCategories.has(category.id);
                        const activeCategoryCount = categorySounds.filter(s => activeSounds.some(as => as.id === s.id)).length;

                        return (
                          <div key={category.id} className="border border-black/10 rounded-lg overflow-hidden bg-white/20">
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="w-full flex items-center justify-between px-3 py-2.5 bg-white/30 hover:bg-white/50 transition-colors text-left"
                            >
                              <span className="text-xs font-medium flex items-center gap-1.5">
                                <span className="text-base">{category.emoji}</span>
                                <span>{category.name.split(' ')[1]}</span>
                                {activeCategoryCount > 0 && (
                                  <span className="ml-0.5 px-1.5 py-0.5 bg-black/15 rounded-full text-[9px] font-semibold">
                                    {activeCategoryCount}
                                  </span>
                                )}
                              </span>
                              <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>

                            {isExpanded && (
                              <div className="p-2.5 bg-white/10 grid grid-cols-2 gap-2">
                                {categorySounds.map(sound => {
                                  const isEnabled = activeSounds.some(s => s.id === sound.id);
                                  const isPreviewing = previewingSound === sound.id;
                                  return (
                                    <button
                                      key={sound.id}
                                      onClick={() => handleSoundToggle(sound.id, !isEnabled)}
                                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md text-left transition-all ${
                                        isEnabled
                                          ? 'bg-[#6b5a5a]/20 border border-[#6b5a5a]/30 shadow-sm'
                                          : 'bg-white/60 hover:bg-white/80 border border-black/5 hover:border-black/10'
                                      }`}
                                    >
                                      {sound.url && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            togglePreview(sound, true);
                                          }}
                                          className={`p-1 rounded-full flex-shrink-0 transition-colors ${
                                            isPreviewing
                                              ? 'bg-[#6b5a5a]/20 hover:bg-[#6b5a5a]/30'
                                              : 'hover:bg-black/10'
                                          }`}
                                          aria-label={isPreviewing ? 'Stop' : 'Play'}
                                        >
                                          {isPreviewing ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
                                        </button>
                                      )}
                                      <span className="text-[10px] leading-tight flex-grow font-medium">
                                        {sound.name.split('(')[0].trim()}
                                      </span>
                                      {isEnabled && (
                                        <svg className="w-3 h-3 text-[#6b5a5a]" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Completion Sound */}
                <div className="border-t border-black/10 pt-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <label htmlFor="completion-sound-toggle" className="block text-xs font-medium opacity-70">{t.settings.completionSound}</label>
                        <input type="checkbox" id="completion-sound-toggle" checked={isCompletionSoundEnabled} onChange={e => setIsCompletionSoundEnabled(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#6b5a5a] focus:ring-[#6b5a5a]" />
                    </div>
                    <div className="flex items-center gap-2">
                        <select id="completion-sound" value={completionSound.id} onChange={(e) => setCompletionSound(COMPLETION_SOUNDS.find(s => s.id === e.target.value) || COMPLETION_SOUNDS[0])} disabled={!isCompletionSoundEnabled} className={`flex-grow px-2 py-1.5 text-xs bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] appearance-none transition-opacity ${!isCompletionSoundEnabled && 'opacity-50'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5a5a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                            {COMPLETION_SOUNDS.map(s => <option key={s.id} value={s.id} style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>{s.name}</option>)}
                        </select>
                        {completionSound.url && isCompletionSoundEnabled && (
                            <button
                                onClick={() => togglePreview(completionSound, false)}
                                className="p-1.5 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
                                aria-label={previewingSound === completionSound.id ? 'Stop' : 'Play'}
                            >
                                {previewingSound === completionSound.id ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                </div>
             </div>
          </div>
        
          <div>
            <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.settings.theme}</h3>
            <div className="bg-black/5 p-4 rounded-lg">
                <div className="flex justify-center gap-3 mb-2">
                    {PRESET_THEMES.map(theme => (
                        <button key={theme.name} onClick={() => applyTheme(theme)} className="w-12 h-8 rounded-lg border-2 border-black/10 flex overflow-hidden" aria-label={`Apply ${theme.name} theme`}>
                            <span className="w-1/3 h-full" style={{backgroundColor: theme.focusBg}}></span>
                            <span className="w-1/3 h-full" style={{backgroundColor: theme.breakBg}}></span>
                            <span className="w-1/3 h-full" style={{backgroundColor: theme.longBreakBg}}></span>
                        </button>
                    ))}
                </div>
                <div className="text-center mb-4">
                    <button onClick={() => applyTheme(PRESET_THEMES[0])} className="text-xs opacity-70 hover:opacity-100 transition-opacity underline">{t.settings.resetTheme}</button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4"><ColorInput label={t.settings.focusBg} value={focusBg} onChange={setFocusBg} /><ColorInput label={t.settings.focusText} value={focusText} onChange={setFocusText} /></div>
                    <div className="grid grid-cols-2 gap-x-4"><ColorInput label={t.settings.breakBg} value={breakBg} onChange={setBreakBg} /><ColorInput label={t.settings.breakText} value={breakText} onChange={setBreakText} /></div>
                    <div className="grid grid-cols-2 gap-x-4"><ColorInput label={t.settings.longBreakBg} value={longBreakBg} onChange={setLongBreakBg} /><ColorInput label={t.settings.longBreakText} value={longBreakText} onChange={setLongBreakText} /></div>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={handleSave} className="bg-black/10 text-current font-bold py-2 px-6 rounded-lg hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b5a5a] focus:ring-offset-[#fdf6f6] transition-colors">
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;