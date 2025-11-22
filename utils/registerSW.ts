// Service Worker 注册工具

export const registerServiceWorker = async (): Promise<boolean> => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registered successfully:', registration.scope);

    // 监听更新
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // 新的 Service Worker 已安装，但旧的仍在控制页面
          console.log('New Service Worker available');
          
          // 可以在这里显示更新提示
          if (confirm('发现新版本！是否立即更新？')) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      });
    });

    // 监听控制器变化
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed');
    });

    return true;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return false;
  }
};

export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      console.log('Service Worker unregistered:', success);
      return success;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

// 检查 Service Worker 状态
export const checkServiceWorkerStatus = (): {
  supported: boolean;
  registered: boolean;
  controller: ServiceWorker | null;
} => {
  const supported = 'serviceWorker' in navigator;
  
  if (!supported) {
    return { supported: false, registered: false, controller: null };
  }

  return {
    supported: true,
    registered: !!navigator.serviceWorker.controller,
    controller: navigator.serviceWorker.controller
  };
};

// 手动触发缓存更新
export const updateCache = async (): Promise<boolean> => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Cache update triggered');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Cache update failed:', error);
    return false;
  }
};

// 清除所有缓存
export const clearAllCaches = async (): Promise<boolean> => {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
};

// 强制刷新应用（清除缓存并重新加载）
export const forceRefresh = async (): Promise<void> => {
  console.log('Force refreshing application...');

  // 1. 清除所有缓存
  await clearAllCaches();

  // 2. 注销 Service Worker
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.unregister()));
  }

  // 3. 硬刷新页面
  window.location.reload();
};

