import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';
import { Achievement, Stats } from '../types';
import { getLocalizedAchievements } from '../constants';
import AchievementCard from './AchievementCard';
import { getTranslations, getCurrentLanguage, getWeekdayName, type Language } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { useCloudSync } from '../hooks/useCloudSync';
import { useRealtimeSync } from '../hooks/useRealtimeSync';
import { useOfflineQueue } from '../hooks/useOfflineQueue';

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

// 日期导航组件
const DateNavigator: React.FC<{
  viewType: 'day' | 'week' | 'month';
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}> = ({ viewType, currentDate, onPrevious, onNext, onToday }) => {
  const t = getTranslations();
  const lang = getCurrentLanguage();

  // 根据语言获取 locale
  const getLocale = () => {
    switch (lang) {
      case 'zh-CN': return 'zh-CN';
      case 'zh-TW': return 'zh-TW';
      case 'ja': return 'ja-JP';
      case 'ko': return 'ko-KR';
      case 'en': return 'en-US';
      case 'es': return 'es-ES';
      default: return 'en-US';
    }
  };

  const locale = getLocale();

  const formatDate = () => {
    if (viewType === 'day') {
      return currentDate.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    } else if (viewType === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
    }
  };

  const isToday = () => {
    const today = new Date();
    if (viewType === 'day') {
      return currentDate.toDateString() === today.toDateString();
    } else if (viewType === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return today >= weekStart && today <= weekEnd;
    } else {
      return currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
      <button
        onClick={onPrevious}
        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        aria-label="上一个"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">{formatDate()}</span>
        {!isToday() && (
          <button
            onClick={onToday}
            className="px-3 py-1 text-xs font-medium bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
          >
            {t.today}
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        aria-label="下一个"
        disabled={isToday()}
      >
        <svg className={`w-5 h-5 ${isToday() ? 'opacity-30' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const MilestonesTab: React.FC<{ unlocked: string[]; stats: Stats }> = ({ unlocked, stats }) => {
  const t = getTranslations();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'focus' | 'streak' | 'time' | 'task'>('all');

  // 获取本地化的成就列表
  const ACHIEVEMENTS = getLocalizedAchievements();

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

  // 找到最接近解锁的成就
  const closestAchievement = ACHIEVEMENTS
    .filter(ach => !unlocked.includes(ach.id) && ach.progress)
    .map(ach => ({
      achievement: ach,
      progress: ach.progress!(stats)
    }))
    .sort((a, b) => b.progress.percentage - a.progress.percentage)[0];

  return (
    <div className="space-y-4">
      {/* 统计信息 */}
      <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{t.achievementProgress}</span>
          <span className="text-lg font-bold text-gray-800">{unlockedCount} / {totalCount}</span>
        </div>
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-center mt-1">
          <span className="text-xs font-medium text-gray-600">{percentage}% {t.tasks.completed}</span>
        </div>
      </div>

      {/* 最接近解锁的成就提示 */}
      {closestAchievement && closestAchievement.progress.percentage > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎯</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 mb-1">{t.upcomingAchievement}</div>
              <div className="text-base font-bold text-gray-800">{closestAchievement.achievement.name}</div>
              <div className="text-xs text-gray-600 mt-1">{closestAchievement.achievement.description}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${closestAchievement.progress.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {closestAchievement.progress.current} / {closestAchievement.progress.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 过滤器 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-black text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementFilters.all} ({totalCount})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'unlocked' ? 'bg-green-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementFilters.unlocked} ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'locked' ? 'bg-gray-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementFilters.locked} ({totalCount - unlockedCount})
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
          {t.achievementFilters.allCategories}
        </button>
        <button
          onClick={() => setCategoryFilter('focus')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'focus' ? 'bg-green-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementCategories.focus}
        </button>
        <button
          onClick={() => setCategoryFilter('streak')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'streak' ? 'bg-orange-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementCategories.streak}
        </button>
        <button
          onClick={() => setCategoryFilter('time')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'time' ? 'bg-blue-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementCategories.time}
        </button>
        <button
          onClick={() => setCategoryFilter('task')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            categoryFilter === 'task' ? 'bg-purple-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
          }`}
        >
          {t.achievementCategories.task}
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
          <p className="text-lg font-medium">{t.noAchievements}</p>
        </div>
      )}
    </div>
  );
};

const WeeklyProgressChart: React.FC<{ progress: { day: string; count: number; isToday: boolean }[], goal: number }> = ({ progress, goal }) => {
  const maxCount = Math.max(goal > 0 ? goal : 1, ...progress.map((p: { count: number }) => p.count));
  return (
    <div className="flex justify-between items-end gap-2 h-32" style={{color: TEXT_COLOR}}>
      {progress.map((data: { day: string; count: number; isToday: boolean }, index: number) => (
        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative text-center">
          <div className="w-full h-full flex items-end justify-center">
            <div className="w-3/4 max-w-md bg-black/5 rounded-t-sm relative" style={{height: '100%'}}>
              <div className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ease-out ${data.isToday ? 'bg-current' : 'bg-current opacity-40'}`} style={{ height: `${maxCount > 0 ? (data.count / maxCount) * 100 : 0}%` }} />
            </div>
          </div>
          <span className={`text-xs font-medium ${data.isToday ? 'opacity-100 font-bold' : 'opacity-60'}`}>{data.day}</span>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/70 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-300 whitespace-nowrap">
            {data.count} {getTranslations().units.sessions}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black/70 rotate-45"></div>
          </div>
        </div>
      ))}
    </div>
  );
};



// 时段分布热力图组件
const TimeDistributionHeatmap: React.FC<{ stats: Stats }> = ({ stats }) => {
  const t = getTranslations();
  // 模拟时段数据（实际应该从 localStorage 读取详细的时段记录）
  const timeSlots = [
    { hour: '00-06', label: t.timeSlots.lateNight, sessions: stats.nightSessions, color: 'from-indigo-400 to-purple-500' },
    { hour: '06-09', label: t.timeSlots.earlyMorning, sessions: stats.morningSessions, color: 'from-orange-400 to-yellow-500' },
    { hour: '09-12', label: t.timeSlots.morning, sessions: Math.floor(stats.totalSessions * 0.25), color: 'from-blue-400 to-cyan-500' },
    { hour: '12-14', label: t.timeSlots.noon, sessions: Math.floor(stats.totalSessions * 0.1), color: 'from-green-400 to-teal-500' },
    { hour: '14-18', label: t.timeSlots.afternoon, sessions: Math.floor(stats.totalSessions * 0.3), color: 'from-pink-400 to-rose-500' },
    { hour: '18-24', label: t.timeSlots.evening, sessions: Math.floor(stats.totalSessions * 0.2), color: 'from-violet-400 to-purple-500' },
  ];

  const maxSessions = Math.max(...timeSlots.map(slot => slot.sessions), 1);

  return (
    <div className="space-y-3">
      {timeSlots.map((slot, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-xs font-medium text-gray-600">{slot.hour}</div>
          <div className="flex-1">
            <div className="h-8 bg-black/5 rounded-lg overflow-hidden relative">
              <div
                className={`h-full bg-gradient-to-r ${slot.color} transition-all duration-500 flex items-center justify-end pr-2`}
                style={{ width: `${(slot.sessions / maxSessions) * 100}%` }}
              >
                {slot.sessions > 0 && (
                  <span className="text-xs font-bold text-white">{slot.sessions}</span>
                )}
              </div>
            </div>
          </div>
          <div className="w-12 text-xs text-gray-600">{slot.label}</div>
        </div>
      ))}
    </div>
  );
};

// 月度统计组件
const MonthlyStatsView: React.FC<{ stats: Stats }> = ({ stats }) => {
  const t = getTranslations();
  return (
    <div className="space-y-4">
      {/* 总览卡片 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-100">
          <div className="text-3xl font-bold text-blue-600">{stats.totalSessions}</div>
          <div className="text-sm text-blue-700 mt-1">{t.totalSessions}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-100">
          <div className="text-3xl font-bold text-purple-600">{Math.floor(stats.totalFocusMinutes / 60)}h {stats.totalFocusMinutes % 60}m</div>
          <div className="text-sm text-purple-700 mt-1">{t.csvHeaders.totalMinutes}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-100">
          <div className="text-3xl font-bold text-green-600">{stats.completedTasks}</div>
          <div className="text-sm text-green-700 mt-1">{t.completedTasks}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-100">
          <div className="text-3xl font-bold text-orange-600">{stats.focusStreak}</div>
          <div className="text-sm text-orange-700 mt-1">{t.streakDays}</div>
        </div>
      </div>

      {/* 时段分布热力图 */}
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-5 border border-indigo-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="text-lg">🕐</span>
          {t.timeDistribution}
        </h4>
        <TimeDistributionHeatmap stats={stats} />
      </div>

      {/* 个人记录 */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-5 border border-yellow-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-lg">🏆</span>
          {t.personalRecords}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="text-sm text-gray-700">{t.longestSession}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{stats.longestSession} {t.units.minutes}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span className="text-sm text-gray-700">{t.perfectWeeks}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{stats.perfectWeeks} {t.units.weeks}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-sm text-gray-700">{t.csvHeaders.goalStreakDays}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{stats.goalStreakDays} {t.units.days}</span>
          </div>
        </div>
      </div>


    </div>
  );
};

// 账号管理标签页
const AccountTab: React.FC = () => {
  const t = getTranslations();
  const { user, isAuthenticated, signIn, signUp, signOut, resetPassword, updatePassword } = useAuth();
  const { syncStatus, syncAll, restoreAll } = useCloudSync();
  const { isConnected: realtimeConnected } = useRealtimeSync();
  const { isOnline, queueLength } = useOfflineQueue();

  const [mode, setMode] = useState<'login' | 'register' | 'reset' | 'account'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 如果已登录，显示账号管理界面
  useEffect(() => {
    if (isAuthenticated && user) {
      setMode('account');
    } else {
      setMode('login');
    }
  }, [isAuthenticated, user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        setMessage({ type: 'success', text: t.accountTab.loginSuccess });
      } else if (mode === 'register') {
        await signUp(email, password, displayName);
        setMessage({ type: 'success', text: t.accountTab.registerSuccess });
        setTimeout(() => setMode('login'), 2000);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setMessage({ type: 'success', text: t.accountTab.resetPasswordSuccess });
        setTimeout(() => setMode('login'), 2000);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || t.accountTab.operationFailed });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t.accountTab.passwordMismatch });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: t.accountTab.minPasswordLength });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await updatePassword(newPassword);
      setMessage({ type: 'success', text: t.accountTab.passwordChanged });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.accountTab.operationFailed });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!confirm(t.accountTab.signOutConfirm)) return;

    setLoading(true);
    try {
      await signOut();
      setMessage({ type: 'success', text: t.accountTab.signedOut });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.accountTab.signOutFailed });
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await syncAll();
      setMessage({ type: 'success', text: t.accountTab.syncSuccess });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.accountTab.syncFailed });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!confirm(t.accountTab.restoreConfirm)) return;

    setLoading(true);
    setMessage(null);
    try {
      await restoreAll();
      setMessage({ type: 'success', text: t.accountTab.restoreSuccess });
      setTimeout(() => window.location.reload(), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.accountTab.restoreFailed });
    } finally {
      setLoading(false);
    }
  };

  // 未登录状态 - 显示登录/注册界面
  if (!isAuthenticated || mode !== 'account') {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-md font-semibold opacity-80 mb-2">{t.accountTab.cloudSync}</h3>
          <p className="text-xs opacity-60">{t.accountTab.loginToSync}</p>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        {/* 标签切换 */}
        <div className="flex gap-2 p-1 bg-black/5 rounded-lg">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              mode === 'login' ? 'bg-white/80 shadow-sm' : 'hover:bg-white/40'
            }`}
          >
            {t.accountTab.login}
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              mode === 'register' ? 'bg-white/80 shadow-sm' : 'hover:bg-white/40'
            }`}
          >
            {t.accountTab.register}
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleAuth} className="space-y-3 bg-black/5 p-4 rounded-lg">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.accountTab.displayName}
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
                placeholder={t.accountTab.displayName}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              {t.accountTab.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
              placeholder="your@email.com"
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.accountTab.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
                placeholder={t.accountTab.minPasswordLength}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#6b5a5a] text-white rounded-md font-medium hover:bg-[#5a4a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? t.accountTab.processing : mode === 'login' ? t.accountTab.loginButton : mode === 'register' ? t.accountTab.registerButton : t.accountTab.resetPasswordButton}
          </button>
        </form>

        {/* 底部链接 */}
        <div className="text-center text-sm">
          {mode === 'login' && (
            <button
              onClick={() => setMode('reset')}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {t.accountTab.forgotPassword}
            </button>
          )}
          {mode === 'reset' && (
            <button
              onClick={() => setMode('login')}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {t.accountTab.backToLogin}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 已登录状态 - 显示账号管理界面
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* 消息提示 */}
      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* 用户信息 */}
      <div>
        <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.accountTab.userInfo}</h3>
        <div className="bg-black/5 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#6b5a5a] rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">
                {user?.user_metadata?.display_name || user?.email?.split('@')[0]}
              </div>
              <div className="text-sm opacity-60 truncate">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 同步状态 */}
      <div>
        <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.accountTab.syncStatus}</h3>
        <div className="bg-black/5 p-4 rounded-lg space-y-3">
          {/* 网络状态 */}
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-70">{t.accountTab.networkStatus}</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-600' : 'bg-orange-600'}`} />
              <span className="font-medium">{isOnline ? t.accountTab.online : t.accountTab.offline}</span>
            </div>
          </div>

          {/* 实时同步状态 */}
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-70">{t.accountTab.realtimeSync}</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-green-600' : 'bg-gray-400'}`} />
              <span className="font-medium">{realtimeConnected ? t.accountTab.connected : t.accountTab.disconnected}</span>
            </div>
          </div>

          {/* 离线队列 */}
          {queueLength > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-70">{t.accountTab.pendingSync}</span>
              <span className="font-medium text-orange-600">{queueLength} {t.accountTab.items}</span>
            </div>
          )}

          {/* 最后同步时间 */}
          {syncStatus.lastSyncTime && (
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-70">{t.accountTab.lastSync}</span>
              <span className="opacity-60">
                {new Date(syncStatus.lastSyncTime).toLocaleString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}

          {/* 同步操作按钮 */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSync}
              disabled={loading || !isOnline}
              className="flex-1 py-2 px-3 bg-[#6b5a5a] text-white rounded-md text-sm font-medium hover:bg-[#5a4a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncStatus.syncing ? t.accountTab.syncing : t.accountTab.syncNow}
            </button>
            <button
              onClick={handleRestore}
              disabled={loading || !isOnline}
              className="flex-1 py-2 px-3 bg-white/50 border border-black/10 rounded-md text-sm font-medium hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.accountTab.restoreFromCloud}
            </button>
          </div>
        </div>
      </div>

      {/* 修改密码 */}
      <div>
        <h3 className="text-md font-semibold opacity-80 text-center mb-3">{t.accountTab.changePassword}</h3>
        <form onSubmit={handlePasswordChange} className="bg-black/5 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t.accountTab.newPassword}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
              placeholder={t.accountTab.minPasswordLength}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t.accountTab.confirmPassword}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
              placeholder={t.accountTab.confirmPassword}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !newPassword || !confirmPassword}
            className="w-full py-2 bg-[#6b5a5a] text-white rounded-md text-sm font-medium hover:bg-[#5a4a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.accountTab.processing : t.accountTab.changePassword}
          </button>
        </form>
      </div>

      {/* 退出登录 */}
      <div className="text-center pt-2">
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="text-sm opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t.accountTab.signOut}
        </button>
      </div>
    </div>
  );
};


const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, dailyGoal, dailySessionsCompleted, weeklyProgress, totalSessions, focusStreak, unlockedAchievements, stats }) => {
  const [activeTab, setActiveTab] = useState('progress');
  const [progressView, setProgressView] = useState<'daily' | 'monthly'>('daily');
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState<{
    weeklyProgress: { day: string; count: number; isToday: boolean }[];
    dailySessionsCompleted: number;
    totalSessions: number;
    totalMinutes: number;
  }>({
    weeklyProgress: weeklyProgress,
    dailySessionsCompleted: dailySessionsCompleted,
    totalSessions: totalSessions,
    totalMinutes: stats.totalFocusMinutes
  });

  // 计算历史数据
  useEffect(() => {
    if (!isOpen) return;

    const history = JSON.parse(localStorage.getItem('focusHistory') || '{}');

    if (viewType === 'day') {
      // 单日数据
      const dateStr = selectedDate.toISOString().split('T')[0];
      const dayCount = history[dateStr] || 0;
      setHistoricalData({
        weeklyProgress: [{ day: getWeekdayName(selectedDate.getDay(), true), count: dayCount, isToday: false }],
        dailySessionsCompleted: dayCount,
        totalSessions: dayCount,
        totalMinutes: dayCount * 25 // 估算
      });
    } else if (viewType === 'week') {
      // 周数据
      const weekStart = new Date(selectedDate);
      weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());

      const progressData = [];
      let weekTotal = 0;
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const count = history[dateStr] || 0;
        weekTotal += count;
        progressData.push({
          day: getWeekdayName(date.getDay(), true),
          count: count,
          isToday: date.toDateString() === new Date().toDateString()
        });
      }

      setHistoricalData({
        weeklyProgress: progressData,
        dailySessionsCompleted: history[new Date().toISOString().split('T')[0]] || 0,
        totalSessions: weekTotal,
        totalMinutes: weekTotal * 25 // 估算
      });
    } else {
      // 月数据
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let monthTotal = 0;
      const weeklyData: { [key: number]: number } = {};

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const count = history[dateStr] || 0;
        monthTotal += count;

        const weekNum = Math.floor((day - 1) / 7);
        weeklyData[weekNum] = (weeklyData[weekNum] || 0) + count;
      }

      const t = getTranslations();
      const progressData = Object.keys(weeklyData).map((weekNum) => ({
        day: t.weekLabel.replace('{week}', String(parseInt(weekNum) + 1)),
        count: weeklyData[parseInt(weekNum)],
        isToday: false
      }));

      setHistoricalData({
        weeklyProgress: progressData,
        dailySessionsCompleted: history[new Date().toISOString().split('T')[0]] || 0,
        totalSessions: monthTotal,
        totalMinutes: monthTotal * 25 // 估算
      });
    }
  }, [isOpen, viewType, selectedDate, weeklyProgress, dailySessionsCompleted, totalSessions, stats.totalFocusMinutes]);

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    if (viewType === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    if (viewType === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    // 不能超过今天
    if (newDate <= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  if (!isOpen) {
    return null;
  }

  const t = getTranslations();

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl w-11/12 max-w-2xl flex flex-col relative" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR, height: '85vh', maxHeight: '700px' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100 z-10" aria-label="Close information">
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="flex border-b border-black/10 px-4 flex-shrink-0">
            <TabButton active={activeTab === 'progress'} onClick={() => setActiveTab('progress')}>{t.progress}</TabButton>
            <TabButton active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')}>{t.milestones}</TabButton>
            <TabButton active={activeTab === 'account'} onClick={() => setActiveTab('account')}>{t.account}</TabButton>
            <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>{t.about}</TabButton>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0">
            {activeTab === 'progress' && (
                 <div>
                    {/* 视图类型选择器 */}
                    <div className="flex gap-2 mb-4 justify-center">
                      <button
                        onClick={() => { setViewType('day'); setProgressView('daily'); }}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          viewType === 'day' ? 'bg-blue-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
                        }`}
                      >
                        📅 {t.dayView}
                      </button>
                      <button
                        onClick={() => { setViewType('week'); setProgressView('daily'); }}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          viewType === 'week' ? 'bg-blue-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
                        }`}
                      >
                        📊 {t.weekView}
                      </button>
                      <button
                        onClick={() => { setViewType('month'); setProgressView('monthly'); }}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          viewType === 'month' ? 'bg-blue-500 text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'
                        }`}
                      >
                        📈 {t.monthView}
                      </button>
                    </div>

                    {/* 日期导航 */}
                    <DateNavigator
                      viewType={viewType}
                      currentDate={selectedDate}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      onToday={handleToday}
                    />

                    {/* 每日视图 */}
                    {progressView === 'daily' && (
                      <div className="space-y-4">
                        {/* 专注卡片 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
                          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="text-lg">📅</span>
                            {viewType === 'day' ? t.currentDayFocus : viewType === 'week' ? t.currentWeekFocus : t.currentMonthFocus}
                          </h3>
                          <div className="text-center">
                            {viewType === 'day' ? (
                              <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">{historicalData.dailySessionsCompleted}</div>
                                <p className="text-sm text-gray-600">{t.focusCount}</p>
                                {dailyGoal > 0 && historicalData.dailySessionsCompleted >= dailyGoal && (
                                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <span>✨</span>
                                    <span>{t.goalAchieved}</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">{historicalData.totalSessions}</div>
                                <p className="text-sm text-gray-600">{t.totalFocusCount}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 关键指标卡片 */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center border border-orange-100">
                            <div className="text-3xl font-bold text-orange-600">{focusStreak}</div>
                            <div className="text-sm text-orange-700 mt-1">{t.streakDays}</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-100">
                            <div className="text-3xl font-bold text-purple-600">{totalSessions}</div>
                            <div className="text-sm text-purple-700 mt-1">{t.totalSessions}</div>
                          </div>
                        </div>

                        {/* 进度图表 */}
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-5 border border-green-100">
                          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            {viewType === 'day' ? t.currentDayProgress : viewType === 'week' ? t.currentWeekProgress : t.currentMonthProgress}
                          </h3>
                          <WeeklyProgressChart progress={historicalData.weeklyProgress} goal={dailyGoal} />
                        </div>

                        {/* 快速统计 */}
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-5 border border-yellow-100">
                          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="text-lg">⚡</span>
                            {t.quickStats}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{t.totalTime}</span>
                              <span className="text-sm font-bold text-gray-800">
                                {Math.floor(historicalData.totalMinutes / 60)}h {historicalData.totalMinutes % 60}m
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{t.totalFocus}</span>
                              <span className="text-sm font-bold text-gray-800">{historicalData.totalSessions}{t.units.times}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{t.averagePerDay}</span>
                              <span className="text-sm font-bold text-gray-800">
                                {viewType === 'week' ? Math.round(historicalData.totalSessions / 7) : viewType === 'month' ? Math.round(historicalData.totalSessions / 30) : historicalData.totalSessions}{t.units.times}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{t.streakCount}</span>
                              <span className="text-sm font-bold text-gray-800">{focusStreak}{t.units.days}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 月度统计视图 */}
                    {progressView === 'monthly' && (
                      <MonthlyStatsView stats={stats} />
                    )}
                </div>
            )}
            {activeTab === 'milestones' && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">{t.yourMilestones}</h3>
                    <MilestonesTab unlocked={unlockedAchievements} stats={stats} />
                </div>
            )}
            {activeTab === 'account' && <AccountTab />}
            {activeTab === 'about' && (
                <div>
                    <div className="space-y-4 text-center leading-relaxed">
                        <h1 className="text-3xl font-bold mb-1">{t.aboutTitle}</h1>
                        <h2 className="text-xl font-semibold mb-4 opacity-70">🌊 {t.aboutContent.subtitle}</h2>
                        <p className="opacity-80">{t.aboutContent.description1}</p>
                        <p className="opacity-80">{t.aboutContent.description2}</p>

                        {/* 版本信息 */}
                        <div className="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-100 mt-4">
                          <span className="text-sm font-semibold text-indigo-700">
                            {t.aboutContent.version} {t.aboutContent.versionNumber}
                          </span>
                        </div>
                    </div>

                    {/* 核心特性 */}
                    <div className="border-t border-black/10 pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">{t.aboutContent.features}</h3>
                      <div className="space-y-3 text-left opacity-90">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{t.aboutContent.feature1.split(' - ')[0]}</span>
                          <span className="flex-1">{t.aboutContent.feature1.split(' - ')[1]}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{t.aboutContent.feature2.split(' - ')[0]}</span>
                          <span className="flex-1">{t.aboutContent.feature2.split(' - ')[1]}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{t.aboutContent.feature3.split(' - ')[0]}</span>
                          <span className="flex-1">{t.aboutContent.feature3.split(' - ')[1]}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{t.aboutContent.feature4.split(' - ')[0]}</span>
                          <span className="flex-1">{t.aboutContent.feature4.split(' - ')[1]}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{t.aboutContent.feature5.split(' - ')[0]}</span>
                          <span className="flex-1">{t.aboutContent.feature5.split(' - ')[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* 快捷提示 */}
                    <div className="border-t border-black/10 pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">{t.aboutContent.quickTips}</h3>
                      <div className="text-center opacity-80 space-y-2">
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">Space</kbd> {t.aboutContent.tip1}</p>
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">→</kbd> {t.aboutContent.tip2}</p>
                      </div>
                    </div>

                    {/* 联系方式 */}
                    <div className="border-t border-black/10 pt-6 mt-6 text-center">
                      <h3 className="text-lg font-semibold mb-3">{t.aboutContent.contact}</h3>
                      <a
                        href={`mailto:${t.aboutContent.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{t.aboutContent.email}</span>
                      </a>
                      <p className="mt-4 text-sm opacity-60">{t.aboutContent.madeWith}</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;