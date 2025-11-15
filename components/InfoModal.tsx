import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import { Achievement } from '../types';
import { ACHIEVEMENTS } from '../constants';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyGoal: number;
  dailySessionsCompleted: number;
  weeklyProgress: { day: string; count: number; isToday: boolean }[];
  totalSessions: number;
  focusStreak: number;
  unlockedAchievements: string[];
}

const TEXT_COLOR = '#6b5a5a';
const BG_COLOR = '#fdf6f6';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${active ? 'bg-black/5' : 'opacity-60 hover:opacity-100 hover:bg-black/5'}`}>
        {children}
    </button>
);

const MilestonesTab: React.FC<{ unlocked: string[] }> = ({ unlocked }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlocked.includes(ach.id);
            const Icon = ach.icon;
            return (
                <div key={ach.id} className={`p-4 rounded-lg bg-black/5 transition-opacity ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
                    <Icon className={`w-10 h-10 mx-auto mb-2 ${isUnlocked ? '' : 'text-current/50'}`} />
                    <h4 className="font-semibold">{ach.name}</h4>
                    <p className="text-xs opacity-70 mt-1">{ach.description}</p>
                </div>
            )
        })}
    </div>
);

const WeeklyProgressChart: React.FC<{ progress: { day: string; count: number; isToday: boolean }[], goal: number }> = ({ progress, goal }) => {
  const maxCount = Math.max(goal > 0 ? goal : 1, ...progress.map(p => p.count));
  return (
    <div className="flex justify-between items-end gap-2 h-32" style={{color: TEXT_COLOR}}>
      {progress.map((data, index) => (
        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative text-center">
          <div className="w-full h-full flex items-end justify-center">
            <div className="w-3/4 max-w-md bg-black/5 rounded-t-sm relative" style={{height: '100%'}}>
              <div className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ease-out ${data.isToday ? 'bg-current' : 'bg-current opacity-40'}`} style={{ height: `${maxCount > 0 ? (data.count / maxCount) * 100 : 0}%` }} />
            </div>
          </div>
          <span className={`text-xs font-medium ${data.isToday ? 'opacity-100 font-bold' : 'opacity-60'}`}>{data.day.slice(0, 1)}</span>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/70 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-300">
            {data.count} session{data.count !== 1 ? 's' : ''}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black/70 rotate-45"></div>
          </div>
        </div>
      ))}
    </div>
  );
};


const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, dailyGoal, dailySessionsCompleted, weeklyProgress, totalSessions, focusStreak, unlockedAchievements }) => {
  const [activeTab, setActiveTab] = useState('progress');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="rounded-lg shadow-xl w-11/12 max-w-lg relative" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100 z-10" aria-label="Close information">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="flex border-b border-black/10 px-4">
            <TabButton active={activeTab === 'progress'} onClick={() => setActiveTab('progress')}>Progress</TabButton>
            <TabButton active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')}>Milestones</TabButton>
            <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>About</TabButton>
        </div>

        <div className="p-6 sm:p-8">
            {activeTab === 'progress' && (
                 <div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Today's Focus</h3>
                        {dailyGoal > 0 ? (
                            <div>
                                <p className="text-lg opacity-90">
                                    <span className="font-bold text-2xl" style={{color: TEXT_COLOR}}>{dailySessionsCompleted}</span> / {dailyGoal} sessions
                                </p>
                                {dailySessionsCompleted >= dailyGoal && (<p className="text-sm mt-1 font-medium" style={{color: TEXT_COLOR}}>Goal complete! ✨</p>)}
                            </div>
                        ) : (
                            <p className="opacity-80">You've completed <span className="font-bold">{dailySessionsCompleted}</span> focus sessions today.</p>
                        )}
                    </div>
                    
                    <div className="flex justify-around text-center mt-4">
                        <div><p className="font-bold text-2xl">{focusStreak}</p><p className="text-sm opacity-70">Day Streak</p></div>
                        <div><p className="font-bold text-2xl">{totalSessions}</p><p className="text-sm opacity-70">Total Sessions</p></div>
                    </div>

                    <div className="border-t border-black/10 pt-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">Weekly Progress</h3>
                        <WeeklyProgressChart progress={weeklyProgress} goal={dailyGoal} />
                    </div>
                </div>
            )}
            {activeTab === 'milestones' && (
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Your Milestones</h3>
                    <MilestonesTab unlocked={unlockedAchievements} />
                </div>
            )}
            {activeTab === 'about' && (
                <div>
                    <div className="space-y-4 text-center leading-relaxed opacity-80">
                        <h2 className="text-xl font-bold mb-2">🌿 A Gentle Place to Focus</h2>
                        <p>This is a minimal timer designed for those who find traditional Pomodoro apps too stimulating.</p>
                        <p>The soft colors, gentle sounds, and clean interface are here to quietly support you during your study and work time.</p>
                    </div>
                     <div className="border-t border-black/10 pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">Quick Tips</h3>
                      <div className="text-center opacity-80 space-y-2">
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">Space</kbd> to Play / Pause</p>
                          <p><kbd className="font-sans font-semibold bg-black/10 rounded-md px-2 py-1 mx-1">→</kbd> to Skip Session</p>
                      </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;