import React, { useState, useEffect } from 'react';
import type { Sound } from '../types';
import { SOUNDS, COMPLETION_SOUNDS, REMINDER_SOUNDS } from '../constants';
import { CloseIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: { 
    focus: number; break: number; longBreak: number; sessionsPerRound: number; dailyGoal: number;
    sound: Sound; isCompletionSoundEnabled: boolean; completionSound: Sound;
    isLongBreakReminderSoundEnabled: boolean; longBreakReminderSound: Sound;
    focusBg: string; focusText: string; breakBg: string; breakText: string;
    longBreakBg: string, longBreakText: string,
  }) => void;
  currentSettings: {
    focus: number; break: number; longBreak: number; sessionsPerRound: number; dailyGoal: number;
    sound: Sound; isCompletionSoundEnabled: boolean; completionSound: Sound;
    isLongBreakReminderSoundEnabled: boolean; longBreakReminderSound: Sound;
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
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`${label} color picker`}
        />
        <div className="w-full h-full" style={{ backgroundColor: value }} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-transparent border-l border-black/10 focus:outline-none"
        aria-label={`${label} hex code`}
      />
    </div>
  </div>
);


const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [focus, setFocus] = useState(currentSettings.focus);
  const [breakTime, setBreakTime] = useState(currentSettings.break);
  const [longBreak, setLongBreak] = useState(currentSettings.longBreak);
  const [sessionsPerRound, setSessionsPerRound] = useState(currentSettings.sessionsPerRound);
  const [dailyGoal, setDailyGoal] = useState(currentSettings.dailyGoal);
  const [sound, setSound] = useState(currentSettings.sound);
  const [isCompletionSoundEnabled, setIsCompletionSoundEnabled] = useState(currentSettings.isCompletionSoundEnabled);
  const [completionSound, setCompletionSound] = useState(currentSettings.completionSound);
  const [isLongBreakReminderSoundEnabled, setIsLongBreakReminderSoundEnabled] = useState(currentSettings.isLongBreakReminderSoundEnabled);
  const [longBreakReminderSound, setLongBreakReminderSound] = useState(currentSettings.longBreakReminderSound);
  const [focusBg, setFocusBg] = useState(currentSettings.focusBg);
  const [focusText, setFocusText] = useState(currentSettings.focusText);
  const [breakBg, setBreakBg] = useState(currentSettings.breakBg);
  const [breakText, setBreakText] = useState(currentSettings.breakText);
  const [longBreakBg, setLongBreakBg] = useState(currentSettings.longBreakBg);
  const [longBreakText, setLongBreakText] = useState(currentSettings.longBreakText);


  useEffect(() => {
    if (isOpen) {
      setFocus(currentSettings.focus);
      setBreakTime(currentSettings.break);
      setLongBreak(currentSettings.longBreak);
      setSessionsPerRound(currentSettings.sessionsPerRound);
      setDailyGoal(currentSettings.dailyGoal);
      setSound(currentSettings.sound);
      setIsCompletionSoundEnabled(currentSettings.isCompletionSoundEnabled);
      setCompletionSound(currentSettings.completionSound);
      setIsLongBreakReminderSoundEnabled(currentSettings.isLongBreakReminderSoundEnabled);
      setLongBreakReminderSound(currentSettings.longBreakReminderSound);
      setFocusBg(currentSettings.focusBg);
      setFocusText(currentSettings.focusText);
      setBreakBg(currentSettings.breakBg);
      setBreakText(currentSettings.breakText);
      setLongBreakBg(currentSettings.longBreakBg);
      setLongBreakText(currentSettings.longBreakText);
    }
  }, [currentSettings, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ focus, break: breakTime, longBreak, sessionsPerRound, dailyGoal, sound, isCompletionSoundEnabled, completionSound, isLongBreakReminderSoundEnabled, longBreakReminderSound, focusBg, focusText, breakBg, breakText, longBreakBg, longBreakText });
  };
  
  const applyTheme = (theme: typeof PRESET_THEMES[0]) => {
    setFocusBg(theme.focusBg);
    setFocusText(theme.focusText);
    setBreakBg(theme.breakBg);
    setBreakText(theme.breakText);
    setLongBreakBg(theme.longBreakBg);
    setLongBreakText(theme.longBreakText);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-md relative max-h-full overflow-y-auto" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100" aria-label="Close settings">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
        
        <div className="space-y-6">
          
          <div>
            <h3 className="text-md font-semibold opacity-80 text-center mb-3">Timers & Goals</h3>
            <div className="space-y-4 bg-black/5 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="focus-time" className="block text-sm font-medium mb-1">Focus Time</label>
                        <input id="focus-time" type="number" min="1" max="120" value={focus} onChange={(e) => setFocus(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                    <div>
                    <label htmlFor="break-time" className="block text-sm font-medium mb-1">Short Break</label>
                    <input id="break-time" type="number" min="1" max="60" value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="long-break-time" className="block text-sm font-medium mb-1">Long Break</label>
                        <input id="long-break-time" type="number" min="1" max="60" value={longBreak} onChange={(e) => setLongBreak(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                    <div>
                        <label htmlFor="daily-goal" className="block text-sm font-medium mb-1">Daily Goal</label>
                        <input id="daily-goal" type="number" min="0" max="24" value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                    </div>
                </div>
                <div>
                    <label htmlFor="sessions-round" className="block text-sm font-medium mb-1">Sessions per Round</label>
                     <p className="text-xs opacity-60 mb-1">The number of focus sessions before a long break. Set to 0 to disable long breaks.</p>
                    <input id="sessions-round" type="number" min="0" max="12" value={sessionsPerRound} onChange={(e) => setSessionsPerRound(Number(e.target.value))} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]" />
                </div>
            </div>
          </div>
          
          <div>
             <h3 className="text-md font-semibold opacity-80 text-center mb-3">Sounds</h3>
             <div className="space-y-4 bg-black/5 p-4 rounded-lg">
                <div>
                    <label htmlFor="sound" className="block text-sm font-medium mb-1">Ambient Sound</label>
                    <select id="sound" value={sound.id} onChange={(e) => setSound(SOUNDS.find(s => s.id === e.target.value) || SOUNDS[0])} className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5a5a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                        {SOUNDS.map(s => <option key={s.id} value={s.id} style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="completion-sound-toggle" className="block text-sm font-medium">Completion Sound</label>
                        <input type="checkbox" id="completion-sound-toggle" checked={isCompletionSoundEnabled} onChange={e => setIsCompletionSoundEnabled(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#6b5a5a] focus:ring-[#6b5a5a]" />
                    </div>
                    <select id="completion-sound" value={completionSound.id} onChange={(e) => setCompletionSound(COMPLETION_SOUNDS.find(s => s.id === e.target.value) || COMPLETION_SOUNDS[0])} disabled={!isCompletionSoundEnabled} className={`w-full px-3 py-2 mt-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] appearance-none transition-opacity ${!isCompletionSoundEnabled && 'opacity-50'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5a5a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                        {COMPLETION_SOUNDS.map(s => <option key={s.id} value={s.id} style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="reminder-sound-toggle" className="block text-sm font-medium">Long Break Reminder</label>
                        <input type="checkbox" id="reminder-sound-toggle" checked={isLongBreakReminderSoundEnabled} onChange={e => setIsLongBreakReminderSoundEnabled(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#6b5a5a] focus:ring-[#6b5a5a]" />
                    </div>
                    <p className="text-xs opacity-60 mt-1">Plays a sound at the start of the focus session before a long break.</p>
                    <select id="reminder-sound" value={longBreakReminderSound.id} onChange={(e) => setLongBreakReminderSound(REMINDER_SOUNDS.find(s => s.id === e.target.value) || REMINDER_SOUNDS[0])} disabled={!isLongBreakReminderSoundEnabled} className={`w-full px-3 py-2 mt-2 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] appearance-none transition-opacity ${!isLongBreakReminderSoundEnabled && 'opacity-50'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5a5a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                        {REMINDER_SOUNDS.map(s => <option key={s.id} value={s.id} style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>{s.name}</option>)}
                    </select>
                </div>
             </div>
          </div>
        
          <div>
            <h3 className="text-md font-semibold opacity-80 text-center mb-3">Color Themes</h3>
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
                    <button
                        onClick={() => applyTheme(PRESET_THEMES[0])}
                        className="text-xs opacity-70 hover:opacity-100 transition-opacity underline"
                    >
                        Reset to Default
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                        <ColorInput label="Focus BG" value={focusBg} onChange={setFocusBg} />
                        <ColorInput label="Focus Text" value={focusText} onChange={setFocusText} />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <ColorInput label="Break BG" value={breakBg} onChange={setBreakBg} />
                        <ColorInput label="Break Text" value={breakText} onChange={setBreakText} />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <ColorInput label="Long Break BG" value={longBreakBg} onChange={setLongBreakBg} />
                        <ColorInput label="Long Break Text" value={longBreakText} onChange={setLongBreakText} />
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={handleSave} className="bg-black/10 text-current font-bold py-2 px-6 rounded-lg hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b5a5a] focus:ring-offset-[#fdf6f6] transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;