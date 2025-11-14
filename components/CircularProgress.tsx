import React from 'react';

interface CircularProgressProps {
  progress: number;
  isActive: boolean;
  strokeColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, isActive, strokeColor = 'white' }) => {
  const radius = 90;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 200 200"
      className="transform -rotate-90"
    >
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius + stroke}
        cy={radius + stroke}
        className={isActive ? 'animate-pulse-opacity' : 'opacity-20'}
      />
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius + stroke}
        cy={radius + stroke}
        className={`transition-all duration-1000 ease-linear ${isActive ? 'opacity-100' : 'opacity-50'}`}
      />
    </svg>
  );
};

export default CircularProgress;