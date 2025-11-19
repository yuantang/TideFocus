import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'reset';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        setSuccess('登录成功！');
        setTimeout(() => onClose(), 1000);
      } else if (mode === 'register') {
        await signUp(email, password, displayName);
        setSuccess('注册成功！请查收验证邮件。');
        setTimeout(() => {
          setMode('login');
          setSuccess(null);
        }, 2000);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccess('密码重置邮件已发送！');
        setTimeout(() => {
          setMode('login');
          setSuccess(null);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || '操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError(null);
    setSuccess(null);
  };

  const switchMode = (newMode: 'login' | 'register' | 'reset') => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

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
            <div className="text-3xl">🌊</div>
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === 'login' && '登录'}
              {mode === 'register' && '注册'}
              {mode === 'reset' && '重置密码'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                显示名称
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="你的名字"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="至少 6 个字符"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '处理中...' : mode === 'login' ? '登录' : mode === 'register' ? '注册' : '发送重置邮件'}
          </button>
        </form>

        {/* 底部链接 */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl text-center text-sm">
          {mode === 'login' && (
            <>
              <button
                onClick={() => switchMode('reset')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                忘记密码？
              </button>
              <span className="mx-2 text-gray-400">|</span>
              <button
                onClick={() => switchMode('register')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                创建账号
              </button>
            </>
          )}
          {mode === 'register' && (
            <>
              已有账号？
              <button
                onClick={() => switchMode('login')}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                立即登录
              </button>
            </>
          )}
          {mode === 'reset' && (
            <>
              <button
                onClick={() => switchMode('login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                返回登录
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

