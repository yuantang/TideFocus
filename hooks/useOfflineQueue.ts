import { useEffect, useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { useCloudSync } from './useCloudSync';

interface QueuedOperation {
  id: string;
  dataType: 'settings' | 'history' | 'tasks' | 'achievements' | 'stats';
  data: any;
  timestamp: number;
  retryCount: number;
}

interface OfflineQueueState {
  isOnline: boolean;
  queueLength: number;
  isProcessing: boolean;
  lastProcessedTime: string | null;
}

const QUEUE_KEY = 'offline_sync_queue';
const MAX_RETRY_COUNT = 3;

export const useOfflineQueue = () => {
  const { isAuthenticated } = useAuth();
  const { uploadData } = useCloudSync();
  const [state, setState] = useState<OfflineQueueState>({
    isOnline: navigator.onLine,
    queueLength: 0,
    isProcessing: false,
    lastProcessedTime: null
  });

  // 获取队列
  const getQueue = useCallback((): QueuedOperation[] => {
    try {
      const queueStr = localStorage.getItem(QUEUE_KEY);
      return queueStr ? JSON.parse(queueStr) : [];
    } catch (error) {
      console.error('Error reading offline queue:', error);
      return [];
    }
  }, []);

  // 保存队列
  const saveQueue = useCallback((queue: QueuedOperation[]) => {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
      setState(prev => ({ ...prev, queueLength: queue.length }));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }, []);

  // 添加操作到队列
  const enqueue = useCallback((dataType: QueuedOperation['dataType'], data: any) => {
    const queue = getQueue();
    const operation: QueuedOperation = {
      id: `${dataType}_${Date.now()}`,
      dataType,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };

    // 如果队列中已有相同类型的操作，替换它（保留最新的）
    const existingIndex = queue.findIndex(op => op.dataType === dataType);
    if (existingIndex !== -1) {
      queue[existingIndex] = operation;
    } else {
      queue.push(operation);
    }

    saveQueue(queue);
    console.log('📥 Added to offline queue:', dataType);
  }, [getQueue, saveQueue]);

  // 处理队列
  const processQueue = useCallback(async () => {
    if (!isAuthenticated || !state.isOnline || state.isProcessing) {
      return;
    }

    const queue = getQueue();
    if (queue.length === 0) {
      return;
    }

    console.log('🔄 Processing offline queue:', queue.length, 'operations');
    setState(prev => ({ ...prev, isProcessing: true }));

    const remainingQueue: QueuedOperation[] = [];

    for (const operation of queue) {
      try {
        console.log('📤 Uploading queued operation:', operation.dataType);
        await uploadData(operation.dataType, operation.data);
        console.log('✅ Successfully uploaded:', operation.dataType);
      } catch (error) {
        console.error('❌ Failed to upload:', operation.dataType, error);
        
        // 增加重试次数
        operation.retryCount++;
        
        // 如果未超过最大重试次数，保留在队列中
        if (operation.retryCount < MAX_RETRY_COUNT) {
          remainingQueue.push(operation);
        } else {
          console.error('⚠️ Max retry count reached, discarding:', operation.dataType);
        }
      }
    }

    saveQueue(remainingQueue);
    setState(prev => ({
      ...prev,
      isProcessing: false,
      lastProcessedTime: new Date().toISOString()
    }));

    console.log('✅ Queue processing complete. Remaining:', remainingQueue.length);
  }, [isAuthenticated, state.isOnline, state.isProcessing, getQueue, saveQueue, uploadData]);

  // 清空队列
  const clearQueue = useCallback(() => {
    saveQueue([]);
    console.log('🗑️ Offline queue cleared');
  }, [saveQueue]);

  // 监听在线/离线状态
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Network online');
      setState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      console.log('📴 Network offline');
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 网络恢复时自动处理队列
  useEffect(() => {
    if (state.isOnline && isAuthenticated && !state.isProcessing) {
      const queue = getQueue();
      if (queue.length > 0) {
        console.log('🌐 Network restored, processing queue...');
        processQueue();
      }
    }
  }, [state.isOnline, isAuthenticated, state.isProcessing, getQueue, processQueue]);

  // 初始化时更新队列长度
  useEffect(() => {
    const queue = getQueue();
    setState(prev => ({ ...prev, queueLength: queue.length }));
  }, [getQueue]);

  return {
    isOnline: state.isOnline,
    queueLength: state.queueLength,
    isProcessing: state.isProcessing,
    lastProcessedTime: state.lastProcessedTime,
    enqueue,
    processQueue,
    clearQueue
  };
};

