import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export type DataType = 'settings' | 'history' | 'tasks' | 'achievements' | 'stats';

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
        // 获取本地数据
        const localDataStr = localStorage.getItem(dataType);
        if (!localDataStr) continue;

        const localData = JSON.parse(localDataStr);
        
        // 上传到云端
        await uploadData(dataType, localData);
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
          // 保存到本地
          localStorage.setItem(dataType, JSON.stringify(cloudData.data));
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

  // 自动同步（登录后）
  useEffect(() => {
    if (isAuthenticated && user) {
      // 延迟 2 秒后自动同步
      const timer = setTimeout(() => {
        syncAll();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, syncAll]);

  return {
    syncStatus,
    uploadData,
    downloadData,
    syncAll,
    restoreAll,
    isEnabled: isAuthenticated
  };
};

