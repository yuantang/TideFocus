#!/usr/bin/env node

/**
 * 自动更新版本号脚本
 *
 * 功能：
 * 1. 读取 package.json 中的版本号
 * 2. 自动递增版本号（补丁版本 +1）
 * 3. 更新以下文件中的版本号：
 *    - package.json
 *    - public/sw.js (Service Worker)
 *    - utils/versionCheck.ts
 *    - components/InfoModal.tsx
 *
 * 使用方法：
 * npm run version:patch  # 补丁版本 +1 (1.0.0 -> 1.0.1)
 * npm run version:minor  # 小版本 +1 (1.0.0 -> 1.1.0)
 * npm run version:major  # 大版本 +1 (1.0.0 -> 2.0.0)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取版本类型参数
const versionType = process.argv[2] || 'patch'; // patch, minor, major

// 读取 package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 解析当前版本号
const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// 计算新版本号
let newVersion;
switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

console.log(`📦 更新版本号: ${currentVersion} -> ${newVersion}`);

// 1. 更新 package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✅ 已更新 package.json');

// 2. 更新 public/sw.js
const swPath = path.join(__dirname, '../public/sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');
swContent = swContent.replace(
  /const CACHE_NAME = 'tidefocus-v[\d.]+';/,
  `const CACHE_NAME = 'tidefocus-v${newVersion}';`
);
swContent = swContent.replace(
  /const RUNTIME_CACHE = 'tidefocus-runtime-v[\d.]+';/,
  `const RUNTIME_CACHE = 'tidefocus-runtime-v${newVersion}';`
);
fs.writeFileSync(swPath, swContent);
console.log('✅ 已更新 public/sw.js');

// 3. 更新 utils/versionCheck.ts
const versionCheckPath = path.join(__dirname, '../utils/versionCheck.ts');
let versionCheckContent = fs.readFileSync(versionCheckPath, 'utf8');
versionCheckContent = versionCheckContent.replace(
  /const APP_VERSION = '[\d.]+';/,
  `const APP_VERSION = '${newVersion}';`
);
fs.writeFileSync(versionCheckPath, versionCheckContent);
console.log('✅ 已更新 utils/versionCheck.ts');

// 4. 更新 i18n.ts 中的所有语言版本号
const i18nPath = path.join(__dirname, '../i18n.ts');
if (fs.existsSync(i18nPath)) {
  let i18nContent = fs.readFileSync(i18nPath, 'utf8');
  // 更新所有语言的 versionNumber
  i18nContent = i18nContent.replace(
    /versionNumber: 'v[\d.]+'/g,
    `versionNumber: 'v${newVersion}'`
  );
  fs.writeFileSync(i18nPath, i18nContent);
  console.log('✅ 已更新 i18n.ts');
}

console.log(`\n🎉 版本号更新完成！新版本: v${newVersion}`);
console.log('\n📝 下一步操作：');
console.log('1. 运行 npm run build 构建新版本');
console.log('2. 提交代码: git add -A && git commit -m "chore: bump version to v' + newVersion + '"');
console.log('3. 推送代码: git push origin main');

