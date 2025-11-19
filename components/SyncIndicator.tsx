import React from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { useAuth } from '../hooks/useAuth';

interface SyncIndicatorProps {
  onOpenAuth?: () => void;
  onOpenAccount?: () => void;
}

const SyncIndicator: React.FC<SyncIndicatorProps> = ({ onOpenAuth, onOpenAccount }) => {
  const { isAuthenticated, user } = useAuth();
  const { syncStatus, syncAll, restoreAll } = useCloudSync();
  const [showMenu, setShowMenu] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <button
        onClick={onOpenAuth}
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
        title="登录以启用云端同步"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>登录</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-sm"
        title={user?.email || '已登录'}
      >
        {/* 用户头像 */}
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user?.email?.[0].toUpperCase()}
        </div>

        {/* 同步状态 */}
        {syncStatus.syncing ? (
          <div className="flex items-center gap-1 text-blue-600">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs">同步中...</span>
          </div>
        ) : syncStatus.error ? (
          <div className="flex items-center gap-1 text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">同步失败</span>
          </div>
        ) : syncStatus.lastSyncTime ? (
          <div className="flex items-center gap-1 text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs">已同步</span>
          </div>
        ) : (
          <span className="text-xs text-gray-600">云端同步</span>
        )}

        {/* 下拉箭头 */}
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {/* 用户信息 */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate">
                    {user?.user_metadata?.display_name || user?.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                </div>
              </div>
            </div>

            {/* 同步状态详情 */}
            {syncStatus.lastSyncTime && (
              <div className="p-3 bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
                上次同步: {new Date(syncStatus.lastSyncTime).toLocaleString('zh-CN')}
              </div>
            )}

            {syncStatus.error && (
              <div className="p-3 bg-red-50 border-b border-red-200 text-xs text-red-600">
                错误: {syncStatus.error}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="p-2">
              <button
                onClick={() => {
                  syncAll();
                  setShowMenu(false);
                }}
                disabled={syncStatus.syncing}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                上传到云端
              </button>

              <button
                onClick={() => {
                  if (confirm('确定要从云端恢复数据吗？这将覆盖本地数据。')) {
                    restoreAll();
                    setShowMenu(false);
                  }
                }}
                disabled={syncStatus.syncing}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                从云端恢复
              </button>

              <div className="my-2 border-t border-gray-200" />

              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenAccount?.();
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                账号设置
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SyncIndicator;

