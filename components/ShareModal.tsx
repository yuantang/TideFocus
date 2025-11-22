import React, { useState, useEffect } from 'react';
import { generateShareCard, ShareCardConfig } from '../utils/shareCardGenerator';
import { useAuth } from '../hooks/useAuth';
import { useReferral } from '../hooks/useReferral';
import { CloseIcon } from './Icons';
import { getTranslations } from '../i18n';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    focusMinutes: number;
    tasksCompleted: number;
    streak: number;
    chartData?: number[];
  };
  type?: 'daily' | 'achievement' | 'weekly' | 'milestone';
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data, type = 'daily' }) => {
  const t = getTranslations();
  const { user } = useAuth();
  const { referralCode, isLoading: referralLoading } = useReferral();
  
  const [template, setTemplate] = useState<'minimal' | 'gradient' | 'data-viz'>('gradient');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // 自动生成第一张卡片
      if (!imageUrl && referralCode) {
        handleGenerate();
      }
    } else {
      setIsVisible(false);
      // 清理 URL
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
        setImageUrl('');
      }
    }
  }, [isOpen, referralCode]);

  const handleGenerate = async () => {
    if (!referralCode || referralLoading) return;

    setIsGenerating(true);
    try {
      const config: ShareCardConfig = {
        type,
        template,
        data,
        user: {
          name: user?.email?.split('@')[0] || 'User',
          referralCode
        }
      };

      const blob = await generateShareCard(config);
      
      // 清理旧的 URL
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error('生成分享卡片失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `tidefocus-${type}-${Date.now()}.png`;
    a.click();
  };

  const handleTemplateChange = (newTemplate: 'minimal' | 'gradient' | 'data-viz') => {
    setTemplate(newTemplate);
    // 切换模板后自动重新生成
    setTimeout(() => {
      if (referralCode) {
        handleGenerate();
      }
    }, 100);
  };

  if (!isOpen) return null;

  const templates = [
    { id: 'minimal', name: '简约', icon: '✨' },
    { id: 'gradient', name: '渐变', icon: '🌈' },
    { id: 'data-viz', name: '数据', icon: '📊' }
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal 内容 */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-[#6b5a5a]">
            🎉 分享你的专注成就
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-6">
          {/* 模板选择 */}
          <div>
            <label className="block text-sm font-medium text-[#6b5a5a] mb-3">
              选择模板风格
            </label>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateChange(t.id as any)}
                  disabled={isGenerating}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    template === t.id
                      ? 'bg-[#f8e0e0] text-[#6b5a5a] shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-sm">{t.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 预览区域 */}
          {imageUrl ? (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={imageUrl}
                  alt="分享卡片预览"
                  className="w-full h-auto"
                />
              </div>

              {/* 操作按钮 */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-[#f8e0e0] text-[#6b5a5a] rounded-xl font-medium hover:bg-[#f5d5d5] transition-colors shadow-sm"
                >
                  💾 下载图片
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? '生成中...' : '🔄 重新生成'}
                </button>
              </div>

              {/* 分享提示 */}
              <div className="bg-[#fdf6f6] rounded-xl p-4 border border-[#f8e0e0]">
                <p className="text-sm text-[#6b5a5a] text-center">
                  💡 图片已生成！保存后可分享到微信、微博、小红书等平台
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              {isGenerating ? (
                <>
                  <div className="w-16 h-16 border-4 border-[#f8e0e0] border-t-[#6b5a5a] rounded-full animate-spin" />
                  <p className="text-[#6b5a5a] font-medium">正在生成精美卡片...</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-2">🎨</div>
                  <p className="text-[#6b5a5a] font-medium">选择模板开始生成</p>
                  <button
                    onClick={handleGenerate}
                    disabled={!referralCode || referralLoading}
                    className="px-8 py-3 bg-[#f8e0e0] text-[#6b5a5a] rounded-xl font-medium hover:bg-[#f5d5d5] transition-colors shadow-md disabled:opacity-50"
                  >
                    生成分享卡片
                  </button>
                </>
              )}
            </div>
          )}

          {/* 邀请信息 */}
          {referralCode && (
            <div className="bg-gradient-to-r from-[#f8e0e0] to-[#fdf6f6] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#6b5a5a]">
                  你的邀请码
                </span>
                <span className="text-lg font-bold text-[#6b5a5a] tracking-wider">
                  {referralCode}
                </span>
              </div>
              <p className="text-xs text-[#6b5a5a]/70">
                分享卡片中包含你的专属邀请码，好友扫码注册后你们都将获得奖励 🎁
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

