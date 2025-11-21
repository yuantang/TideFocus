import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

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
      const dataTypes: DataType[] = ['settings', 'history', 'tasks', 'achievements', 'stats'];

      for (const dataType of dataTypes) {
        // 使用映射的键名获取本地数据
        const storageKey = getStorageKey(dataType);
        const localDataStr = localStorage.getItem(storageKey);
        if (!localDataStr) continue;

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
    } catch (error: any) {
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

  // 智能合并云端和本地数据
  const smartMerge = useCallback(async () => {
    if (!isAuthenticated || syncInProgressRef.current) {
      return;
    }

    syncInProgressRef.current = true;
    setSyncStatus(prev => ({ ...prev, syncing: true, error: null }));

    try {
      const dataTypes: DataType[] = ['settings', 'history', 'tasks', 'achievements', 'stats'];

      for (const dataType of dataTypes) {
        const cloudData = await downloadData(dataType);
        const storageKey = getStorageKey(dataType);
        const localDataStr = localStorage.getItem(storageKey);

        if (cloudData && localDataStr) {
          // 都有数据，比较时间戳
          const cloudTime = new Date(cloudData.updated_at).getTime();
          const localTime = parseInt(localStorage.getItem(`${storageKey}_timestamp`) || '0');

          if (cloudTime > localTime) {
            // 云端更新，使用云端数据
            console.log(`📥 Using cloud data for ${dataType} (cloud: ${new Date(cloudTime).toISOString()}, local: ${new Date(localTime).toISOString()})`);
            localStorage.setItem(storageKey, JSON.stringify(cloudData.data));
            localStorage.setItem(`${storageKey}_timestamp`, cloudTime.toString());
          } else {
            // 本地更新，上传本地数据
            console.log(`📤 Uploading local data for ${dataType} (local: ${new Date(localTime).toISOString()}, cloud: ${new Date(cloudTime).toISOString()})`);
            const localData = JSON.parse(localDataStr);
            await uploadData(dataType, localData);
          }
        } else if (cloudData && !localDataStr) {
          // 只有云端数据
          console.log(`📥 Downloading cloud data for ${dataType} (no local data)`);
          localStorage.setItem(storageKey, JSON.stringify(cloudData.data));
          const cloudTime = new Date(cloudData.updated_at).getTime();
          localStorage.setItem(`${storageKey}_timestamp`, cloudTime.toString());
        } else if (!cloudData && localDataStr) {
          // 只有本地数据
          console.log(`📤 Uploading local data for ${dataType} (no cloud data)`);
          const localData = JSON.parse(localDataStr);
          await uploadData(dataType, localData);
        }
      }

      setSyncStatus({
        syncing: false,
        lastSyncTime: Date.now(),
        error: null,
        pendingChanges: 0
      });

      console.log('✅ Smart merge completed successfully');
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

