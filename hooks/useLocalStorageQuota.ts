import { useState, useEffect, useCallback } from 'react';

interface QuotaInfo {
  used: number;
  total: number;
  percentage: number;
  isNearLimit: boolean;
}

export const useLocalStorageQuota = () => {
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo>({
    used: 0,
    total: 0,
    percentage: 0,
    isNearLimit: false
  });

  // 计算 LocalStorage 使用量
  const calculateUsage = useCallback(() => {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const value = localStorage.getItem(key);
          if (value) {
            // 计算字节数（UTF-16 编码，每个字符 2 字节）
            totalSize += (key.length + value.length) * 2;
          }
        }
      }

      // 大多数浏览器的 LocalStorage 限制是 5-10MB
      // 我们假设 5MB (5 * 1024 * 1024 bytes)
      const estimatedLimit = 5 * 1024 * 1024;
      const percentage = (totalSize / estimatedLimit) * 100;
      const isNearLimit = percentage > 80; // 超过 80% 视为接近限制

      setQuotaInfo({
        used: totalSize,
        total: estimatedLimit,
        percentage,
        isNearLimit
      });

      return { totalSize, estimatedLimit, percentage, isNearLimit };
    } catch (error) {
      console.error('Failed to calculate LocalStorage usage:', error);
      return null;
    }
  }, []);

  // 安全地设置 LocalStorage
  const safeSetItem = useCallback((key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      calculateUsage(); // 更新使用量
      return true;
    } catch (error) {
      if (error instanceof DOMException && (
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )) {
        console.error('LocalStorage quota exceeded!');
        // 可以在这里触发清理旧数据的逻辑
        return false;
      }
      console.error('Failed to set LocalStorage item:', error);
      return false;
    }
  }, [calculateUsage]);

  // 清理旧数据（可选）
  const cleanupOldData = useCallback(() => {
    try {
      // 示例：清理超过 30 天的历史记录
      const history = JSON.parse(localStorage.getItem('focusHistory') || '{}');
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const cleanedHistory: Record<string, number> = {};
      Object.entries(history).forEach(([date, count]) => {
        if (new Date(date) >= thirtyDaysAgo) {
          cleanedHistory[date] = count as number;
        }
      });

      localStorage.setItem('focusHistory', JSON.stringify(cleanedHistory));
      calculateUsage();
      return true;
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
      return false;
    }
  }, [calculateUsage]);

  // 格式化字节数
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  useEffect(() => {
    calculateUsage();
  }, [calculateUsage]);

  return {
    quotaInfo,
    calculateUsage,
    safeSetItem,
    cleanupOldData,
    formatBytes
  };
};

