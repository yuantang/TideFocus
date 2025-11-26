import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { collectUserStats, saveUserStats, syncStatsToStorage } from '../utils/syncHelper';

export type DataType = 'settings' | 'history' | 'tasks' | 'achievements' | 'stats';

// localStorage 键名映射
const STORAGE_KEY_MAP: Record<DataType, string> = {
  settings: 'appSettings',
  history: 'focusHistory',
  tasks: 'dailyTasks',
  achievements: 'unlockedAchievements',
  stats: 'userStats'
};

// 获取实际的 localStorage 键名
const getStorageKey = (dataType: DataType): string => {
  return STORAGE_KEY_MAP[dataType] || dataType;
};

export interface SyncStatus {
  syncing: boolean;
  lastSyncTime: number | null;
  error: string | null;
  pendingChanges: number;
}

interface CloudData {
  id: string;
  user_id: string;
  data_type: DataType;
  data: any;
  version: number;
  updated_at: string;
}

export const useCloudSync = () => {
  const { user, isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    syncing: false,
    lastSyncTime: null,
    error: null,
    pendingChanges: 0
  });

  const syncInProgressRef = useRef(false);

  // 上传数据到云端
  const uploadData = useCallback(async (dataType: DataType, data: any) => {
    if (!isAuthenticated || !user) {
      throw new Error('User not authenticated');
    }

    try {
      // 获取当前云端版本
      const { data: existingData, error: fetchError } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user.id)
        .eq('data_type', dataType)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
        throw fetchError;
      }

      const newVersion = existingData ? existingData.version + 1 : 1;

      // 上传或更新数据
      const { error: upsertError } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          data_type: dataType,
          data,
          version: newVersion,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,data_type'
        });

      if (upsertError) {
        throw upsertError;
      }

      return { success: true, version: newVersion };
    } catch (error: any) {
      console.error(`Error uploading ${dataType}:`, error);
      throw error;
    }
  }, [isAuthenticated, user]);

  // 从云端下载数据
  const downloadData = useCallback(async (dataType: DataType) => {
    if (!isAuthenticated || !user) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user.id)
        .eq('data_type', dataType)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data as CloudData | null;
    } catch (error: any) {
      console.error(`Error downloading ${dataType}:`, error);
      throw error;
    }
  }, [isAuthenticated, user]);

  // 同步所有数据
  const syncAll = useCallback(async () => {
    if (!isAuthenticated || syncInProgressRef.current) {
      return;
    }

    syncInProgressRef.current = true;
    setSyncStatus(prev => ({ ...prev, syncing: true, error: null }));

    try {
      // 在同步前，先收集所有统计数据到 userStats
      syncStatsToStorage();

      const dataTypes: DataType[] = ['settings', 'history', 'tasks', 'achievements', 'stats'];

      for (const dataType of dataTypes) {
        // 使用映射的键名获取本地数据
        const storageKey = getStorageKey(dataType);
        const localDataStr = localStorage.getItem(storageKey);
        if (!localDataStr) {
          // 如果是 stats 类型且没有数据，尝试收集
          if (dataType === 'stats') {
            const stats = collectUserStats();
            await uploadData(dataType, stats);
            localStorage.setItem(storageKey, JSON.stringify(stats));
            localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
          }
          continue;
        }

        const localData = JSON.parse(localDataStr);

        // 上传到云端
        await uploadData(dataType, localData);

        // 保存时间戳
        localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
      }

      setSyncStatus({
        syncing: false,
        lastSyncTime: Date.now(),
        error: null,
        pendingChanges: 0
      });

      console.log('✅ Sync all completed successfully');
    } catch (error: any) {
      console.error('❌ Sync all failed:', error);
      setSyncStatus(prev => ({
        ...prev,
        syncing: false,
        error: error.message || 'Sync failed'
      }));
    } finally {
      syncInProgressRef.current = false;
    }
  }, [isAuthenticated, uploadData]);

  // 从云端恢复所有数据
  const restoreAll = useCallback(async () => {
    if (!isAuthenticated || syncInProgressRef.current) {
      return;
    }

    syncInProgressRef.current = true;
    setSyncStatus(prev => ({ ...prev, syncing: true, error: null }));

    try {
      const dataTypes: DataType[] = ['settings', 'history', 'tasks', 'achievements', 'stats'];

      for (const dataType of dataTypes) {
        const cloudData = await downloadData(dataType);

        if (cloudData && cloudData.data) {
          // 使用映射的键名保存到本地
          const storageKey = getStorageKey(dataType);
          localStorage.setItem(storageKey, JSON.stringify(cloudData.data));

          // 保存时间戳
          const cloudTime = new Date(cloudData.updated_at).getTime();
          localStorage.setItem(`${storageKey}_timestamp`, cloudTime.toString());
        }
      }

      setSyncStatus({
        syncing: false,
        lastSyncTime: Date.now(),
        error: null,
        pendingChanges: 0
      });

      // 刷新页面以应用新数据
      window.location.reload();
    } catch (error: any) {
      setSyncStatus(prev => ({
        ...prev,
        syncing: false,
        error: error.message || 'Restore failed'
      }));
    } finally {
      syncInProgressRef.current = false;
    }
  }, [isAuthenticated, downloadData]);

  // 智能合并两个数据集
  const mergeData = (dataType: DataType, localData: any, cloudData: any): any => {
    console.log(`🔀 Merging ${dataType} data...`);

    switch (dataType) {
      case 'achievements':
        // 成就数据：取并集（合并所有唯一成就）
        if (Array.isArray(localData) && Array.isArray(cloudData)) {
          const merged = Array.from(new Set([...localData, ...cloudData]));
          console.log(`  📊 Achievements: local=${localData.length}, cloud=${cloudData.length}, merged=${merged.length}`);
          return merged;
        }
        return localData || cloudData || [];

      case 'history':
        // 历史记录：合并所有日期的数据，取最大值
        if (typeof localData === 'object' && typeof cloudData === 'object') {
          const merged = { ...cloudData, ...localData };
          // 对于相同日期，取较大的值
          Object.keys(cloudData).forEach(date => {
            if (localData[date]) {
              merged[date] = Math.max(localData[date], cloudData[date]);
            }
          });
          console.log(`  📊 History: local=${Object.keys(localData).length} days, cloud=${Object.keys(cloudData).length} days, merged=${Object.keys(merged).length} days`);
          return merged;
        }
        return localData || cloudData || {};

      case 'stats':
        // 统计数据：合并对象，数值取最大值
        if (typeof localData === 'object' && typeof cloudData === 'object') {
          const merged: any = { ...cloudData };
          Object.keys(localData).forEach(key => {
            if (typeof localData[key] === 'number' && typeof cloudData[key] === 'number') {
              merged[key] = Math.max(localData[key], cloudData[key]);
            } else {
              merged[key] = localData[key] ?? cloudData[key];
            }
          });
          // 确保包含所有云端的字段
          Object.keys(cloudData).forEach(key => {
            if (!(key in merged)) {
              merged[key] = cloudData[key];
            }
          });
          merged.lastUpdated = new Date().toISOString();
          console.log(`  📊 Stats merged: ${Object.keys(merged).length} fields`);
          return merged;
        }
        return localData || cloudData || {};

      case 'tasks':
        // 任务数据：使用较新的数据（任务是每日重置的）
        if (localData?.date && cloudData?.date) {
          const useLocal = localData.date >= cloudData.date;
          console.log(`  📊 Tasks: using ${useLocal ? 'local' : 'cloud'} (${useLocal ? localData.date : cloudData.date})`);
          return useLocal ? localData : cloudData;
        }
        return localData || cloudData || { date: new Date().toISOString().split('T')[0], tasks: [] };

      case 'settings':
        // 设置数据：使用本地数据优先（用户最近的设置）
        console.log(`  📊 Settings: using local data`);
        return localData || cloudData || {};

      default:
        return localData || cloudData;
    }
  };

  // 智能合并云端和本地数据
  const smartMerge = useCallback(async () => {
    if (!isAuthenticated || syncInProgressRef.current) {
      return;
    }

    syncInProgressRef.current = true;
    setSyncStatus(prev => ({ ...prev, syncing: true, error: null }));

    try {
      console.log('🔄 Starting smart merge...');
      const dataTypes: DataType[] = ['settings', 'history', 'tasks', 'achievements', 'stats'];
      let hasChanges = false;

      for (const dataType of dataTypes) {
        const cloudData = await downloadData(dataType);
        const storageKey = getStorageKey(dataType);
        const localDataStr = localStorage.getItem(storageKey);

        if (cloudData && localDataStr) {
          // 都有数据，进行智能合并
          console.log(`🔀 Both local and cloud data exist for ${dataType}, merging...`);
          const localData = JSON.parse(localDataStr);
          const mergedData = mergeData(dataType, localData, cloudData.data);

          // 保存合并后的数据到本地
          localStorage.setItem(storageKey, JSON.stringify(mergedData));
          localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());

          // 上传合并后的数据到云端
          await uploadData(dataType, mergedData);
          hasChanges = true;

        } else if (cloudData && !localDataStr) {
          // 只有云端数据，下载到本地
          console.log(`📥 Downloading cloud data for ${dataType} (no local data)`);
          localStorage.setItem(storageKey, JSON.stringify(cloudData.data));
          const cloudTime = new Date(cloudData.updated_at).getTime();
          localStorage.setItem(`${storageKey}_timestamp`, cloudTime.toString());
          hasChanges = true;

        } else if (!cloudData && localDataStr) {
          // 只有本地数据，上传到云端
          console.log(`📤 Uploading local data for ${dataType} (no cloud data)`);
          const localData = JSON.parse(localDataStr);
          await uploadData(dataType, localData);
          localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
          hasChanges = true;
        }
      }

      setSyncStatus({
        syncing: false,
        lastSyncTime: Date.now(),
        error: null,
        pendingChanges: 0
      });

      console.log('✅ Smart merge completed successfully');

      // 如果有数据变化，恢复统计数据
      if (hasChanges) {
        // 从 userStats 恢复所有统计数据到独立的 localStorage 键
        const userStatsStr = localStorage.getItem('userStats');
        if (userStatsStr) {
          try {
            const stats = JSON.parse(userStatsStr);
            saveUserStats(stats);
            console.log('📊 Stats restored after merge:', stats);
          } catch (error) {
            console.error('Failed to restore stats:', error);
          }
        }

        // 标记需要刷新，但不立即刷新
        // 让用户在当前会话中继续使用，下次打开应用时会自动加载最新数据
        console.log('✅ Data merged successfully. Changes will be applied on next app launch.');

        // 如果确实需要立即刷新，可以取消下面的注释
        // 但注意：这会中断用户当前的操作
        // console.log('🔄 Data changed, reloading page in 1 second...');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    } catch (error: any) {
      console.error('❌ Smart merge failed:', error);
      setSyncStatus(prev => ({
        ...prev,
        syncing: false,
        error: error.message || 'Merge failed'
      }));
    } finally {
      syncInProgressRef.current = false;
    }
  }, [isAuthenticated, downloadData, uploadData]);

  // 自动同步（登录后）
  useEffect(() => {
    if (isAuthenticated && user) {
      const handleLoginSync = async () => {
        try {
          console.log('🔄 Starting login sync...');
          // 使用智能合并策略
          await smartMerge();
        } catch (error) {
          console.error('❌ Login sync failed:', error);
        }
      };

      // 延迟 2 秒后自动同步
      const timer = setTimeout(handleLoginSync, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, smartMerge]);

  return {
    syncStatus,
    uploadData,
    downloadData,
    syncAll,
    restoreAll,
    smartMerge,
    isEnabled: isAuthenticated
  };
};

