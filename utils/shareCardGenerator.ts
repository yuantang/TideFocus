import QRCode from 'qrcode';

export interface ShareCardConfig {
  type: 'daily' | 'achievement' | 'weekly' | 'milestone';
  template: 'minimal' | 'gradient' | 'data-viz';
  data: {
    focusMinutes: number;
    tasksCompleted: number;
    streak: number;
    chartData?: number[];
  };
  user: {
    name: string;
    referralCode: string;
  };
}

// 辅助函数：加载图片
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 简约模板
const drawMinimalTemplate = async (
  ctx: CanvasRenderingContext2D,
  config: ShareCardConfig,
  qrImage: HTMLImageElement
) => {
  const { width, height } = ctx.canvas;

  // 白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 标题
  ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#1a202c';
  ctx.textAlign = 'center';
  ctx.fillText('🎯 今日专注成就', width / 2, 200);

  // 数据
  ctx.font = '56px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#2d3748';
  ctx.fillText(`⏱️  ${config.data.focusMinutes} 分钟`, width / 2, 400);
  ctx.fillText(`✅  ${config.data.tasksCompleted} 个任务`, width / 2, 520);
  ctx.fillText(`🔥  连续 ${config.data.streak} 天`, width / 2, 640);

  // 底部文字
  ctx.font = '36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#718096';
  ctx.fillText('专注让生活更美好', width / 2, 900);

  // 二维码
  ctx.drawImage(qrImage, width / 2 - 100, height - 350, 200, 200);

  // 品牌信息
  ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#6b5a5a';
  ctx.fillText('TideFocus - 心流时刻', width / 2, height - 80);
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#a0aec0';
  ctx.fillText('扫码开启你的专注之旅', width / 2, height - 40);
};

// 渐变模板
const drawGradientTemplate = async (
  ctx: CanvasRenderingContext2D,
  config: ShareCardConfig,
  qrImage: HTMLImageElement
) => {
  const { width, height } = ctx.canvas;

  // 渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 白色文字
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('💪 我今天专注了', width / 2, 200);

  // 大号数字
  ctx.font = 'bold 120px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(`${config.data.focusMinutes}`, width / 2, 400);
  ctx.font = '56px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('分钟', width / 2, 480);

  // 其他数据
  ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(`完成了 ${config.data.tasksCompleted} 个任务`, width / 2, 600);
  ctx.fillText(`连续专注 ${config.data.streak} 天`, width / 2, 680);

  // 标签
  ctx.font = '36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('#专注力 #番茄工作法 #自律', width / 2, 850);

  // 二维码（白色背景）
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(width / 2 - 110, height - 360, 220, 220);
  ctx.drawImage(qrImage, width / 2 - 100, height - 350, 200, 200);

  // 底部
  ctx.fillStyle = '#ffffff';
  ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('TideFocus - 心流时刻', width / 2, height - 80);
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('扫码开启你的专注之旅', width / 2, height - 40);
};

// 数据可视化模板
const drawDataVizTemplate = async (
  ctx: CanvasRenderingContext2D,
  config: ShareCardConfig,
  qrImage: HTMLImageElement
) => {
  const { width, height } = ctx.canvas;

  // 浅色背景
  ctx.fillStyle = '#fdf6f6';
  ctx.fillRect(0, 0, width, height);

  // 标题
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#6b5a5a';
  ctx.textAlign = 'center';
  ctx.fillText('📊 本周专注报告', width / 2, 150);

  // 绘制图表（如果有数据）
  if (config.data.chartData && config.data.chartData.length > 0) {
    drawChart(ctx, config.data.chartData, 150, 250, 900, 300);
  }

  // 统计数据
  ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#2d3748';
  ctx.fillText(`总时长：${config.data.focusMinutes} 分钟`, width / 2, 650);
  ctx.fillText(`完成任务：${config.data.tasksCompleted} 个`, width / 2, 730);
  ctx.fillText(`连续天数：${config.data.streak} 天`, width / 2, 810);

  // 提升标签
  ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#48bb78';
  ctx.fillText('🚀 比上周提升 25%', width / 2, 920);

  // 二维码
  ctx.drawImage(qrImage, width / 2 - 100, height - 350, 200, 200);

  // 品牌信息
  ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#6b5a5a';
  ctx.fillText('TideFocus - 心流时刻', width / 2, height - 80);
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#a0aec0';
  ctx.fillText('扫码开启你的专注之旅', width / 2, height - 40);
};

// 绘制图表
const drawChart = (
  ctx: CanvasRenderingContext2D,
  data: number[],
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const max = Math.max(...data, 1);
  const barWidth = width / data.length;
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 绘制柱状图
  data.forEach((value, index) => {
    const barHeight = (value / max) * height;
    const barX = x + index * barWidth + barWidth * 0.15;
    const barY = y + height - barHeight;

    // 柱子
    ctx.fillStyle = '#667eea';
    ctx.fillRect(barX, barY, barWidth * 0.7, barHeight);

    // 数值
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#2d3748';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}`, barX + barWidth * 0.35, barY - 10);

    // 星期标签
    ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#718096';
    ctx.fillText(days[index] || '', barX + barWidth * 0.35, y + height + 30);
  });
};

// 主函数：生成分享卡片
export const generateShareCard = async (config: ShareCardConfig): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d')!;

  // 生成二维码
  const qrUrl = `https://tidefocus.app?ref=${config.user.referralCode}`;
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    width: 200,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  const qrImage = await loadImage(qrDataUrl);

  // 根据模板绘制
  switch (config.template) {
    case 'minimal':
      await drawMinimalTemplate(ctx, config, qrImage);
      break;
    case 'gradient':
      await drawGradientTemplate(ctx, config, qrImage);
      break;
    case 'data-viz':
      await drawDataVizTemplate(ctx, config, qrImage);
      break;
  }

  // 转换为 Blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png', 0.95);
  });
};

