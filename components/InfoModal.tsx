import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import { Achievement, Stats } from '../types';
import { ACHIEVEMENTS } from '../constants';
import AchievementCard from './AchievementCard';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyGoal: number;
  dailySessionsCompleted: number;
  weeklyProgress: { day: string; count: number; isToday: boolean }[];
  totalSessions: number;
  focusStreak: number;
  unlockedAchievements: string[];
  stats: Stats;
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${active ? 'bg-black/5' : 'opacity-60 hover:opacity-100 hover:bg-black/5'}`}>
        {children}
    </button>
);

const MilestonesTab: React.FC<{ unlocked: string[]; stats: Stats }> = ({ unlocked, stats }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'focus' | 'streak' | 'time' | 'task'>('all');

  // 过滤成就
  const filteredAchievements = ACHIEVEMENTS.filter(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    // 解锁状态过滤
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'locked' && isUnlocked) return false;

    // 分类过滤
    if (categoryFilter !== 'all' && ach.category !== categoryFilter) return false;

    return true;
  });

  // 统计信息
  const unlockedCount = ACHIEVEMENTS.filter(ach => unlocked.includes(ach.id)).length;
  const totalCount = ACHIEVEMENTS.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      {/* 统计信息 */}
      <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">成就进度</span>
          <span className="text-lg font-bold text-gray-800">{unlockedCount} / {totalCount}</span>
        </div>
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-center mt-1">
          <span className="text-xs font-medium text-gray-600">{percentage}% 完成</span>
        </div>
      </div>

      {/* 过滤器 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-black text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          全部 ({totalCount})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'unlocked' ? 'bg-green-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          已解锁 ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'locked' ? 'bg-gray-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          未解锁 ({totalCount - unlockedCount})
        </button>
      </div>

      {/* 分类过滤 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'all' ? 'bg-black text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          全部分类
        </button>
        <button
          onClick={() => setCategoryFilter('focus')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'focus' ? 'bg-green-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          专注
        </button>
        <button
          onClick={() => setCategoryFilter('streak')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'streak' ? 'bg-orange-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          连续
        </button>
        <button
          onClick={() => setCategoryFilter('time')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'time' ? 'bg-blue-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          时长
        </button>
        <button
          onClick={() => setCategoryFilter('task')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'task' ? 'bg-purple-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          任务
        </button>
      </div>

      {/* 成就列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(ach => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            isUnlocked={unlocked.includes(ach.id)}
            stats={stats}
          />
        ))}
      </div>

      {/* 空状态 */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 opacity-50">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium">没有符合条件的成就</p>
        </div>
      )}
    </div>
  );
};

const WeeklyProgressChart: React.FC<{ progress: { day: string; count: number; isToday: boolean }[], goal: number }> = ({ progress, goal }) => {
  const maxCount = Math.max(goal > 0 ? goal : 1, ...progress.map(p => p.count));
  return (
    <div className="flex justify-between items-end gap-2 h-32" style={{color: TEXT_COLOR}}>
      {progress.map((data, index) => (
        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative text-center">
          <div className="w-full h-full flex items-end justify-center">
            <div className="w-3/4 max-w-md bg-black/5 rounded-t-sm relative" style={{height: '100%'}}>
              <div className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ease-out ${data.isToday ? 'bg-current' : 'bg-current opacity-40'}`} style={{ height: `${maxCount > 0 ? (data.count / maxCount) * 100 : 0}%` }} />
            </div>
          </div>
          <span className={`text-xs font-medium ${data.isToday ? 'opacity-100 font-bold' : 'opacity-60'}`}>{data.day.slice(0, 1)}</span>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/70 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-300">
            {data.count} session{data.count !== 1 ? 's' : ''}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black/70 rotate-45"></div>
          </div>
        </div>
      ))}
    </div>
  );
};


const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, dailyGoal, dailySessionsCompleted, weeklyProgress, totalSessions, focusStreak, unlockedAchievements, stats }) => {
  const [activeTab, setActiveTab] = useState('progress');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl w-11/12 max-w-lg relative" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100 z-10" aria-label="Close information">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="flex border-b border-black/10 px-4">
            <TabButton active={activeTab === 'progress'} onClick={() => setActiveTab('progress')}>Progress</TabButton>
            <TabButton active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')}>Milestones</TabButton>
            <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>About</TabButton>
        </div>

        <div className="p-6 sm:p-8">
            {activeTab === 'progress' && (
                 <div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Today's Focus</h3>
                        {dailyGoal > 0 ? (
                            <div>
                                <p className="text-lg opacity-90">
                                    <span className="font-bold text-2xl" style={{color: TEXT_COLOR}}>{dailySessionsCompleted}</span> / {dailyGoal} sessions
                                </p>
                                {dailySessionsCompleted >= dailyGoal && (<p className="text-sm mt-1 font-medium" style={{color: TEXT_COLOR}}>Goal complete! ✨</p>)}
                            </div>
                        ) : (
                            <p className="opacity-80">You've completed <span className="font-bold">{dailySessionsCompleted}</span> focus sessions today.</p>
                        )}
                    </div>
                    
                    <div className="flex justify-around text-center mt-4">
                        <div><p className="font-bold text-2xl">{focusStreak}</p><p className="text-sm opacity-70">Day Streak</p></div>
                        <div><p className="font-bold text-2xl">{totalSessions}</p><p className="text-sm opacity-70">Total Sessions</p></div>
                    </div>

                    <div className="border-t border-black/10 pt-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">Weekly Progress</h3>
                        <WeeklyProgressChart progress={weeklyProgress} goal={dailyGoal} />
                    </div>
                </div>
            )}
            {activeTab === 'milestones' && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Your Milestones</h3>
                    <MilestonesTab unlocked={unlockedAchievements} stats={stats} />
                </div>
            )}
            {activeTab === 'about' && (
                <div>
                    <div className="space-y-4 text-center leading-relaxed opacity-80">
                        <h2 className="text-xl font-bold mb-2">🌿 A Gentle Place to Focus</h2>
                        <p>This is a minimal timer designed for those who find traditional Pomodoro apps too stimulating.</p>
                        <p>The soft colors, gentle sounds, and clean interface are here to quietly support you during your study and work time.</p>
                    </div>
                     <div className="border-t border-black/10 pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">Quick Tips</h3>
                      <div className="text-center opacity-80 space-y-2">
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">Space</kbd> to Play / Pause</p>
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">→</kbd> to Skip Session</p>
                      </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;