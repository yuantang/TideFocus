import { useCallback, useEffect } from 'react';
import { trackEvent, setAnalyticsUserId, setAnalyticsUserProperties, type AnalyticsEvent, type AnalyticsEventParams } from '../firebase';
import { getCurrentLanguage } from '../i18n';

/**
 * Analytics Hook
 * 提供便捷的分析事件追踪功能
 */
export const useAnalytics = () => {
  // 初始化用户属性
  useEffect(() => {
    const language = getCurrentLanguage();
    const userId = localStorage.getItem('userId') || generateUserId();
    
    // 设置用户 ID
    setAnalyticsUserId(userId);
    
    // 设置用户属性
    setAnalyticsUserProperties({
      language,
      app_version: '1.0.0',
      platform: 'web',
    });
  }, []);

  // 追踪事件
  const track = useCallback(<T extends AnalyticsEvent>(
    eventName: T,
    params?: AnalyticsEventParams[T]
  ) => {
    trackEvent(eventName, params);
  }, []);

  // 追踪会话开始
  const trackSessionStart = useCallback((
    mode: 'focus' | 'break' | 'longBreak',
    durationMinutes: number,
    hasIntention: boolean,
    hasLinkedTask: boolean
  ) => {
    track('session_start', {
      mode,
      duration_minutes: durationMinutes,
      has_intention: hasIntention,
      has_linked_task: hasLinkedTask,
    });
  }, [track]);

  // 追踪会话完成
  const trackSessionComplete = useCallback((
    mode: 'focus' | 'break' | 'longBreak',
    durationMinutes: number,
    actualDurationSeconds: number
  ) => {
    const completionRate = (actualDurationSeconds / (durationMinutes * 60)) * 100;
    track('session_complete', {
      mode,
      duration_minutes: durationMinutes,
      actual_duration_seconds: actualDurationSeconds,
      completion_rate: Math.round(completionRate),
    });
  }, [track]);

  // 追踪会话跳过
  const trackSessionSkip = useCallback((
    mode: 'focus' | 'break' | 'longBreak',
    remainingSeconds: number
  ) => {
    track('session_skip', {
      mode,
      remaining_seconds: remainingSeconds,
    });
  }, [track]);

  // 追踪任务创建
  const trackTaskCreate = useCallback((hasDescription: boolean) => {
    track('task_create', {
      has_description: hasDescription,
    });
  }, [track]);

  // 追踪任务完成
  const trackTaskComplete = useCallback((completionTimeMinutes: number) => {
    track('task_complete', {
      completion_time_minutes: completionTimeMinutes,
    });
  }, [track]);

  // 追踪成就解锁
  const trackAchievementUnlock = useCallback((
    achievementId: string,
    achievementName: string,
    category: string
  ) => {
    track('achievement_unlock', {
      achievement_id: achievementId,
      achievement_name: achievementName,
      category,
    });
  }, [track]);

  // 追踪语言切换
  const trackLanguageChange = useCallback((fromLanguage: string, toLanguage: string) => {
    track('language_change', {
      from_language: fromLanguage,
      to_language: toLanguage,
    });
  }, [track]);

  // 追踪设置更改
  const trackSettingsChange = useCallback((
    settingName: string,
    oldValue: string | number,
    newValue: string | number
  ) => {
    track('settings_change', {
      setting_name: settingName,
      old_value: oldValue,
      new_value: newValue,
    });
  }, [track]);

  // 追踪音景预设应用
  const trackSoundscapePresetApply = useCallback((presetId: string, presetName: string) => {
    track('soundscape_preset_apply', {
      preset_id: presetId,
      preset_name: presetName,
    });
  }, [track]);

  // 追踪数据导出
  const trackDataExport = useCallback((exportType: 'csv' | 'json', dataRange: string) => {
    track('data_export', {
      export_type: exportType,
      data_range: dataRange,
    });
  }, [track]);

  return {
    track,
    trackSessionStart,
    trackSessionComplete,
    trackSessionSkip,
    trackTaskCreate,
    trackTaskComplete,
    trackAchievementUnlock,
    trackLanguageChange,
    trackSettingsChange,
    trackSoundscapePresetApply,
    trackDataExport,
  };
};

// 生成唯一用户 ID
function generateUserId(): string {
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('userId', userId);
  return userId;
}

