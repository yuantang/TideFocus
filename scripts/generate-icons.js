import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'favicon-192x192.png' },
  { size: 512, name: 'favicon-512x512.png' }
];

async function generateIcons() {
  const svgPath = path.join(__dirname, '../public/logo.svg');
  const svgBuffer = fs.readFileSync(svgPath);
  
  console.log('🎨 开始生成 PNG 图标...\n');
  
  for (const { size, name } of sizes) {
    try {
      const outputPath = path.join(__dirname, '../public', name);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✅ 生成成功: ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ 生成失败: ${name}`, error.message);
    }
  }
  
  console.log('\n🎉 所有图标生成完成！');
}

generateIcons().catch(console.error);

