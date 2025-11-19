import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { useCloudSync } from './useCloudSync';

interface AutoSyncOptions {
  enabled?: boolean;
  debounceMs?: number;
  syncOnVisibilityChange?: boolean;
  syncOnFocus?: boolean;
  periodicSyncIntervalMs?: number;
}

const DEFAULT_OPTIONS: AutoSyncOptions = {
  enabled: true,
  debounceMs: 3000, // 3秒防抖
  syncOnVisibilityChange: true,
  syncOnFocus: true,
  periodicSyncIntervalMs: 5 * 60 * 1000 // 5分钟
};

export const useAutoSync = (options: AutoSyncOptions = {}) => {
  const { isAuthenticated } = useAuth();
  const { syncAll, syncStatus } = useCloudSync();
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const periodicSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncTimeRef = useRef<number>(0);

  // 防抖同步函数
  const debouncedSync = useCallback(() => {
    if (!opts.enabled || !isAuthenticated || syncStatus.syncing) {
      return;
    }

    // 清除之前的定时器
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    // 设置新的防抖定时器
    syncTimeoutRef.current = setTimeout(() => {
      const now = Date.now();
      const timeSinceLastSync = now - lastSyncTimeRef.current;

      // 避免频繁同步（至少间隔1秒）
      if (timeSinceLastSync < 1000) {
        console.log('⏭️ Skipping sync (too soon since last sync)');
        return;
      }

      console.log('🔄 Auto-syncing data...');
      syncAll();
      lastSyncTimeRef.current = now;
    }, opts.debounceMs);
  }, [opts.enabled, opts.debounceMs, isAuthenticated, syncStatus.syncing, syncAll]);

  // 监听 localStorage 变化
  useEffect(() => {
    if (!opts.enabled || !isAuthenticated) return;

    const handleStorageChange = (e: StorageEvent) => {
      // 只监听特定的 key
      const syncKeys = [
        'focusDuration', 'breakDuration', 'longBreakDuration',
        'dailyGoal', 'sessionsPerRound',
        'tasks', 'history', 'unlockedAchievements',
        'totalSessions', 'dailySessionsCompleted', 'focusStreak'
      ];

      if (e.key && syncKeys.includes(e.key)) {
        console.log('💾 LocalStorage changed:', e.key);
        debouncedSync();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [opts.enabled, isAuthenticated, debouncedSync]);

  // 监听页面可见性变化
  useEffect(() => {
    if (!opts.enabled || !opts.syncOnVisibilityChange || !isAuthenticated) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('👁️ Page became visible, syncing...');
        debouncedSync();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [opts.enabled, opts.syncOnVisibilityChange, isAuthenticated, debouncedSync]);

  // 监听窗口焦点
  useEffect(() => {
    if (!opts.enabled || !opts.syncOnFocus || !isAuthenticated) return;

    const handleFocus = () => {
      console.log('🎯 Window focused, syncing...');
      debouncedSync();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [opts.enabled, opts.syncOnFocus, isAuthenticated, debouncedSync]);

  // 定期同步
  useEffect(() => {
    if (!opts.enabled || !opts.periodicSyncIntervalMs || !isAuthenticated) return;

    console.log(`⏰ Setting up periodic sync every ${opts.periodicSyncIntervalMs / 1000}s`);

    periodicSyncIntervalRef.current = setInterval(() => {
      if (!syncStatus.syncing) {
        console.log('⏰ Periodic sync triggered');
        syncAll();
        lastSyncTimeRef.current = Date.now();
      }
    }, opts.periodicSyncIntervalMs);

    return () => {
      if (periodicSyncIntervalRef.current) {
        clearInterval(periodicSyncIntervalRef.current);
      }
    };
  }, [opts.enabled, opts.periodicSyncIntervalMs, isAuthenticated, syncStatus.syncing, syncAll]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      if (periodicSyncIntervalRef.current) {
        clearInterval(periodicSyncIntervalRef.current);
      }
    };
  }, []);

  // 手动触发同步
  const triggerSync = useCallback(() => {
    if (!isAuthenticated || syncStatus.syncing) return;
    console.log('🔄 Manual sync triggered');
    syncAll();
    lastSyncTimeRef.current = Date.now();
  }, [isAuthenticated, syncStatus.syncing, syncAll]);

  return {
    triggerSync,
    isSyncing: syncStatus.syncing,
    lastSyncTime: syncStatus.lastSyncTime
  };
};

