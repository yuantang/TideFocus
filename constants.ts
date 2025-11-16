import type { Sound, Achievement } from './types';
import { SproutIcon, SevenDayIcon, MoonCycleIcon } from './components/Icons';

export const DEFAULT_FOCUS_MINUTES = 25;
export const DEFAULT_BREAK_MINUTES = 5;
export const DEFAULT_LONG_BREAK_MINUTES = 15;
export const DEFAULT_SESSIONS_PER_ROUND = 4;


export const SOUNDS: Sound[] = [
  { id: 'none', name: '无声 (None)', url: '' },
  { id: 'rain', name: '雨声 (Rain)', url: '/sounds/ambient/rain.ogg' },
  { id: 'forest', name: '森林 (Forest)', url: '/sounds/ambient/forest.ogg' },
  { id: 'cafe', name: '咖啡店 (Cafe)', url: '/sounds/ambient/cafe.ogg' },
  { id: 'fireplace', name: '壁炉 (Fireplace)', url: '/sounds/ambient/fireplace.ogg' },
  { id: 'ocean', name: '海洋 (Ocean)', url: '/sounds/ambient/ocean.ogg' },
  { id: 'wind_chimes', name: '风铃 (Wind Chimes)', url: '/sounds/ambient/wind-chimes.ogg' },
  { id: 'white_noise', name: '白噪音 (White Noise)', url: '/sounds/ambient/white-noise.ogg' },
  { id: 'library', name: '图书馆 (Library)', url: '/sounds/ambient/library.ogg' },
];

export const COMPLETION_SOUNDS: Sound[] = [
    { id: 'none', name: '无声 (None)', url: '' },
    { id: 'singing_bowl', name: '颂钵 (Singing Bowl)', url: '/sounds/completion/singing-bowl.ogg'},
    { id: 'bamboo_chime', name: '竹风铃 (Bamboo Chime)', url: '/sounds/completion/bamboo-chime.ogg'},
    { id: 'music_box', name: '音乐盒 (Music Box)', url: '/sounds/completion/music-box.ogg'}
];

export const REMINDER_SOUNDS: Sound[] = [
    { id: 'none', name: '无声 (None)', url: '' },
    { id: 'bell', name: '摇铃 (Bell)', url: '/sounds/reminder/bell.ogg'},
    { id: 'piano', name: '钢琴 (Piano)', url: '/sounds/reminder/piano.ogg'}
];

export const LONG_BREAK_QUOTES: string[] = [
    'Rest is not idleness.',
    'A pause is a part of the rhythm.',
    'Let your mind wander freely.',
    'Stillness is a form of action.',
    'Almost everything will work again if you unplug it for a few minutes, including you.',
    'Time relaxing is time well spent.'
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_session',
    name: 'First Bloom',
    description: 'Complete your first focus session.',
    icon: SproutIcon,
    condition: (stats) => stats.totalSessions >= 1,
  },
  {
    id: 'seven_day_streak',
    name: 'Weekly Ritual',
    description: 'Maintain a 7-day focus streak.',
    icon: SevenDayIcon,
    condition: (stats) => stats.focusStreak >= 7,
  },
  {
    id: 'daily_goal_met',
    name: 'Goal Achieved',
    description: 'Meet your daily goal for the first time.',
    icon: MoonCycleIcon,
    condition: (stats) => stats.dailyGoal > 0 && stats.dailySessionsCompleted >= stats.dailyGoal,
  },
];
