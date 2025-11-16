import type { Sound, Achievement, SoundscapePreset } from './types';
import { SproutIcon, SevenDayIcon, MoonCycleIcon } from './components/Icons';

export const DEFAULT_FOCUS_MINUTES = 25;
export const DEFAULT_BREAK_MINUTES = 5;
export const DEFAULT_LONG_BREAK_MINUTES = 15;
export const DEFAULT_SESSIONS_PER_ROUND = 4;


export const SOUNDS: Sound[] = [
  { id: 'none', name: '无声 (None)', url: '' },
  { id: 'rain', name: '雨声 (Rain)', url: '/sounds/ambient/rain.ogg' },
  { id: 'thunder', name: '雷声 (Thunder)', url: '/sounds/ambient/thunder.ogg' },
  { id: 'ocean', name: '海洋 (Ocean)', url: '/sounds/ambient/ocean.ogg' },
  { id: 'waves', name: '海浪 (Waves)', url: '/sounds/ambient/waves.ogg' },
  { id: 'seagulls', name: '海鸥 (Seagulls)', url: '/sounds/ambient/seagulls.ogg' },
  { id: 'stream', name: '溪流 (Stream)', url: '/sounds/ambient/stream.ogg' },
  { id: 'forest', name: '森林 (Forest)', url: '/sounds/ambient/forest.ogg' },
  { id: 'birds', name: '鸟鸣 (Birds)', url: '/sounds/ambient/birds.ogg' },
  { id: 'crickets', name: '虫鸣 (Crickets)', url: '/sounds/ambient/crickets.ogg' },
  { id: 'wind', name: '风声 (Wind)', url: '/sounds/ambient/wind.ogg' },
  { id: 'fireplace', name: '壁炉 (Fireplace)', url: '/sounds/ambient/fireplace.ogg' },
  { id: 'campfire', name: '篝火 (Campfire)', url: '/sounds/ambient/campfire.ogg' },
  { id: 'night', name: '夜晚 (Night)', url: '/sounds/ambient/night.ogg' },
  { id: 'cafe', name: '咖啡店 (Cafe)', url: '/sounds/ambient/cafe.ogg' },
  { id: 'library', name: '图书馆 (Library)', url: '/sounds/ambient/library.ogg' },
  { id: 'wind_chimes', name: '风铃 (Wind Chimes)', url: '/sounds/ambient/wind-chimes.ogg' },
  { id: 'white_noise', name: '白噪音 (White Noise)', url: '/sounds/ambient/white-noise.ogg' },
];

// Sound categories for better organization
export const SOUND_CATEGORIES = [
  {
    id: 'water',
    name: '💧 水声',
    emoji: '💧',
    sounds: ['rain', 'thunder', 'ocean', 'waves', 'seagulls', 'stream']
  },
  {
    id: 'nature',
    name: '🌿 自然',
    emoji: '🌿',
    sounds: ['forest', 'birds', 'crickets', 'wind', 'night']
  },
  {
    id: 'fire',
    name: '🔥 火焰',
    emoji: '🔥',
    sounds: ['fireplace', 'campfire']
  },
  {
    id: 'urban',
    name: '🏙️ 城市',
    emoji: '🏙️',
    sounds: ['cafe', 'library']
  },
  {
    id: 'other',
    name: '🎵 其他',
    emoji: '🎵',
    sounds: ['wind_chimes', 'white_noise']
  }
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

export const SOUNDSCAPE_PRESETS: SoundscapePreset[] = [
  {
    id: 'rainy_forest',
    name: '🌧️ 雨夜森林',
    description: '雨声、雷声与森林的自然交响',
    sounds: [
      { id: 'rain', volume: 0.7 },
      { id: 'thunder', volume: 0.3 },
      { id: 'forest', volume: 0.5 },
    ]
  },
  {
    id: 'ocean_breeze',
    name: '🌊 海边微风',
    description: '海浪、海鸥与轻柔的风声',
    sounds: [
      { id: 'waves', volume: 0.8 },
      { id: 'seagulls', volume: 0.4 },
      { id: 'wind', volume: 0.3 },
    ]
  },
  {
    id: 'peaceful_stream',
    name: '🏞️ 溪边静谧',
    description: '溪流、鸟鸣与森林的和谐',
    sounds: [
      { id: 'stream', volume: 0.7 },
      { id: 'birds', volume: 0.5 },
      { id: 'forest', volume: 0.4 },
    ]
  },
  {
    id: 'cozy_evening',
    name: '🔥 温馨夜晚',
    description: '壁炉、虫鸣与夜晚的宁静',
    sounds: [
      { id: 'fireplace', volume: 0.7 },
      { id: 'crickets', volume: 0.5 },
      { id: 'night', volume: 0.3 },
    ]
  },
  {
    id: 'deep_ocean',
    name: '🐋 深海宁静',
    description: '海洋的深邃与平静',
    sounds: [
      { id: 'ocean', volume: 0.8 },
      { id: 'waves', volume: 0.4 },
    ]
  },
  {
    id: 'summer_night',
    name: '🌙 夏夜星空',
    description: '虫鸣、夜晚与轻柔的风',
    sounds: [
      { id: 'crickets', volume: 0.7 },
      { id: 'night', volume: 0.6 },
      { id: 'wind', volume: 0.3 },
    ]
  },
  {
    id: 'mountain_camp',
    name: '⛺ 山间营地',
    description: '篝火、溪流与夜晚的自然',
    sounds: [
      { id: 'campfire', volume: 0.7 },
      { id: 'stream', volume: 0.5 },
      { id: 'crickets', volume: 0.4 },
    ]
  },
  {
    id: 'urban_calm',
    name: '☕ 都市静谧',
    description: '咖啡店的温馨氛围',
    sounds: [
      { id: 'cafe', volume: 0.7 },
      { id: 'rain', volume: 0.3 },
    ]
  },
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
