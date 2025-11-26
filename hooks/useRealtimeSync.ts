import { useEffect, useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { RealtimeChannel } from '@supabase/supabase-js';

export type DataType = 'settings' | 'history' | 'tasks' | 'achievements' | 'stats';

interface RealtimeUpdate {
  dataType: DataType;
  data: any;
  version: number;
  timestamp: string;
}

interface RealtimeSyncState {
  isConnected: boolean;
  lastUpdate: string | null;
  error: string | null;
}

export const useRealtimeSync = () => {
  const { user, isAuthenticated } = useAuth();
  const [syncState, setSyncState] = useState<RealtimeSyncState>({
    isConnected: false,
    lastUpdate: null,
    error: null
  });
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // 处理实时更新
  const handleRealtimeUpdate = useCallback((payload: any) => {
    console.log('📡 Realtime update received:', payload);

    const { new: newRecord, old: oldRecord, eventType } = payload;

    if (!newRecord) return;

    const dataType = newRecord.data_type as DataType;
    const data = newRecord.data;
    const version = newRecord.version;

    // 检查是否是自己的更新（避免循环）
    const currentVersion = localStorage.getItem(`${dataType}_version`);
    if (currentVersion && parseInt(currentVersion) >= version) {
      console.log('⏭️ Skipping update (already have this version or newer)');
      return;
    }

    // 更新本地数据
    try {
      switch (dataType) {
        case 'settings':
          // 更新所有设置到 localStorage
          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
          });
          break;

        case 'history':
          localStorage.setItem('history', JSON.stringify(data));
          break;

        case 'tasks':
          localStorage.setItem('tasks', JSON.stringify(data));
          break;

        case 'achievements':
          localStorage.setItem('unlockedAchievements', JSON.stringify(data.unlocked || []));
          break;

        case 'stats':
          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, String(value));
          });
          break;
      }

      // 更新版本号
      localStorage.setItem(`${dataType}_version`, String(version));

      setSyncState(prev => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
        error: null
      }));

      // 注意：不自动刷新页面，避免循环刷新问题
      // 用户可以手动刷新页面来查看最新数据
      // 或者在下次打开应用时会自动加载最新数据
      console.log(`✅ Data updated for ${dataType}, version ${version}. Refresh page to see changes.`);

      // 如果需要自动刷新，可以取消下面的注释
      // 但要注意：这可能导致循环刷新问题
      // if (eventType === 'UPDATE' || eventType === 'INSERT') {
      //   console.log('🔄 Data updated, reloading page...');
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 500);
      // }
    } catch (error) {
      console.error('Error applying realtime update:', error);
      setSyncState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, []);

  // 订阅实时更新
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // 清理连接
      if (channel) {
        channel.unsubscribe();
        setChannel(null);
      }
      setSyncState({
        isConnected: false,
        lastUpdate: null,
        error: null
      });
      return;
    }

    console.log('📡 Setting up realtime subscription for user:', user.id);

    // 创建频道
    const realtimeChannel = supabase
      .channel(`user_data:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_data',
          filter: `user_id=eq.${user.id}`
        },
        handleRealtimeUpdate
      )
      .subscribe((status) => {
        console.log('📡 Realtime subscription status:', status);
        setSyncState(prev => ({
          ...prev,
          isConnected: status === 'SUBSCRIBED',
          error: status === 'CHANNEL_ERROR' ? 'Connection error' : null
        }));
      });

    setChannel(realtimeChannel);

    // 清理函数
    return () => {
      console.log('📡 Cleaning up realtime subscription');
      realtimeChannel.unsubscribe();
    };
  }, [isAuthenticated, user, handleRealtimeUpdate]);

  return {
    isConnected: syncState.isConnected,
    lastUpdate: syncState.lastUpdate,
    error: syncState.error
  };
};

