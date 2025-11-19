import React, { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  const shortcuts = [
    { keys: ['Space'], description: '开始/暂停计时器' },
    { keys: ['R'], description: '重置计时器' },
    { keys: ['→'], description: '跳到下一阶段' },
    { keys: ['M'], description: '静音/取消静音' },
    { keys: ['Ctrl', ','], description: '打开设置' },
    { keys: ['Ctrl', 'I'], description: '打开信息面板' },
    { keys: ['Ctrl', 'T'], description: '打开任务列表' },
    { keys: ['?'], description: '显示快捷键帮助' },
    { keys: ['Esc'], description: '关闭弹窗' }
  ];

  return (
    <div 
      className={`fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⌨️</div>
            <h2 className="text-2xl font-bold text-gray-800">键盘快捷键</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="关闭"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* 快捷键列表 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">{shortcut.description}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-3 py-1.5 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 rounded-md shadow-sm text-sm font-semibold text-gray-700 min-w-[2.5rem] text-center">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-gray-400 mx-1">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 rounded-b-2xl">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">提示</h3>
              <p className="text-sm text-gray-600">
                在输入框中输入时，快捷键会被禁用。按 <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-xs font-semibold">?</kbd> 随时查看此帮助。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;

