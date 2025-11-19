import { useState, useEffect, useCallback } from 'react';
import { PomodoroTemplate } from '../types';
import { PRESET_TEMPLATES, DEFAULT_TEMPLATE_ID, createCustomTemplate, validateTemplate } from '../constants/templates';

const STORAGE_KEY = 'custom_templates';
const ACTIVE_TEMPLATE_KEY = 'active_template_id';

export const useTemplates = () => {
  const [customTemplates, setCustomTemplates] = useState<PomodoroTemplate[]>([]);
  const [activeTemplateId, setActiveTemplateId] = useState<string>(DEFAULT_TEMPLATE_ID);
  const [isLoading, setIsLoading] = useState(true);

  // 加载自定义模板
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const templates = JSON.parse(stored);
        setCustomTemplates(templates);
      }

      const activeId = localStorage.getItem(ACTIVE_TEMPLATE_KEY);
      if (activeId) {
        setActiveTemplateId(activeId);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存自定义模板到 localStorage
  const saveCustomTemplates = useCallback((templates: PomodoroTemplate[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
      setCustomTemplates(templates);
    } catch (error) {
      console.error('Failed to save templates:', error);
      throw new Error('保存模板失败');
    }
  }, []);

  // 保存活动模板ID
  const saveActiveTemplateId = useCallback((id: string) => {
    try {
      localStorage.setItem(ACTIVE_TEMPLATE_KEY, id);
      setActiveTemplateId(id);
    } catch (error) {
      console.error('Failed to save active template:', error);
    }
  }, []);

  // 获取所有模板（预设 + 自定义）
  const allTemplates = [...PRESET_TEMPLATES, ...customTemplates];

  // 获取当前活动模板
  const activeTemplate = allTemplates.find(t => t.id === activeTemplateId) || PRESET_TEMPLATES[0];

  // 添加自定义模板
  const addCustomTemplate = useCallback((
    name: string,
    description: string,
    focusDuration: number,
    breakDuration: number,
    longBreakDuration: number,
    sessionsPerRound: number,
    icon: string = '⭐'
  ) => {
    const template = createCustomTemplate(
      name,
      description,
      focusDuration,
      breakDuration,
      longBreakDuration,
      sessionsPerRound,
      icon
    );

    // 验证模板
    const errors = validateTemplate(template);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const newTemplates = [...customTemplates, template];
    saveCustomTemplates(newTemplates);
    return template;
  }, [customTemplates, saveCustomTemplates]);

  // 更新自定义模板
  const updateCustomTemplate = useCallback((id: string, updates: Partial<PomodoroTemplate>) => {
    const template = customTemplates.find(t => t.id === id);
    if (!template) {
      throw new Error('模板不存在');
    }

    const updatedTemplate = { ...template, ...updates };

    // 验证模板
    const errors = validateTemplate(updatedTemplate);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const newTemplates = customTemplates.map(t => t.id === id ? updatedTemplate : t);
    saveCustomTemplates(newTemplates);
    return updatedTemplate;
  }, [customTemplates, saveCustomTemplates]);

  // 删除自定义模板
  const deleteCustomTemplate = useCallback((id: string) => {
    const template = customTemplates.find(t => t.id === id);
    if (!template) {
      throw new Error('模板不存在');
    }

    if (!template.isCustom) {
      throw new Error('不能删除预设模板');
    }

    const newTemplates = customTemplates.filter(t => t.id !== id);
    saveCustomTemplates(newTemplates);

    // 如果删除的是当前活动模板，切换到默认模板
    if (activeTemplateId === id) {
      saveActiveTemplateId(DEFAULT_TEMPLATE_ID);
    }
  }, [customTemplates, activeTemplateId, saveCustomTemplates, saveActiveTemplateId]);

  // 应用模板
  const applyTemplate = useCallback((templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('模板不存在');
    }

    saveActiveTemplateId(templateId);
    return template;
  }, [allTemplates, saveActiveTemplateId]);

  // 从当前设置创建模板
  const createFromCurrentSettings = useCallback((
    name: string,
    description: string,
    currentSettings: {
      focusDuration: number;
      breakDuration: number;
      longBreakDuration: number;
      sessionsPerRound: number;
    },
    icon: string = '⭐'
  ) => {
    return addCustomTemplate(
      name,
      description,
      currentSettings.focusDuration,
      currentSettings.breakDuration,
      currentSettings.longBreakDuration,
      currentSettings.sessionsPerRound,
      icon
    );
  }, [addCustomTemplate]);

  return {
    // 状态
    allTemplates,
    customTemplates,
    presetTemplates: PRESET_TEMPLATES,
    activeTemplate,
    activeTemplateId,
    isLoading,

    // 方法
    addCustomTemplate,
    updateCustomTemplate,
    deleteCustomTemplate,
    applyTemplate,
    createFromCurrentSettings
  };
};

