import React, { useState, useEffect, useRef } from 'react';
import type { Task } from '../types';
import { getTranslations } from '../i18n';
import { CloseIcon } from './Icons';

interface IntentionModalProps {
  isOpen: boolean;
  onStart: (intention: string, taskId: string | null) => void;
  onClose?: () => void;
  tasks: Task[];
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const IntentionModal: React.FC<IntentionModalProps> = ({ isOpen, onStart, onClose, tasks }) => {
  const t = getTranslations();
  const [intention, setIntention] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIntention('');
      setSelectedTaskId('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStart = () => {
    // 允许不填写任何内容也可以开始专注
    if (selectedTaskId) {
      const task = tasks.find(t => t.id === selectedTaskId);
      onStart(task ? task.text : '', selectedTaskId);
    } else {
      onStart(intention.trim(), null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleStart();
    }
  };

  const handleTaskSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = e.target.value;
    setSelectedTaskId(taskId);
    const task = tasks.find(t => t.id === taskId);
    setIntention(task ? task.text : '');
  };

  const handleBackgroundClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={handleBackgroundClick}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-md relative" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        )}

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t.intention.title}</h2>
          <p className="opacity-70 mb-6">{t.intention.subtitle}</p>

          <div className="space-y-4">
             {tasks.length > 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium opacity-70 mb-2 text-center">
                      {t.intention.selectTask}
                    </label>
                    <select
                        value={selectedTaskId}
                        onChange={handleTaskSelection}
                        className="w-full px-4 py-3 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] appearance-none cursor-pointer hover:bg-white/70 transition-colors"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5a5a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                    >
                        <option value="">-- {t.tasks.selectTask} --</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>{task.text}</option>
                        ))}
                    </select>
                  </div>

                  {/* 分隔线 - "或" */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-black/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#fdf6f6] opacity-60 font-medium">{t.intention.orDivider}</span>
                    </div>
                  </div>
                </>
            )}

            <div>
              {tasks.length > 0 && (
                <label className="block text-sm font-medium opacity-70 mb-2 text-center">
                  {t.intention.inputLabel}
                </label>
              )}
              <input
                  ref={inputRef}
                  type="text"
                  value={intention}
                  onChange={(e) => {
                      setIntention(e.target.value);
                      if (selectedTaskId) setSelectedTaskId('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={t.intention.placeholder}
                  className="w-full px-4 py-3 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a] text-center"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleStart}
              className="font-bold py-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b5a5a] focus:ring-offset-[#fdf6f6] transition-all bg-black/10 text-current hover:bg-black/20 cursor-pointer"
            >
              {t.intention.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentionModal;
