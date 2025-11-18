import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserId, setUserProperties } from 'firebase/analytics';

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyA-gt8y5eqJqlYFiFi7g0Gx-We3Sk0AwWo",
  authDomain: "tidefocus.firebaseapp.com",
  projectId: "tidefocus",
  storageBucket: "tidefocus.firebasestorage.app",
  messagingSenderId: "595236295740",
  appId: "1:595236295740:web:99518780185d8148cb9f39",
  measurementId: "G-61M2CLNRY0"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Analytics
let analytics: ReturnType<typeof getAnalytics> | null = null;

// 只在浏览器环境中初始化 Analytics
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Analytics:', error);
  }
}

// Analytics 事件类型定义
export type AnalyticsEvent = 
  // 会话相关
  | 'session_start'
  | 'session_complete'
  | 'session_skip'
  | 'break_start'
  | 'break_complete'
  
  // 任务相关
  | 'task_create'
  | 'task_complete'
  | 'task_delete'
  | 'task_edit'
  
  // 成就相关
  | 'achievement_unlock'
  
  // 设置相关
  | 'settings_change'
  | 'language_change'
  | 'theme_change'
  | 'sound_change'
  
  // 功能使用
  | 'intention_set'
  | 'breathing_guide_use'
  | 'soundscape_preset_apply'
  | 'data_export';

// 事件参数类型
export interface AnalyticsEventParams {
  session_start?: {
    mode: 'focus' | 'break' | 'longBreak';
    duration_minutes: number;
    has_intention: boolean;
    has_linked_task: boolean;
  };
  session_complete?: {
    mode: 'focus' | 'break' | 'longBreak';
    duration_minutes: number;
    actual_duration_seconds: number;
    completion_rate: number;
  };
  session_skip?: {
    mode: 'focus' | 'break' | 'longBreak';
    remaining_seconds: number;
  };
  task_create?: {
    has_description: boolean;
  };
  task_complete?: {
    completion_time_minutes: number;
  };
  achievement_unlock?: {
    achievement_id: string;
    achievement_name: string;
    category: string;
  };
  settings_change?: {
    setting_name: string;
    old_value: string | number;
    new_value: string | number;
  };
  language_change?: {
    from_language: string;
    to_language: string;
  };
  sound_change?: {
    sound_type: 'ambient' | 'completion' | 'reminder';
    sound_id: string;
    enabled: boolean;
  };
  soundscape_preset_apply?: {
    preset_id: string;
    preset_name: string;
  };
  data_export?: {
    export_type: 'csv' | 'json';
    data_range: string;
  };
  [key: string]: any;
}

// 记录事件
export const trackEvent = (
  eventName: AnalyticsEvent,
  params?: AnalyticsEventParams[typeof eventName]
) => {
  if (!analytics) {
    console.warn('Analytics not initialized, event not tracked:', eventName);
    return;
  }

  try {
    logEvent(analytics, eventName, params as any);
    console.log('Analytics event tracked:', eventName, params);
  } catch (error) {
    console.error('Failed to track event:', eventName, error);
  }
};

// 设置用户 ID
export const setAnalyticsUserId = (userId: string) => {
  if (!analytics) return;
  
  try {
    setUserId(analytics, userId);
    console.log('Analytics user ID set:', userId);
  } catch (error) {
    console.error('Failed to set user ID:', error);
  }
};

// 设置用户属性
export const setAnalyticsUserProperties = (properties: Record<string, any>) => {
  if (!analytics) return;
  
  try {
    setUserProperties(analytics, properties);
    console.log('Analytics user properties set:', properties);
  } catch (error) {
    console.error('Failed to set user properties:', error);
  }
};

export { analytics };

