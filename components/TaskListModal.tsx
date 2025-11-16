import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../types';
import { CloseIcon, CheckCircleIcon } from './Icons';
import ConfirmDialog from './ConfirmDialog';

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onAddTask: (text: string, priority?: 'high' | 'medium' | 'low') => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const TaskItem: React.FC<{ task: Task; onUpdate: (id: string, updates: Partial<Task>) => void; onDelete: (id: string) => void }> = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (text.trim() !== task.text) {
          onUpdate(task.id, { text: text.trim() });
        }
        setIsEditing(false);
    };

    // 优先级颜色
    const getPriorityColor = () => {
      switch (task.priority) {
        case 'high': return 'bg-red-500';
        case 'medium': return 'bg-yellow-500';
        case 'low': return 'bg-green-500';
      }
    };

    return (
        <div className="flex items-center gap-3 p-2 group bg-black/5 rounded-md">
            {/* 优先级指示器 */}
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor()}`} title={`优先级: ${task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}`}></div>

            {/* 完成状态 */}
            <button onClick={() => onUpdate(task.id, { completed: !task.completed })}>
                {task.completed ? <CheckCircleIcon className="w-6 h-6 text-current/80" /> : <div className="w-6 h-6 border-2 border-current/40 rounded-full"></div>}
            </button>

            {/* 任务文本 */}
            {isEditing ? (
                 <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="flex-grow bg-transparent focus:outline-none"
                />
            ) : (
                <span onClick={() => setIsEditing(true)} className={`flex-grow cursor-text ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.text}
                </span>
            )}

            {/* 番茄钟计数 */}
            {task.pomodoroCount > 0 && (
              <span className="text-xs opacity-60 flex-shrink-0">
                🍅 {task.pomodoroCount}
              </span>
            )}

            {/* 删除按钮 */}
            <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity">
                <CloseIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};


type SortOption = 'priority' | 'created' | 'status';
type FilterOption = 'all' | 'active' | 'completed';

const TaskListModal: React.FC<TaskListModalProps> = ({ isOpen, onClose, tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [sortBy, setSortBy] = useState<SortOption>('priority');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddTask = () => {
      const trimmedText = newTaskText.trim();
      if(trimmedText) {
          // 检查任务长度
          if (trimmedText.length > 100) {
            // 可以在这里添加错误提示
            return;
          }
          onAddTask(trimmedText, newTaskPriority);
          setNewTaskText('');
          setNewTaskPriority('medium');
      }
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  // 过滤任务
  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'active') return !task.completed;
    if (filterBy === 'completed') return task.completed;
    return true;
  });

  // 排序任务
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (diff !== 0) return diff;
      // 相同优先级按创建时间排序
      return b.createdAt - a.createdAt;
    }
    if (sortBy === 'created') {
      return b.createdAt - a.createdAt;
    }
    if (sortBy === 'status') {
      if (a.completed === b.completed) return b.createdAt - a.createdAt;
      return a.completed ? 1 : -1;
    }
    return 0;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalPomodoros = tasks.reduce((sum, task) => sum + task.pomodoroCount, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-md relative flex flex-col" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR, maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100" aria-label="Close task list">
          <CloseIcon className="w-6 h-6" />
        </button>

        {/* 标题 */}
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Today's Tasks</h2>
            {tasks.length > 0 && (
              <div className="flex items-center justify-center gap-4 text-sm opacity-70 mt-1">
                <span>{completedCount} / {tasks.length} 已完成</span>
                {totalPomodoros > 0 && (
                  <span className="flex items-center gap-1">
                    <span>🍅</span>
                    <span>{totalPomodoros} 个番茄钟</span>
                  </span>
                )}
              </div>
            )}
        </div>

        {/* 过滤和排序 */}
        {tasks.length > 0 && (
          <div className="flex gap-2 mb-4">
            {/* 过滤器 */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="flex-1 px-3 py-2 bg-white/50 border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5a5a]"
            >
              <option value="all">全部任务</option>
              <option value="active">未完成</option>
              <option value="completed">已完成</option>
            </select>

            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex-1 px-3 py-2 bg-white/50 border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5a5a]"
            >
              <option value="priority">按优先级</option>
              <option value="created">按创建时间</option>
              <option value="status">按完成状态</option>
            </select>
          </div>
        )}

        {/* 任务列表 */}
        <div className="space-y-2 flex-grow overflow-y-auto pr-2">
            {sortedTasks.map(task => (
                <TaskItem key={task.id} task={task} onUpdate={onUpdateTask} onDelete={handleDeleteTask} />
            ))}
             {tasks.length === 0 && (
                <div className="text-center py-12 opacity-50">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-lg font-medium mb-1">还没有任务</p>
                    <p className="text-sm">添加第一个任务开始专注吧！</p>
                </div>
            )}
            {tasks.length > 0 && sortedTasks.length === 0 && (
                <div className="text-center py-12 opacity-50">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-lg font-medium mb-1">没有符合条件的任务</p>
                    <p className="text-sm">试试调整过滤条件</p>
                </div>
            )}
        </div>

        {/* 添加任务 */}
        <div className="mt-6 space-y-2">
            {/* 优先级选择器 */}
            <div className="flex gap-2">
              <button
                onClick={() => setNewTaskPriority('high')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  newTaskPriority === 'high'
                    ? 'bg-red-500 text-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              >
                高优先级
              </button>
              <button
                onClick={() => setNewTaskPriority('medium')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  newTaskPriority === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              >
                中优先级
              </button>
              <button
                onClick={() => setNewTaskPriority('low')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  newTaskPriority === 'low'
                    ? 'bg-green-500 text-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              >
                低优先级
              </button>
            </div>

            {/* 输入框 */}
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 bg-white/50 border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#fdf6f6] focus:ring-[#6b5a5a]"
            />
        </div>
      </div>

      {/* 删除确认对话框 */}
      <ConfirmDialog
        isOpen={taskToDelete !== null}
        title="删除任务"
        message="确定要删除这个任务吗？此操作无法撤销。"
        confirmText="删除"
        cancelText="取消"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default TaskListModal;
