import React from 'react';
import { CloseIcon } from './Icons';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyGoal: number;
  dailySessionsCompleted: number;
  weeklyProgress: { day: string; count: number; isToday: boolean }[];
  totalSessions: number;
  focusStreak: number;
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const WeeklyProgressChart: React.FC<{ progress: { day: string; count: number; isToday: boolean }[], goal: number }> = ({ progress, goal }) => {
  const maxCount = Math.max(goal > 0 ? goal : 1, ...progress.map(p => p.count));

  return (
    <div className="border-t border-black/10 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Weekly Progress</h3>
      <div className="flex justify-between items-end gap-2 h-32" style={{color: TEXT_COLOR}}>
        {progress.map((data, index) => {
          const barHeight = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative text-center">
              <div className="w-full h-full flex items-end justify-center">
                <div
                  className="w-3/4 max-w-md bg-black/5 rounded-t-sm relative"
                  style={{height: '100%'}}
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ease-out ${data.isToday ? 'bg-current' : 'bg-current opacity-40'}`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>
              </div>
               <span
                className={`text-xs font-medium ${data.isToday ? 'opacity-100 font-bold' : 'opacity-60'}`}
              >
                {data.day.slice(0, 1)}
              </span>
               {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/70 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-300">
                {data.count} session{data.count !== 1 ? 's' : ''}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black/70 rotate-45"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, dailyGoal, dailySessionsCompleted, weeklyProgress, totalSessions, focusStreak }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl p-6 sm:p-8 w-11/12 max-w-lg relative" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100" aria-label="Close information">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Today's Focus</h3>
            {dailyGoal > 0 ? (
                <div>
                    <p className="text-lg opacity-90">
                        <span className="font-bold text-2xl" style={{color: TEXT_COLOR}}>{dailySessionsCompleted}</span> / {dailyGoal} sessions
                    </p>
                    {dailySessionsCompleted >= dailyGoal && (
                        <p className="text-sm mt-1 font-medium" style={{color: TEXT_COLOR}}>Goal complete! ✨</p>
                    )}
                </div>
            ) : (
                    <p className="opacity-80">
                    You've completed <span className="font-bold">{dailySessionsCompleted}</span> focus sessions today.
                    </p>
            )}
        </div>
        
        <div className="flex justify-around text-center mt-4">
            <div>
                <p className="font-bold text-2xl">{focusStreak}</p>
                <p className="text-sm opacity-70">Day Streak</p>
            </div>
            <div>
                <p className="font-bold text-2xl">{totalSessions}</p>
                <p className="text-sm opacity-70">Total Sessions</p>
            </div>
        </div>

        <WeeklyProgressChart progress={weeklyProgress} goal={dailyGoal} />
        
        <div className="border-t border-black/10 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Tips</h3>
          <div className="text-center opacity-80 space-y-2">
              <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">Space</kbd> to Play / Pause</p>
              <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">→</kbd> to Skip Session</p>
          </div>
        </div>

        <div className="space-y-4 text-center leading-relaxed opacity-80 border-t border-black/10 pt-6 mt-6">
            <h2 className="text-xl font-bold mb-2">🌿 A Gentle Place to Focus</h2>
            <p>This is a minimal timer designed for those who find traditional Pomodoro apps too stimulating.</p>
            <p>The soft colors, gentle sounds, and clean interface are here to quietly support you during your study and work time.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;