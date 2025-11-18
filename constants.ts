import type { Sound, Achievement, SoundscapePreset } from './types';
import { getTranslations } from './i18n';
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


const SOUNDS_BASE: Sound[] = [
  { id: 'none', name: '无声', url: '' },
  // 色彩噪音 - 不同频率的噪音，适合屏蔽干扰
  { id: 'white_noise', name: '白噪音', url: '/sounds/ambient/white-noise.ogg' },
  { id: 'pink_noise', name: '粉噪音', url: '/sounds/ambient/pink-noise.ogg' },
  { id: 'brown_noise', name: '棕噪音', url: '/sounds/ambient/brown-noise.ogg' },
  { id: 'violet_noise', name: '紫噪音', url: '/sounds/ambient/violet-noise.ogg' },
  // 水声 - 流动的水声，舒缓放松
  { id: 'rain', name: '雨声', url: '/sounds/ambient/rain.ogg' },
  { id: 'waves', name: '海浪', url: '/sounds/ambient/waves.ogg' },
  { id: 'stream', name: '溪流', url: '/sounds/ambient/stream.ogg' },
  { id: 'ocean', name: '海洋', url: '/sounds/ambient/ocean.ogg' },
  // 火焰 - 温暖的火焰声，深度专注
  { id: 'fireplace', name: '壁炉', url: '/sounds/ambient/fireplace.ogg' },
  { id: 'campfire', name: '篝火', url: '/sounds/ambient/campfire.ogg' },
  { id: 'thunder', name: '雷声', url: '/sounds/ambient/thunder.ogg' },
  { id: 'wind', name: '风声', url: '/sounds/ambient/wind.ogg' },
  // 自然 - 自然环境声，放松心情
  { id: 'forest', name: '森林', url: '/sounds/ambient/forest.ogg' },
  { id: 'birds', name: '鸟鸣', url: '/sounds/ambient/birds.ogg' },
  { id: 'crickets', name: '虫鸣', url: '/sounds/ambient/crickets.ogg' },
  { id: 'wind_chimes', name: '风铃', url: '/sounds/ambient/wind-chimes.ogg' },
  // 环境 - 工作学习环境氛围
  { id: 'cafe', name: '咖啡店', url: '/sounds/ambient/cafe.ogg' },
  { id: 'library', name: '图书馆', url: '/sounds/ambient/library.ogg' },
  { id: 'air_conditioner', name: '空调', url: '/sounds/ambient/air-conditioner.ogg' },
  { id: 'city_ambient', name: '城市氛围', url: '/sounds/ambient/city-ambient.ogg' },
];

export const getLocalizedSounds = (): Sound[] => {
  const t = getTranslations();
  return SOUNDS_BASE.map(sound => ({
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  }));
};

export const SOUNDS = SOUNDS_BASE.map(sound => {
  const t = getTranslations();
  return {
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  };
});

// Sound categories for better organization
const SOUND_CATEGORIES_BASE = [
  {
    id: 'white_noise',
    name: '🎚️ 白噪音',
    emoji: '🎚️',
    sounds: ['white_noise', 'pink_noise', 'brown_noise', 'violet_noise']
  },
  {
    id: 'water',
    name: '💧 水声',
    emoji: '💧',
    sounds: ['rain', 'waves', 'stream', 'ocean']
  },
  {
    id: 'atmosphere',
    name: '🔥 氛围',
    emoji: '🔥',
    sounds: ['fireplace', 'campfire', 'thunder', 'wind']
  },
  {
    id: 'nature',
    name: '🌿 自然',
    emoji: '🌿',
    sounds: ['forest', 'birds', 'crickets', 'wind_chimes']
  },
  {
    id: 'ambient',
    name: '☕ 环境',
    emoji: '☕',
    sounds: ['cafe', 'library', 'air_conditioner', 'city_ambient']
  }
];

export const getLocalizedSoundCategories = () => {
  const t = getTranslations();
  return SOUND_CATEGORIES_BASE.map(category => ({
    ...category,
    name: t.soundCategoryNames[category.id] || category.name,
  }));
};

export const SOUND_CATEGORIES = SOUND_CATEGORIES_BASE.map(category => {
  const t = getTranslations();
  return {
    ...category,
    name: t.soundCategoryNames[category.id] || category.name,
  };
});

const COMPLETION_SOUNDS_BASE: Sound[] = [
    { id: 'none', name: '无声', url: '' },
    { id: 'singing_bowl', name: '颂钵', url: '/sounds/completion/singing-bowl.ogg'},
    { id: 'bamboo_chime', name: '竹风铃', url: '/sounds/completion/bamboo-chime.ogg'},
    { id: 'music_box', name: '音乐盒', url: '/sounds/completion/music-box.ogg'}
];

export const getLocalizedCompletionSounds = (): Sound[] => {
  const t = getTranslations();
  return COMPLETION_SOUNDS_BASE.map(sound => ({
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  }));
};

export const COMPLETION_SOUNDS = COMPLETION_SOUNDS_BASE.map(sound => {
  const t = getTranslations();
  return {
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  };
});

const REMINDER_SOUNDS_BASE: Sound[] = [
    { id: 'none', name: '无声', url: '' },
    { id: 'bell', name: '摇铃', url: '/sounds/reminder/bell.ogg'},
    { id: 'piano', name: '钢琴', url: '/sounds/reminder/piano.ogg'}
];

export const getLocalizedReminderSounds = (): Sound[] => {
  const t = getTranslations();
  return REMINDER_SOUNDS_BASE.map(sound => ({
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  }));
};

export const REMINDER_SOUNDS = REMINDER_SOUNDS_BASE.map(sound => {
  const t = getTranslations();
  return {
    ...sound,
    name: t.soundNames[sound.id] || sound.name,
  };
});

const SOUNDSCAPE_PRESETS_BASE: SoundscapePreset[] = [
  {
    id: 'deep_focus',
    name: '🎯 深度专注',
    description: '棕噪音与白噪音的完美平衡，屏蔽一切干扰',
    sounds: [
      { id: 'brown_noise', volume: 0.7 },
      { id: 'white_noise', volume: 0.4 },
    ]
  },
  {
    id: 'rainy_study',
    name: '🌧️ 雨中学习',
    description: '雨声与粉噪音，营造舒适的学习氛围',
    sounds: [
      { id: 'rain', volume: 0.6 },
      { id: 'pink_noise', volume: 0.5 },
      { id: 'thunder', volume: 0.2 },
    ]
  },
  {
    id: 'ocean_calm',
    name: '🌊 海洋宁静',
    description: '海浪与棕噪音，深沉而平静',
    sounds: [
      { id: 'ocean', volume: 0.7 },
      { id: 'waves', volume: 0.4 },
      { id: 'brown_noise', volume: 0.3 },
    ]
  },
  {
    id: 'cozy_fireplace',
    name: '🔥 温暖壁炉',
    description: '壁炉与粉噪音，温馨舒适的工作环境',
    sounds: [
      { id: 'fireplace', volume: 0.7 },
      { id: 'pink_noise', volume: 0.4 },
      { id: 'wind', volume: 0.2 },
    ]
  },
  {
    id: 'forest_retreat',
    name: '🌿 森林静修',
    description: '森林、鸟鸣与白噪音的自然和谐',
    sounds: [
      { id: 'forest', volume: 0.6 },
      { id: 'birds', volume: 0.4 },
      { id: 'white_noise', volume: 0.3 },
    ]
  },
  {
    id: 'cafe_work',
    name: '☕ 咖啡馆工作',
    description: '咖啡店氛围与粉噪音，模拟理想工作环境',
    sounds: [
      { id: 'cafe', volume: 0.7 },
      { id: 'pink_noise', volume: 0.3 },
    ]
  },
  {
    id: 'library_silence',
    name: '📚 图书馆静谧',
    description: '图书馆与棕噪音，极致安静的专注空间',
    sounds: [
      { id: 'library', volume: 0.6 },
      { id: 'brown_noise', volume: 0.5 },
    ]
  },
  {
    id: 'night_work',
    name: '🌙 深夜工作',
    description: '虫鸣、风铃与紫噪音，适合夜间专注',
    sounds: [
      { id: 'crickets', volume: 0.5 },
      { id: 'wind_chimes', volume: 0.3 },
      { id: 'violet_noise', volume: 0.4 },
    ]
  },
];

export const getLocalizedSoundscapePresets = (): SoundscapePreset[] => {
  const t = getTranslations();

  return SOUNDSCAPE_PRESETS_BASE.map(preset => ({
    ...preset,
    name: t.soundscapeNames[preset.id] || preset.name,
    description: t.soundscapeDescriptions[preset.id] || preset.description,
  }));
};

export const SOUNDSCAPE_PRESETS = SOUNDSCAPE_PRESETS_BASE.map(preset => {
  const t = getTranslations();
  return {
    ...preset,
    name: t.soundscapeNames[preset.id] || preset.name,
    description: t.soundscapeDescriptions[preset.id] || preset.description,
  };
});

export const LONG_BREAK_QUOTES: string[] = [
    'Rest is not idleness.',
    'A pause is a part of the rhythm.',
    'Let your mind wander freely.',
    'Stillness is a form of action.',
    'Almost everything will work again if you unplug it for a few minutes, including you.',
    'Time relaxing is time well spent.'
];

// 基础成就定义（不含翻译）
const ACHIEVEMENTS_BASE: Achievement[] = [
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
    id: 'blooming',
    name: '🌸 Blooming',
    description: '完成 25 次专注',
    icon: '🌸',
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 25,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 25),
      total: 25,
      percentage: (Math.min(stats.totalSessions, 25) / 25) * 100
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
  {
    id: 'full_bloom',
    name: '🌺 Full Bloom',
    description: '完成 200 次专注',
    icon: '🌺',
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 200,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 200),
      total: 200,
      percentage: (Math.min(stats.totalSessions, 200) / 200) * 100
    })
  },
  {
    id: 'ancient_tree',
    name: '🌲 Ancient Tree',
    description: '完成 500 次专注',
    icon: '🌲',
    category: 'focus',
    condition: (stats) => stats.totalSessions >= 500,
    progress: (stats) => ({
      current: Math.min(stats.totalSessions, 500),
      total: 500,
      percentage: (Math.min(stats.totalSessions, 500) / 500) * 100
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
    id: 'power_week',
    name: '⚡ Power Week',
    description: '连续 14 天专注',
    icon: '⚡',
    category: 'streak',
    condition: (stats) => stats.focusStreak >= 14,
    progress: (stats) => ({
      current: Math.min(stats.focusStreak, 14),
      total: 14,
      percentage: (Math.min(stats.focusStreak, 14) / 14) * 100
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
  {
    id: 'dedication',
    name: '🌟 Dedication',
    description: '连续 60 天专注',
    icon: '🌟',
    category: 'streak',
    condition: (stats) => stats.focusStreak >= 60,
    progress: (stats) => ({
      current: Math.min(stats.focusStreak, 60),
      total: 60,
      percentage: (Math.min(stats.focusStreak, 60) / 60) * 100
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
  {
    id: 'unstoppable',
    name: '💪 Unstoppable',
    description: '连续 30 天达成每日目标',
    icon: '💪',
    category: 'streak',
    condition: (stats) => stats.goalStreakDays >= 30,
    progress: (stats) => ({
      current: Math.min(stats.goalStreakDays, 30),
      total: 30,
      percentage: (Math.min(stats.goalStreakDays, 30) / 30) * 100
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
    id: 'midnight_scholar',
    name: '🌙 Midnight Scholar',
    description: '在深夜完成 10 次专注',
    icon: '🌙',
    category: 'time',
    condition: (stats) => stats.nightSessions >= 10,
    progress: (stats) => ({
      current: Math.min(stats.nightSessions, 10),
      total: 10,
      percentage: (Math.min(stats.nightSessions, 10) / 10) * 100
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
  {
    id: 'dawn_warrior',
    name: '🌅 Dawn Warrior',
    description: '在清晨完成 10 次专注',
    icon: '🌅',
    category: 'time',
    condition: (stats) => stats.morningSessions >= 10,
    progress: (stats) => ({
      current: Math.min(stats.morningSessions, 10),
      total: 10,
      percentage: (Math.min(stats.morningSessions, 10) / 10) * 100
    })
  },

  // 时长成就
  {
    id: 'time_keeper',
    name: '⏰ Time Keeper',
    description: '累计专注 10 小时',
    icon: '⏰',
    category: 'time',
    condition: (stats) => stats.totalFocusMinutes >= 600, // 10小时 = 600分钟
    progress: (stats) => ({
      current: Math.min(stats.totalFocusMinutes, 600),
      total: 600,
      percentage: (Math.min(stats.totalFocusMinutes, 600) / 600) * 100
    })
  },
  {
    id: 'time_master',
    name: '🕐 Time Master',
    description: '累计专注 50 小时',
    icon: '🕐',
    category: 'time',
    condition: (stats) => stats.totalFocusMinutes >= 3000, // 50小时 = 3000分钟
    progress: (stats) => ({
      current: Math.min(stats.totalFocusMinutes, 3000),
      total: 3000,
      percentage: (Math.min(stats.totalFocusMinutes, 3000) / 3000) * 100
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
    id: 'ultra_marathon',
    name: '⏳ Ultra Marathon',
    description: '单次专注 5 小时以上',
    icon: '⏳',
    category: 'time',
    condition: (stats) => stats.longestSession >= 300,
    progress: (stats) => ({
      current: Math.min(stats.longestSession, 300),
      total: 300,
      percentage: (Math.min(stats.longestSession, 300) / 300) * 100
    })
  },

  // 任务成就
  {
    id: 'task_starter',
    name: '📝 Task Starter',
    description: '完成 10 个任务',
    icon: '📝',
    category: 'task',
    condition: (stats) => stats.completedTasks >= 10,
    progress: (stats) => ({
      current: Math.min(stats.completedTasks, 10),
      total: 10,
      percentage: (Math.min(stats.completedTasks, 10) / 10) * 100
    })
  },
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
  {
    id: 'task_champion',
    name: '🎯 Task Champion',
    description: '完成 100 个任务',
    icon: '🎯',
    category: 'task',
    condition: (stats) => stats.completedTasks >= 100,
    progress: (stats) => ({
      current: Math.min(stats.completedTasks, 100),
      total: 100,
      percentage: (Math.min(stats.completedTasks, 100) / 100) * 100
    })
  },
  {
    id: 'task_legend',
    name: '🏆 Task Legend',
    description: '完成 500 个任务',
    icon: '🏆',
    category: 'task',
    condition: (stats) => stats.completedTasks >= 500,
    progress: (stats) => ({
      current: Math.min(stats.completedTasks, 500),
      total: 500,
      percentage: (Math.min(stats.completedTasks, 500) / 500) * 100
    })
  },
];

// 获取本地化的成就列表（每次调用时都会获取当前语言的翻译）
export const getLocalizedAchievements = (): Achievement[] => {
  const t = getTranslations();

  return ACHIEVEMENTS_BASE.map(achievement => ({
    ...achievement,
    name: t.achievementNames[achievement.id] || achievement.name,
    description: t.achievementDescriptions[achievement.id] || achievement.description,
  }));
};

// 导出本地化的成就列表（为了向后兼容）
export const ACHIEVEMENTS = ACHIEVEMENTS_BASE.map(achievement => {
  const t = getTranslations();
  return {
    ...achievement,
    name: t.achievementNames[achievement.id] || achievement.name,
    description: t.achievementDescriptions[achievement.id] || achievement.description,
  };
});
