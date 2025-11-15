import React from 'react';
import { PlayIcon, PauseIcon, NextIcon, VolumeIcon, SettingsIcon, FlowerIcon, FullscreenIcon, ExitFullscreenIcon, TaskIcon } from './Icons';
import { TimerMode } from '../types';
import { formatTime } from '../utils';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  sessionCount: number;
  sessionsPerRound: number;
  isLongBreakNext: boolean;
  onSettingsClick: () => void;
  onTasksClick: () => void;
  timeLeft: number;
  totalDuration: number;
  progress: number;
  mode: TimerMode;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  textColor: string;
}

const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
  <div className="w-full absolute -top-4 left-0 right-0 h-4 cursor-pointer group">
    <div className="relative h-full w-full py-1.5">
      <div className="w-full h-1 bg-black/10 rounded-full"></div>
      <div className="h-1 rounded-full absolute top-1.5" style={{ width: `calc(${progress * 100}% - 4px)`, backgroundColor: color }}></div>
      <div 
        className="absolute top-1/2 -translate-y-1/2 -ml-1.5 h-3 w-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
        style={{ left: `${progress * 100}%`, backgroundColor: color }}>
      </div>
    </div>
  </div>
);

const SessionIndicator: React.FC<{ count: number; total: number; color: string }> = ({ count, total, color }) => {
    if (total <= 0) return null;
    const icons = Array.from({ length: total }, (_, i) => {
        const isCompleted = i < count;
        return <FlowerIcon key={i} className={`w-4 h-4 transition-opacity duration-300 ${isCompleted ? 'opacity-90' : 'opacity-20'}`} style={{ color }} />;
    });
    return <div className="flex gap-1.5">{icons}</div>;
};


const Controls: React.FC<ControlsProps> = ({
  isActive,
  onToggle,
  onNext,
  volume,
  onVolumeChange,
  sessionCount,
  sessionsPerRound,
  isLongBreakNext,
  onSettingsClick,
  onTasksClick,
  timeLeft,
  totalDuration,
  progress,
  mode,
  isFullscreen,
  onToggleFullscreen,
  textColor
}) => {
  const elapsedTime = totalDuration - timeLeft;
  const sessionsInCurrentRound = sessionsPerRound > 0 ? sessionCount % sessionsPerRound : 0;
  
  const nextButtonText = mode === 'focus' 
    ? (isLongBreakNext ? 'Long Break' : 'Break')
    : 'Focus';


  return (
    <div className="w-full relative" style={{ color: textColor }}>
        <ProgressBar progress={progress} color={textColor} />
        <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={onToggle} className="p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/80 transition-colors" aria-label={isActive ? 'Pause timer' : 'Start timer'}>
            {isActive ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 group py-3 px-2 bg-white/50 backdrop-blur-sm rounded-full">
              <VolumeIcon className="w-6 h-6" />
              <div className="w-0 group-hover:w-24 transition-[width] duration-300 flex items-center">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    className="w-full bg-transparent appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${textColor} ${volume * 100}%, rgba(0,0,0,0.15) ${volume * 100}%)`,
                    }}
                    aria-label="Volume control"
                />
              </div>
              <style>{`
                input[type=range] {
                  -webkit-appearance: none;
                  appearance: none;
                  background-color: transparent;
                }
                
                /***** Webkit styles *****/
                input[type=range]::-webkit-slider-runnable-track {
                  height: 6px;
                  border-radius: 3px;
                }
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  margin-top: -4px; 
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: ${textColor};
                  border: 2px solid rgba(255, 255, 255, 0.7);
                  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                  cursor: pointer;
                  transition: transform 0.15s ease-in-out;
                }
                input[type=range]:hover::-webkit-slider-thumb {
                  transform: scale(1.1);
                }
                input[type=range]:active::-webkit-slider-thumb {
                  transform: scale(1.25);
                }

                /***** Firefox styles *****/
                input[type=range]::-moz-range-track {
                  height: 6px;
                  border-radius: 3px;
                }
                input[type=range]::-moz-range-thumb {
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: ${textColor};
                  border: 2px solid rgba(255, 255, 255, 0.7);
                  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                  cursor: pointer;
                  border: none;
                }
              `}</style>
            </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium bg-white/50 backdrop-blur-sm rounded-full px-4 py-3">
            <div className="flex flex-col items-center">
              <span>{formatTime(elapsedTime)} / {formatTime(totalDuration)}</span>
              <SessionIndicator count={sessionsInCurrentRound} total={sessionsPerRound} color={textColor} />
            </div>
            <button onClick={onNext} className="px-3 py-1.5 bg-black/10 rounded-full hover:bg-black/20 transition-colors flex items-center gap-2">
              <span>Skip to {nextButtonText}</span>
              <NextIcon className="w-4 h-4"/>
            </button>
        </div>

        <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1">
             <button onClick={onTasksClick} className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Open daily tasks">
                <TaskIcon className="w-5 h-5" />
            </button>
             <button onClick={onSettingsClick} className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Open settings">
                <SettingsIcon className="w-5 h-5" />
            </button>
            <button onClick={onNext} className="p-2 md:hidden hover:bg-black/10 rounded-full transition-colors" aria-label="Skip to next session">
                <NextIcon className="w-5 h-5" />
            </button>
             <button onClick={onToggleFullscreen} className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                {isFullscreen ? <ExitFullscreenIcon className="w-5 h-5" /> : <FullscreenIcon className="w-5 h-5" />}
            </button>
        </div>
        </div>
    </div>
  );
};

export default Controls;