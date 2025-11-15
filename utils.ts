export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const faviconLink = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

export const updateFavicon = (progress: number, mode: 'focus' | 'break' | 'long_break' | 'inactive', color: string) => {
  if (!faviconLink) return;

  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, 32, 32);

  if (mode === 'inactive') {
    faviconLink.href = '/vite.svg';
    return;
  }

  // Progress circle background
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Progress arc
  if (progress > 0) {
    ctx.beginPath();
    ctx.arc(16, 16, 14, -0.5 * Math.PI, (2 * Math.PI * progress) - 0.5 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Icon in the middle
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = '16px sans-serif';

  switch (mode) {
    case 'focus':
      ctx.fillText('📖', 16, 17);
      break;
    case 'break':
      ctx.fillText('☕', 16, 17);
      break;
    case 'long_break':
      ctx.fillText('🌙', 16, 17);
      break;
  }

  faviconLink.href = canvas.toDataURL();
};
