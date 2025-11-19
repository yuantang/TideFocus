import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // 忽略在输入框中的按键
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    for (const shortcut of shortcuts) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { shortcuts };
};

// 预定义的快捷键配置
export const createDefaultShortcuts = (actions: {
  toggleTimer?: () => void;
  resetTimer?: () => void;
  skipToNext?: () => void;
  openSettings?: () => void;
  openInfo?: () => void;
  openTasks?: () => void;
  toggleMute?: () => void;
}): KeyboardShortcut[] => {
  const shortcuts: KeyboardShortcut[] = [];

  if (actions.toggleTimer) {
    shortcuts.push({
      key: ' ',
      description: '开始/暂停计时器',
      action: actions.toggleTimer
    });
  }

  if (actions.resetTimer) {
    shortcuts.push({
      key: 'r',
      description: '重置计时器',
      action: actions.resetTimer
    });
  }

  if (actions.skipToNext) {
    shortcuts.push({
      key: 'ArrowRight',
      description: '跳到下一阶段',
      action: actions.skipToNext
    });
  }

  if (actions.openSettings) {
    shortcuts.push({
      key: ',',
      ctrl: true,
      description: '打开设置',
      action: actions.openSettings
    });
  }

  if (actions.openInfo) {
    shortcuts.push({
      key: 'i',
      ctrl: true,
      description: '打开信息面板',
      action: actions.openInfo
    });
  }

  if (actions.openTasks) {
    shortcuts.push({
      key: 't',
      ctrl: true,
      description: '打开任务列表',
      action: actions.openTasks
    });
  }

  if (actions.toggleMute) {
    shortcuts.push({
      key: 'm',
      description: '静音/取消静音',
      action: actions.toggleMute
    });
  }

  return shortcuts;
};

// 快捷键帮助组件的数据
export const getShortcutHelp = (shortcuts: KeyboardShortcut[]): string[] => {
  return shortcuts.map(shortcut => {
    const keys: string[] = [];
    if (shortcut.ctrl) keys.push('Ctrl');
    if (shortcut.shift) keys.push('Shift');
    if (shortcut.alt) keys.push('Alt');
    if (shortcut.meta) keys.push('Cmd');
    
    const keyName = shortcut.key === ' ' ? 'Space' : 
                    shortcut.key === 'ArrowRight' ? '→' :
                    shortcut.key === 'ArrowLeft' ? '←' :
                    shortcut.key === 'ArrowUp' ? '↑' :
                    shortcut.key === 'ArrowDown' ? '↓' :
                    shortcut.key.toUpperCase();
    
    keys.push(keyName);
    
    return `${keys.join(' + ')}: ${shortcut.description}`;
  });
};

