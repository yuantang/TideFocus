import React from 'react';

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const PlayIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
);

export const VolumeIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

export const VolumeMuteIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" >
        <path d="M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4.24-5.55c-.78-.78-1.56-1.17-2.34-1.17s-1.56.39-2.34 1.17c-.78.78-1.17 1.56-1.17 2.34s.39 1.56 1.17 2.34c.78.78 1.56 1.17 2.34 1.17s1.56-.39 2.34-1.17c.78-.78 1.17-1.56 1.17-2.34s-.39-1.56-1.17-2.34zm-8.48 0c-.78-.78-1.17-1.56-1.17-2.34s.39-1.56 1.17-2.34c.78-.78 1.56-1.17 2.34-1.17s1.56.39 2.34 1.17c.78.78 1.17 1.56 1.17 2.34s-.39 1.56-1.17 2.34c-.78.78-1.56 1.17-2.34 1.17s-1.56-.39-2.34-1.17zm0 8.48c-.78-.78-1.56-1.17-2.34-1.17s-1.56.39-2.34 1.17c-.78.78-1.17 1.56-1.17 2.34s.39 1.56 1.17 2.34c.78.78 1.56 1.17 2.34 1.17s1.56-.39 2.34-1.17c.78-.78 1.17-1.56 1.17-2.34s-.39-1.56-1.17-2.34zm8.48 0c-.78-.78-1.17-1.56-1.17-2.34s.39-1.56 1.17-2.34c.78-.78 1.56-1.17 2.34-1.17s1.56.39 2.34 1.17c.78.78 1.17 1.56 1.17 2.34s-.39 1.56-1.17 2.34c-.78.78-1.56 1.17-2.34 1.17s-1.56-.39-2.34-1.17z" />
    </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v2h-2zm0 4h2v6h-2z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
);

export const FocusIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

export const BreakIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="2" x2="6" y2="5"></line>
        <line x1="10" y1="2" x2="10" y2="5"></line>
        <line x1="14" y1="2" x2="14" y2="5"></line>
    </svg>
);

export const LongBreakIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const FullscreenIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
);

export const ExitFullscreenIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
);

export const TaskIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 6.5l-1.5-1.5-1.5 1.5"></path><path d="M15 17.5l-1.5 1.5-1.5-1.5"></path>
        <path d="M3 12v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"></path><path d="M3 12v2a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-2"></path>
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"></path>
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
    </svg>
);

export const SproutIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10"></path><path d="M10 20c5.5-2.5.8-6.4 3-10"></path>
        <path d="M9.5 9.4c1.1.8 1.8 2.2 1.5 3.6-1-1.5-3-1-3.5-2.5-1.5-4.5 2-8 6-6"></path>
    </svg>
);

export const SevenDayIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
        <path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>
        <path d="M10 14h4l-2 3-2-3z"></path>
    </svg>
);

export const MoonCycleIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6"></circle>
        <path d="M12 2v2"></path><path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path><path d="M20 12h2"></path>
        <path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path>
    </svg>
);