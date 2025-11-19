import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import { useAuth } from '../hooks/useAuth';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { user, signOut, updatePassword } = useAuth();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '两次输入的密码不一致' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: '密码至少需要 6 个字符' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await updatePassword(newPassword);
      setMessage({ type: 'success', text: '密码修改成功！' });
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordChange(false);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '密码修改失败' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!confirm('确定要退出登录吗？')) return;

    setLoading(true);
    try {
      await signOut();
      onClose();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '退出登录失败' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👤</div>
            <h2 className="text-2xl font-bold text-gray-800">账号管理</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-6">
          {/* 用户信息 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {user.user_metadata?.display_name || user.email?.split('@')[0]}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* 修改密码 */}
          {!showPasswordChange ? (
            <button
              onClick={() => setShowPasswordChange(true)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              修改密码
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="至少 6 个字符"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="再次输入新密码"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? '保存中...' : '保存'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setMessage(null);
                  }}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          )}

          {/* 退出登录 */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            退出登录
          </button>
        </div>

        {/* 底部信息 */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl text-center text-xs text-gray-500">
          <div>账号创建于 {new Date(user.created_at).toLocaleDateString('zh-CN')}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;

