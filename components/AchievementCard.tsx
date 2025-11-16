import React from 'react';
import { Achievement, Stats } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  stats: Stats;
  unlockedAt?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isUnlocked, stats, unlockedAt }) => {
  const progress = achievement.progress ? achievement.progress(stats) : null;
  
  // 获取分类颜色
  const getCategoryColor = () => {
    switch (achievement.category) {
      case 'focus':
        return 'from-green-400 to-emerald-500';
      case 'streak':
        return 'from-orange-400 to-red-500';
      case 'time':
        return 'from-blue-400 to-indigo-500';
      case 'task':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };
  
  // 获取分类标签
  const getCategoryLabel = () => {
    switch (achievement.category) {
      case 'focus':
        return '专注';
      case 'streak':
        return '连续';
      case 'time':
        return '时长';
      case 'task':
        return '任务';
      default:
        return '';
    }
  };
  
  // 渲染图标
  const renderIcon = () => {
    if (typeof achievement.icon === 'string') {
      // Emoji
      return <span className="text-4xl">{achievement.icon}</span>;
    } else {
      // React Component
      const IconComponent = achievement.icon;
      return <IconComponent className="w-12 h-12" />;
    }
  };
  
  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        isUnlocked
          ? 'bg-white border-black/10 shadow-md hover:shadow-lg'
          : 'bg-black/5 border-black/5 opacity-60'
      }`}
    >
      {/* 解锁标记 */}
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>
      )}
      
      {/* 分类标签 */}
      <div className="absolute top-2 left-2">
        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor()} text-white font-medium`}>
          {getCategoryLabel()}
        </span>
      </div>
      
      {/* 图标 */}
      <div className="flex justify-center mt-6 mb-3">
        <div className={`${isUnlocked ? '' : 'grayscale opacity-50'}`}>
          {renderIcon()}
        </div>
      </div>
      
      {/* 名称 */}
      <h3 className={`text-center font-bold text-lg mb-1 ${isUnlocked ? 'text-black' : 'text-black/50'}`}>
        {achievement.name}
      </h3>
      
      {/* 描述 */}
      <p className={`text-center text-sm mb-3 ${isUnlocked ? 'text-black/70' : 'text-black/40'}`}>
        {achievement.description}
      </p>
      
      {/* 进度条 */}
      {progress && !isUnlocked && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-black/60">进度</span>
            <span className="text-xs font-medium text-black/80">
              {progress.current} / {progress.total}
            </span>
          </div>
          <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getCategoryColor()} transition-all duration-500`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="text-center mt-1">
            <span className="text-xs font-medium text-black/70">
              {Math.round(progress.percentage)}%
            </span>
          </div>
        </div>
      )}
      
      {/* 解锁时间 */}
      {isUnlocked && unlockedAt && (
        <div className="mt-3 pt-3 border-t border-black/10">
          <p className="text-xs text-center text-black/50">
            解锁于 {new Date(unlockedAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      )}
      
      {/* 未解锁遮罩 */}
      {!isUnlocked && (
        <div className="absolute inset-0 rounded-xl bg-black/5 pointer-events-none" />
      )}
    </div>
  );
};

export default AchievementCard;

