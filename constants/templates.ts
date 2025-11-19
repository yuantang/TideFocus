import { PomodoroTemplate } from '../types';

export const PRESET_TEMPLATES: PomodoroTemplate[] = [
  {
    id: 'classic',
    name: '经典番茄钟',
    description: '传统的25-5-15模式，适合大多数工作场景',
    icon: '🍅',
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsPerRound: 4,
    isCustom: false
  },
  {
    id: 'study',
    name: '学习模式',
    description: '适合学习和记忆，短专注高频率',
    icon: '📚',
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsPerRound: 4,
    isCustom: false
  },
  {
    id: 'work',
    name: '工作模式',
    description: '适合深度工作，长专注少打断',
    icon: '💼',
    focusDuration: 50,
    breakDuration: 10,
    longBreakDuration: 30,
    sessionsPerRound: 3,
    isCustom: false
  },
  {
    id: 'creative',
    name: '创作模式',
    description: '适合创意工作，超长专注深度思考',
    icon: '🎨',
    focusDuration: 90,
    breakDuration: 20,
    longBreakDuration: 30,
    sessionsPerRound: 2,
    isCustom: false
  },
  {
    id: 'sprint',
    name: '冲刺模式',
    description: '短时高效，适合快速完成任务',
    icon: '⚡',
    focusDuration: 15,
    breakDuration: 3,
    longBreakDuration: 10,
    sessionsPerRound: 6,
    isCustom: false
  },
  {
    id: 'deepFocus',
    name: '深度专注',
    description: '极致专注，适合复杂问题解决',
    icon: '🧠',
    focusDuration: 120,
    breakDuration: 30,
    longBreakDuration: 60,
    sessionsPerRound: 2,
    isCustom: false
  },
  {
    id: 'relax',
    name: '轻松模式',
    description: '低压力，适合休闲学习',
    icon: '☕',
    focusDuration: 20,
    breakDuration: 10,
    longBreakDuration: 20,
    sessionsPerRound: 3,
    isCustom: false
  }
];

export const DEFAULT_TEMPLATE_ID = 'classic';

// 获取模板
export const getTemplate = (id: string, customTemplates: PomodoroTemplate[] = []): PomodoroTemplate | undefined => {
  return [...PRESET_TEMPLATES, ...customTemplates].find(t => t.id === id);
};

// 获取所有模板
export const getAllTemplates = (customTemplates: PomodoroTemplate[] = []): PomodoroTemplate[] => {
  return [...PRESET_TEMPLATES, ...customTemplates];
};

// 创建自定义模板
export const createCustomTemplate = (
  name: string,
  description: string,
  focusDuration: number,
  breakDuration: number,
  longBreakDuration: number,
  sessionsPerRound: number,
  icon: string = '⭐'
): PomodoroTemplate => {
  return {
    id: `custom_${Date.now()}`,
    name,
    description,
    icon,
    focusDuration,
    breakDuration,
    longBreakDuration,
    sessionsPerRound,
    isCustom: true,
    createdAt: Date.now()
  };
};

// 验证模板参数
export const validateTemplate = (template: Partial<PomodoroTemplate>): string[] => {
  const errors: string[] = [];

  if (!template.name || template.name.trim().length === 0) {
    errors.push('模板名称不能为空');
  }

  if (!template.focusDuration || template.focusDuration < 1 || template.focusDuration > 180) {
    errors.push('专注时长必须在 1-180 分钟之间');
  }

  if (!template.breakDuration || template.breakDuration < 1 || template.breakDuration > 60) {
    errors.push('短休息时长必须在 1-60 分钟之间');
  }

  if (!template.longBreakDuration || template.longBreakDuration < 1 || template.longBreakDuration > 120) {
    errors.push('长休息时长必须在 1-120 分钟之间');
  }

  if (!template.sessionsPerRound || template.sessionsPerRound < 1 || template.sessionsPerRound > 10) {
    errors.push('每轮次数必须在 1-10 之间');
  }

  return errors;
};

