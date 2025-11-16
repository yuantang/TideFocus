import type { Sound, Achievement, SoundscapePreset } from './types';
import {
  SproutIcon,
  SevenDayIcon,
  MoonCycleIcon,
  TreeIcon,
  FlameIcon,
  DiamondIcon,
  TargetIcon,
  OwlIcon,
  BirdIcon,
  RunnerIcon,
  CalendarCheckIcon,
  CheckSquareIcon,
  BrainIcon
} from './components/Icons';

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
  // 基础成就
  {
    id: 'first_session',
    name: 'First Bloom',
    description: '完成第一次专注',
    icon: SproutIcon,
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 1,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 1),
      total: 1,
      percentage: Math.min(stats.totalSessions, 1) * 100
    })
  },

  // 专注次数成就
  {
    id: 'growing_strong',
    name: '🌱 Growing Strong',
    description: '完成 10 次专注',
    icon: '🌱',
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 10,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 10),
      total: 10,
      percentage: (Math.min(stats.totalSessions, 10) / 10) * 100
    })
  },
  {
    id: 'flourishing',
    name: '🌿 Flourishing',
    description: '完成 50 次专注',
    icon: '🌿',
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 50,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 50),
      total: 50,
      percentage: (Math.min(stats.totalSessions, 50) / 50) * 100
    })
  },
  {
    id: 'century',
    name: '🌳 Century',
    description: '完成 100 次专注',
    icon: TreeIcon,
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 100,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 100),
      total: 100,
      percentage: (Math.min(stats.totalSessions, 100) / 100) * 100
    })
  },

  // 连续专注成就
  {
    id: 'three_day_streak',
    name: '🔥 Three Days',
    description: '连续 3 天专注',
    icon: FlameIcon,
    category: 'streak',
    condition: (stats) => stats.focusStreak >= 3,
    progress: (stats) => ({
      current: Math.min(stats.focusStreak, 3),
      total: 3,
      percentage: (Math.min(stats.focusStreak, 3) / 3) * 100
    })
  },
  {
    id: 'seven_day_streak',
    name: 'Weekly Ritual',
    description: '连续 7 天专注',
    icon: SevenDayIcon,
    category: 'streak',
    condition: (stats) => stats.focusStreak >= 7,
    progress: (stats) => ({
      current: Math.min(stats.focusStreak, 7),
      total: 7,
      percentage: (Math.min(stats.focusStreak, 7) / 7) * 100
    })
  },
  {
    id: 'monthly_master',
    name: '💎 Monthly Master',
    description: '连续 30 天专注',
    icon: DiamondIcon,
    category: 'streak',
    condition: (stats) => stats.focusStreak >= 30,
    progress: (stats) => ({
      current: Math.min(stats.focusStreak, 30),
      total: 30,
      percentage: (Math.min(stats.focusStreak, 30) / 30) * 100
    })
  },

  // 目标达成成就
  {
    id: 'daily_goal_met',
    name: 'Goal Achieved',
    description: '首次达成每日目标',
    icon: MoonCycleIcon,
    category: 'streak',
    condition: (stats) => stats.dailyGoal > 0 && stats.dailySessionsCompleted >= stats.dailyGoal,
    progress: (stats) => {
      if (stats.dailyGoal === 0) return { current: 0, total: 1, percentage: 0 };
      return {
        current: Math.min(stats.dailySessionsCompleted, stats.dailyGoal),
        total: stats.dailyGoal,
        percentage: (Math.min(stats.dailySessionsCompleted, stats.dailyGoal) / stats.dailyGoal) * 100
      };
    }
  },
  {
    id: 'consistent',
    name: '🎯 Consistent',
    description: '连续 7 天达成每日目标',
    icon: TargetIcon,
    category: 'streak',
    condition: (stats) => stats.goalStreakDays >= 7,
    progress: (stats) => ({
      current: Math.min(stats.goalStreakDays, 7),
      total: 7,
      percentage: (Math.min(stats.goalStreakDays, 7) / 7) * 100
    })
  },
  {
    id: 'perfect_week',
    name: '📅 Perfect Week',
    description: '一周内每天都达成目标',
    icon: CalendarCheckIcon,
    category: 'streak',
    condition: (stats) => stats.perfectWeeks >= 1,
    progress: (stats) => ({
      current: Math.min(stats.perfectWeeks, 1),
      total: 1,
      percentage: Math.min(stats.perfectWeeks, 1) * 100
    })
  },

  // 时段成就
  {
    id: 'night_owl',
    name: '🦉 Night Owl',
    description: '在 23:00-05:00 完成专注',
    icon: OwlIcon,
    category: 'time',
    condition: (stats) => stats.nightSessions >= 1,
    progress: (stats) => ({
      current: Math.min(stats.nightSessions, 1),
      total: 1,
      percentage: Math.min(stats.nightSessions, 1) * 100
    })
  },
  {
    id: 'early_bird',
    name: '🐦 Early Bird',
    description: '在 05:00-07:00 完成专注',
    icon: BirdIcon,
    category: 'time',
    condition: (stats) => stats.morningSessions >= 1,
    progress: (stats) => ({
      current: Math.min(stats.morningSessions, 1),
      total: 1,
      percentage: Math.min(stats.morningSessions, 1) * 100
    })
  },

  // 时长成就
  {
    id: 'marathon',
    name: '🏃 Marathon',
    description: '单次专注 2 小时以上',
    icon: RunnerIcon,
    category: 'time',
    condition: (stats) => stats.longestSession >= 120,
    progress: (stats) => ({
      current: Math.min(stats.longestSession, 120),
      total: 120,
      percentage: (Math.min(stats.longestSession, 120) / 120) * 100
    })
  },
  {
    id: 'focused_mind',
    name: '🧠 Focused Mind',
    description: '累计专注 100 小时',
    icon: BrainIcon,
    category: 'time',
    condition: (stats) => stats.totalFocusMinutes >= 6000, // 100小时 = 6000分钟
    progress: (stats) => ({
      current: Math.min(stats.totalFocusMinutes, 6000),
      total: 6000,
      percentage: (Math.min(stats.totalFocusMinutes, 6000) / 6000) * 100
    })
  },

  // 任务成就
  {
    id: 'task_master',
    name: '✅ Task Master',
    description: '完成 50 个任务',
    icon: CheckSquareIcon,
    category: 'task',
    condition: (stats) => stats.completedTasks >= 50,
    progress: (stats) => ({
      current: Math.min(stats.completedTasks, 50),
      total: 50,
      percentage: (Math.min(stats.completedTasks, 50) / 50) * 100
    })
  },
];
