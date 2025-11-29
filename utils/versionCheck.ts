// 版本检测和缓存管理工具

const APP_VERSION = '1.0.8'; // 与 package.json 保持一致
const VERSION_KEY = 'app_version';

/**
 * 检查应用版本是否更新
 * @returns true 如果版本已更新
 */
export const checkVersionUpdate = (): boolean => {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  
  if (!storedVersion) {
    // 首次访问，保存当前版本
    localStorage.setItem(VERSION_KEY, APP_VERSION);
    return false;
  }
  
  if (storedVersion !== APP_VERSION) {
    console.log(`Version updated: ${storedVersion} -> ${APP_VERSION}`);
    return true;
  }
  
  return false;
};

/**
 * 更新存储的版本号
 */
export const updateStoredVersion = (): void => {
  localStorage.setItem(VERSION_KEY, APP_VERSION);
  console.log(`Version updated to ${APP_VERSION}`);
};

/**
 * 获取当前应用版本
 */
export const getCurrentVersion = (): string => {
  return APP_VERSION;
};

/**
 * 清除版本相关的缓存
 */
export const clearVersionCache = async (): Promise<void> => {
  // 清除 localStorage 中的版本信息
  localStorage.removeItem(VERSION_KEY);
  
  // 清除所有缓存
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared due to version update');
  }
};

/**
 * 处理版本更新
 * 如果检测到版本更新，清除缓存并更新版本号
 */
export const handleVersionUpdate = async (): Promise<boolean> => {
  const isUpdated = checkVersionUpdate();
  
  if (isUpdated) {
    console.log('Handling version update...');
    
    // 清除缓存
    await clearVersionCache();
    
    // 更新版本号
    updateStoredVersion();
    
    // 提示用户刷新
    console.log('Version update completed. Please refresh the page.');
    
    return true;
  }
  
  return false;
};

/**
 * 初始化版本检测
 * 在应用启动时调用
 */
export const initVersionCheck = async (): Promise<void> => {
  const isUpdated = await handleVersionUpdate();
  
  if (isUpdated) {
    // 如果版本已更新，强制刷新页面
    console.log('Version updated, reloading page...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

