import React, { useEffect, useState } from 'react';
import { Achievement } from '../types';

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({ achievement, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isOpen && achievement) {
      // 淡入动画
      setTimeout(() => setIsVisible(true), 10);
      
      // 生成彩带
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1
      }));
      setConfetti(newConfetti);
      
      // 自动关闭
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setConfetti([]);
    }
  }, [isOpen, achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen || !achievement) return null;

  // 渲染图标
  const renderIcon = () => {
    if (typeof achievement.icon === 'string') {
      return <span className="text-8xl">{achievement.icon}</span>;
    } else {
      const IconComponent = achievement.icon;
      return <IconComponent className="w-24 h-24" />;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* 彩带动画 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute w-2 h-8 bg-gradient-to-b from-yellow-400 via-pink-500 to-purple-500 rounded-full animate-fall"
            style={{
              left: `${item.left}%`,
              top: '-10%',
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
      
      {/* 成就卡片 */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 光晕效果 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
        
        {/* 内容 */}
        <div className="relative">
          {/* 标题 */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              🎉 成就解锁！
            </h2>
          </div>
          
          {/* 图标 */}
          <div className="flex justify-center mb-6 animate-bounce-slow">
            {renderIcon()}
          </div>
          
          {/* 成就名称 */}
          <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
            {achievement.name}
          </h3>
          
          {/* 成就描述 */}
          <p className="text-center text-gray-600 mb-6">
            {achievement.description}
          </p>
          
          {/* 关闭按钮 */}
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            太棒了！
          </button>
        </div>
      </div>
      
      {/* CSS 动画 */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fall {
          animation: fall linear forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AchievementUnlockModal;

