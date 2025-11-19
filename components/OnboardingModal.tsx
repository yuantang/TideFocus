import React, { useState } from 'react';
import { getTranslations } from '../i18n';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const t = getTranslations();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: t.onboarding?.step1Title || '欢迎使用 TideFocus',
      description: t.onboarding?.step1Desc || '一个帮助你专注工作、提升效率的番茄钟应用',
      icon: '🍅',
      highlight: null,
    },
    {
      title: t.onboarding?.step2Title || '设置你的专注意图',
      description: t.onboarding?.step2Desc || '每次开始专注前，设定你要完成的任务，让专注更有目标',
      icon: '🎯',
      highlight: 'timer',
    },
    {
      title: t.onboarding?.step3Title || '选择白噪音',
      description: t.onboarding?.step3Desc || '20种环境音效，帮助你进入专注状态。可以混合多种声音创造独特氛围',
      icon: '🎵',
      highlight: 'sounds',
    },
    {
      title: t.onboarding?.step4Title || '查看统计数据',
      description: t.onboarding?.step4Desc || '追踪你的专注时长、完成的任务，解锁成就，见证自己的成长',
      icon: '📊',
      highlight: 'info',
    },
    {
      title: t.onboarding?.step5Title || '使用模板快速开始',
      description: t.onboarding?.step5Desc || '7种预设模板，适合不同场景：深度工作、快速冲刺、学习考试等',
      icon: '⚡',
      highlight: 'template',
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentStepData.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t.onboarding?.stepProgress || '步骤'} {currentStep + 1} / {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
            >
              {t.onboarding?.skip || '跳过'}
            </button>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {currentStepData.description}
          </p>

          {/* 进度指示器 */}
          <div className="flex gap-2 justify-center mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-pink-500'
                    : index < currentStep
                    ? 'w-2 bg-pink-300'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* 按钮 */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                {t.onboarding?.prev || '上一步'}
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              {currentStep === steps.length - 1
                ? t.onboarding?.start || '开始使用'
                : t.onboarding?.next || '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;

