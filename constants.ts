import type { Sound, Achievement } from './types';
import { SproutIcon, SevenDayIcon, MoonCycleIcon } from './components/Icons';

export const DEFAULT_FOCUS_MINUTES = 25;
export const DEFAULT_BREAK_MINUTES = 5;
export const DEFAULT_LONG_BREAK_MINUTES = 15;
export const DEFAULT_SESSIONS_PER_ROUND = 4;


export const SOUNDS: Sound[] = [
  { id: 'rain', name: 'Rain', url: 'https://cdn.pixabay.com/audio/2022/10/20/audio_2769062f34.mp3' },
  { id: 'forest', name: 'Forest', url: 'https://cdn.pixabay.com/audio/2022/11/17/audio_88a4d2156a.mp3' },
  { id: 'cafe', name: 'Cafe', url: 'https://cdn.pixabay.com/audio/2022/07/02/audio_30b666a31c.mp3' },
  { id: 'fireplace', name: 'Fireplace', url: 'https://cdn.pixabay.com/audio/2023/10/24/audio_34b074a3f1.mp3' },
  { id: 'lofi', name: 'Lofi Beat', url: 'https://cdn.pixabay.com/audio/2022/02/07/audio_7313a54a22.mp3' },
  { id: 'ocean', name: 'Ocean Waves', url: 'https://cdn.pixabay.com/audio/2023/09/14/audio_3792518f6f.mp3' },
  { id: 'wind_chimes', name: 'Wind Chimes', url: 'https://cdn.pixabay.com/audio/2022/03/24/audio_111b302294.mp3' },
  { id: 'stream', name: 'Gentle Stream', url: 'https://cdn.pixabay.com/audio/2022/05/18/audio_141b141de7.mp3' },
  { id: 'brown_noise', name: 'Brown Noise', url: 'https://cdn.pixabay.com/audio/2022/05/29/audio_30b356d5b3.mp3' },
];

export const COMPLETION_SOUNDS: Sound[] = [
    { id: 'none', name: 'None', url: '' },
    { id: 'ding', name: 'Ding', url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_75eb4735a2.mp3'},
    { id: 'chime', name: 'Chime', url: 'https://cdn.pixabay.com/audio/2021/08/04/audio_57a9b73559.mp3'},
    { id: 'harp', name: 'Harp', url: 'https://cdn.pixabay.com/audio/2022/11/21/audio_a0a2a5df62.mp3'},
    { id: 'singing_bowl', name: 'Singing Bowl', url: 'https://cdn.pixabay.com/audio/2022/03/24/audio_39c1221f7c.mp3'},
    { id: 'soft_piano', name: 'Soft Piano', url: 'https://cdn.pixabay.com/audio/2022/01/24/audio_9185a53e6b.mp3'}
];

export const REMINDER_SOUNDS: Sound[] = [
    { id: 'none', name: 'None', url: '' },
    { id: 'gentle_bell', name: 'Gentle Bell', url: 'https://cdn.pixabay.com/audio/2022/02/08/audio_34b31c5025.mp3'},
    { id: 'sparkle', name: 'Sparkle', url: 'https://cdn.pixabay.com/audio/2022/03/22/audio_6e53995fe2.mp3'},
    { id: 'subtle_bell', name: 'Subtle Bell', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_8857371a36.mp3'}
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
