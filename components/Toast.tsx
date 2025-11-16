import React, { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 淡入动画
    setTimeout(() => setIsVisible(true), 10);

    // 自动关闭
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    // ESC 键关闭
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // 等待淡出动画完成
  };

  // 根据类型设置样式
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: '✓',
          iconBg: 'bg-green-600'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          icon: '✕',
          iconBg: 'bg-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          icon: '⚠',
          iconBg: 'bg-yellow-600'
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          icon: 'ℹ',
          iconBg: 'bg-blue-600'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`fixed top-4 right-4 left-4 sm:left-auto z-[100] flex items-center gap-3 ${styles.bg} text-white px-4 py-3 rounded-lg shadow-lg sm:min-w-[280px] max-w-md sm:max-w-md mx-auto sm:mx-0 transition-all duration-300 ${
        isVisible && !isExiting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2'
      }`}
      role="alert"
    >
      {/* 图标 */}
      <div className={`flex-shrink-0 w-6 h-6 ${styles.iconBg} rounded-full flex items-center justify-center font-bold text-sm`}>
        {styles.icon}
      </div>

      {/* 消息 */}
      <div className="flex-grow text-sm font-medium">
        {message}
      </div>

      {/* 关闭按钮 */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 w-5 h-5 hover:bg-white/20 rounded transition-colors flex items-center justify-center"
        aria-label="Close notification"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;

