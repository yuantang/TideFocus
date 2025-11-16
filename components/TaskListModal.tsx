import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../types';
import { CloseIcon, CheckCircleIcon } from './Icons';

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onUpdateTask: (id: string, text: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const TaskItem: React.FC<{ task: Task; onUpdate: (id: string, text: string, completed: boolean) => void; onDelete: (id: string) => void }> = ({ task, onUpdate, onDelete }) => {
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
        onUpdate(task.id, text.trim(), task.completed);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center gap-3 p-2 group bg-black/5 rounded-md">
            <button onClick={() => onUpdate(task.id, task.text, !task.completed)}>
                {task.completed ? <CheckCircleIcon className="w-6 h-6 text-current/80" /> : <div className="w-6 h-6 border-2 border-current/40 rounded-full"></div>}
            </button>
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
            <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity">
                <CloseIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};


const TaskListModal: React.FC<TaskListModalProps> = ({ isOpen, onClose, tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');

  if (!isOpen) return null;

  const handleAddTask = () => {
      if(newTaskText.trim()) {
          onAddTask(newTaskText.trim());
          setNewTaskText('');
      }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-md relative flex flex-col" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR, maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100" aria-label="Close task list">
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Today's Tasks</h2>
            {tasks.length > 0 && <p className="text-sm opacity-70">{completedCount} of {tasks.length} completed</p>}
        </div>

        <div className="space-y-2 flex-grow overflow-y-auto pr-2">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            ))}
             {tasks.length === 0 && (
                <div className="text-center py-8 opacity-50">
                    <p>Add a task to get started.</p>
                </div>
            )}
        </div>

        <div className="mt-6">
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
    </div>
  );
};

export default TaskListModal;
