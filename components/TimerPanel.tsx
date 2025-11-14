import React from 'react';
import type { TimerMode } from '../types';
import CircularProgress from './CircularProgress';
import { FocusIcon, BreakIcon, LongBreakIcon } from './Icons';
import { formatTime } from '../utils';

interface TimerPanelProps {
  mode: TimerMode;
  isActive: boolean;
  timeLeft: number;
  progress: number;
  bgColor: string;
  textColor: string;
  isLongBreak?: boolean;
  quote?: string;
}

const panelContent = {
  focus: {
    title: 'FOCUS',
    icon: <FocusIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" />,
  },
  break: {
    title: 'BREAK',
    icon: <BreakIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" />,
  },
};

const TimerPanel: React.FC<TimerPanelProps> = ({ mode, isActive, timeLeft, progress, bgColor, textColor, isLongBreak = false, quote }) => {
  const content = panelContent[mode];
  const title = (mode === 'break' && isLongBreak) ? 'LONG BREAK' : content.title;
  const icon = mode === 'break' && isLongBreak
    ? <LongBreakIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" />
    : content.icon;


  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center p-4 transition-colors duration-500 relative"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className={`flex flex-col items-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[0.2em] uppercase mb-8 sm:mb-12">
          {title}
        </h1>
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 flex justify-center items-center">
          <CircularProgress progress={progress} isActive={isActive} strokeColor={textColor} />
          <div className={`absolute transition-transform duration-500 ${isActive ? 'animate-gentle-breathe' : ''}`}>{icon}</div>
        </div>
        <div className="font-light text-6xl sm:text-7xl md:text-8xl mt-8 sm:mt-12 tracking-wider">
          {formatTime(timeLeft)}
        </div>
      </div>
      {isLongBreak && quote && (
          <div className="absolute bottom-12 text-center px-8">
            <p className="text-lg opacity-80 italic">"{quote}"</p>
          </div>
      )}
    </div>
  );
};

export default TimerPanel;