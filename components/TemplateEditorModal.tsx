import React, { useState, useEffect } from 'react';
import { PomodoroTemplate } from '../types';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<PomodoroTemplate, 'id' | 'isCustom' | 'createdAt'>) => void;
  editingTemplate?: PomodoroTemplate;
  currentSettings?: {
    focusDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    sessionsPerRound: number;
  };
}

const ICON_OPTIONS = ['⭐', '🎯', '🚀', '💡', '🔥', '⚡', '🌟', '💪', '🎨', '📝', '🧠', '💻', '📚', '🎵', '☕'];

const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTemplate,
  currentSettings
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('⭐');
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsPerRound, setSessionsPerRound] = useState(4);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name);
      setDescription(editingTemplate.description);
      setIcon(editingTemplate.icon);
      setFocusDuration(editingTemplate.focusDuration);
      setBreakDuration(editingTemplate.breakDuration);
      setLongBreakDuration(editingTemplate.longBreakDuration);
      setSessionsPerRound(editingTemplate.sessionsPerRound);
    } else if (currentSettings) {
      setFocusDuration(currentSettings.focusDuration);
      setBreakDuration(currentSettings.breakDuration);
      setLongBreakDuration(currentSettings.longBreakDuration);
      setSessionsPerRound(currentSettings.sessionsPerRound);
    }
  }, [editingTemplate, currentSettings]);

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push('请输入模板名称');
    }

    if (focusDuration < 1 || focusDuration > 180) {
      newErrors.push('专注时长必须在 1-180 分钟之间');
    }

    if (breakDuration < 1 || breakDuration > 60) {
      newErrors.push('短休息时长必须在 1-60 分钟之间');
    }

    if (longBreakDuration < 1 || longBreakDuration > 120) {
      newErrors.push('长休息时长必须在 1-120 分钟之间');
    }

    if (sessionsPerRound < 1 || sessionsPerRound > 10) {
      newErrors.push('每轮次数必须在 1-10 之间');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      icon,
      focusDuration,
      breakDuration,
      longBreakDuration,
      sessionsPerRound
    });

    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setIcon('⭐');
    setFocusDuration(25);
    setBreakDuration(5);
    setLongBreakDuration(15);
    setSessionsPerRound(4);
    setErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* 标题 */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingTemplate ? '编辑模板' : '创建自定义模板'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {editingTemplate ? '修改模板设置' : '根据你的需求创建专属模板'}
          </p>
        </div>

        {/* 表单 */}
        <div className="p-6 space-y-4">
          {/* 错误提示 */}
          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  {errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-600">{error}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 图标选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">图标</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map(iconOption => (
                <button
                  key={iconOption}
                  onClick={() => setIcon(iconOption)}
                  className={`w-12 h-12 text-2xl rounded-lg transition-all ${
                    icon === iconOption
                      ? 'bg-[#f8e0e0] border-2 border-[#b86b6b] scale-110'
                      : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  {iconOption}
                </button>
              ))}
            </div>
          </div>

          {/* 模板名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">模板名称 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：深度工作模式"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent"
              maxLength={20}
            />
          </div>

          {/* 模板描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简单描述这个模板的用途..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent resize-none"
              rows={2}
              maxLength={100}
            />
          </div>

          {/* 时间设置 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">专注时长（分钟）*</label>
              <input
                type="number"
                value={focusDuration}
                onChange={(e) => setFocusDuration(parseInt(e.target.value) || 0)}
                min={1}
                max={180}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">短休息（分钟）*</label>
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(parseInt(e.target.value) || 0)}
                min={1}
                max={60}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">长休息（分钟）*</label>
              <input
                type="number"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(parseInt(e.target.value) || 0)}
                min={1}
                max={120}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">每轮次数 *</label>
              <input
                type="number"
                value={sessionsPerRound}
                onChange={(e) => setSessionsPerRound(parseInt(e.target.value) || 0)}
                min={1}
                max={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b86b6b] focus:border-transparent"
              />
            </div>
          </div>

          {/* 预览 */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">预览</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <div className="font-medium text-gray-800">{name || '未命名模板'}</div>
                <div className="text-xs text-gray-500">{description || '暂无描述'}</div>
                <div className="text-xs text-gray-400 mt-1">
                  专注 {focusDuration}分 · 休息 {breakDuration}分 · 长休息 {longBreakDuration}分 · {sessionsPerRound}轮
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#b86b6b] to-[#a85a5a] hover:from-[#a85a5a] hover:to-[#985050] text-white rounded-lg transition-all font-medium"
          >
            {editingTemplate ? '保存' : '创建'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditorModal;

