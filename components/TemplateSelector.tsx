import React, { useState } from 'react';
import { PomodoroTemplate } from '../types';
import { getTranslations } from '../i18n';

interface TemplateSelectorProps {
  templates: PomodoroTemplate[];
  activeTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onCreateTemplate?: () => void;
  onEditTemplate?: (template: PomodoroTemplate) => void;
  onDeleteTemplate?: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  activeTemplateId,
  onSelectTemplate,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate
}) => {
  const t = getTranslations();
  const [showMenu, setShowMenu] = useState(false);

  const activeTemplate = templates.find(t => t.id === activeTemplateId);
  const presetTemplates = templates.filter(t => !t.isCustom);
  const customTemplates = templates.filter(t => t.isCustom);

  // 获取本地化的模板名称
  const getLocalizedTemplateName = (template: PomodoroTemplate | undefined): string => {
    if (!template) return '';

    // 如果是自定义模板，直接返回用户输入的名称
    if (template.isCustom) {
      return template.name;
    }

    // 如果是预设模板，返回本地化的名称
    const templateKey = template.id as keyof typeof t.templates.presetNames;
    return t.templates.presetNames[templateKey] || template.name;
  };

  return (
    <div className="relative">
      {/* 当前模板按钮 */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 hover:border-[#b86b6b] rounded-xl transition-all text-sm font-medium shadow-sm hover:shadow-md"
        title={t.templates.selectTemplate}
      >
        <span className="text-2xl">{activeTemplate?.icon}</span>
        <div className="flex flex-col items-start">
          <span className="text-gray-800">{getLocalizedTemplateName(activeTemplate)}</span>
          <span className="text-xs text-gray-500">
            {activeTemplate?.focusDuration}{t.units.minutes} / {activeTemplate?.breakDuration}{t.units.minutes}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${showMenu ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 模板菜单 */}
      {showMenu && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />

          {/* 菜单内容 */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-y-auto">
            {/* 预设模板 */}
            <div className="p-3 border-b border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-2">{t.templates.selectTemplate}</div>
              <div className="space-y-1">
                {presetTemplates.map(template => {
                  // 获取本地化的模板名称和描述
                  const templateKey = template.id as keyof typeof t.templates.presetNames;
                  const localizedName = t.templates.presetNames[templateKey] || template.name;
                  const localizedDescription = t.templates.presetDescriptions[templateKey] || template.description;

                  return (
                    <button
                      key={template.id}
                      onClick={() => {
                        onSelectTemplate(template.id);
                        setShowMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        template.id === activeTemplateId
                          ? 'bg-[#f8e0e0] border-2 border-[#b86b6b]'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-2xl">{template.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-800">{localizedName}</div>
                        <div className="text-xs text-gray-500">{localizedDescription}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {t.templates.focusDuration} {template.focusDuration}{t.units.minutes} · {t.templates.breakDuration} {template.breakDuration}{t.units.minutes} · {t.templates.longBreakDuration} {template.longBreakDuration}{t.units.minutes}
                        </div>
                      </div>
                      {template.id === activeTemplateId && (
                        <svg className="w-5 h-5 text-[#b86b6b]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 自定义模板 */}
            {customTemplates.length > 0 && (
              <div className="p-3 border-b border-gray-200">
                <div className="text-xs font-semibold text-gray-500 mb-2">{t.templates.createCustom}</div>
                <div className="space-y-1">
                  {customTemplates.map(template => (
                    <div
                      key={template.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        template.id === activeTemplateId
                          ? 'bg-[#f8e0e0] border-2 border-[#b86b6b]'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <button
                        onClick={() => {
                          onSelectTemplate(template.id);
                          setShowMenu(false);
                        }}
                        className="flex-1 flex items-center gap-3 text-left"
                      >
                        <span className="text-2xl">{template.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {t.templates.focusDuration} {template.focusDuration}{t.units.minutes} · {t.templates.breakDuration} {template.breakDuration}{t.units.minutes}
                          </div>
                        </div>
                      </button>
                      <div className="flex gap-1">
                        {onEditTemplate && (
                          <button
                            onClick={() => onEditTemplate(template)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title={t.edit}
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        {onDeleteTemplate && (
                          <button
                            onClick={() => {
                              if (confirm(t.templates.deleteConfirm)) {
                                onDeleteTemplate(template.id);
                              }
                            }}
                            className="p-1 hover:bg-red-100 rounded"
                            title={t.delete}
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 创建新模板按钮 */}
            {onCreateTemplate && (
              <div className="p-3">
                <button
                  onClick={() => {
                    onCreateTemplate();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#b86b6b] to-[#a85a5a] hover:from-[#a85a5a] hover:to-[#985050] text-white rounded-lg transition-all font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>{t.templates.createCustom}</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSelector;

