// Service Worker for TideFocus PWA
const CACHE_NAME = 'tidefocus-v1.0.0';
const RUNTIME_CACHE = 'tidefocus-runtime';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.svg',
  '/favicon.svg',
  '/manifest.json',
  '/favicon-32x32.png',
  '/favicon-192x192.png',
  '/favicon-512x512.png',
  '/apple-touch-icon.png'
];

// 音频文件（按需缓存）
const AUDIO_ASSETS = [
  '/sounds/rain.mp3',
  '/sounds/ocean.mp3',
  '/sounds/forest.mp3',
  '/sounds/cafe.mp3',
  '/sounds/fireplace.mp3',
  '/sounds/thunder.mp3',
  '/sounds/wind.mp3',
  '/sounds/stream.mp3',
  '/sounds/birds.mp3',
  '/sounds/crickets.mp3',
  '/sounds/whitenoise.mp3',
  '/sounds/pinknoise.mp3',
  '/sounds/brownnoise.mp3',
  '/sounds/fan.mp3',
  '/sounds/train.mp3',
  '/sounds/keyboard.mp3',
  '/sounds/clock.mp3',
  '/sounds/heartbeat.mp3',
  '/sounds/breath.mp3',
  '/sounds/meditation.mp3',
  '/sounds/bell.mp3',
  '/sounds/chime.mp3',
  '/sounds/gong.mp3',
  '/sounds/ding.mp3'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Skip waiting');
      return self.skipWaiting();
    })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch 事件 - 网络优先，缓存降级策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非 GET 请求
  if (request.method !== 'GET') {
    return;
  }

  // 跳过 Chrome 扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 跳过 Firebase 和 Analytics 请求
  if (url.hostname.includes('firebase') || url.hostname.includes('google-analytics')) {
    return;
  }

  // 音频文件 - 缓存优先策略
  if (AUDIO_ASSETS.some(asset => url.pathname.includes(asset))) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // 缓存音频文件
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 静态资源 - 缓存优先策略
  if (STATIC_ASSETS.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request);
      })
    );
    return;
  }

  // 其他请求 - 网络优先，缓存降级
  event.respondWith(
    fetch(request)
      .then((response) => {
        // 只缓存成功的响应
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 网络失败，尝试从缓存获取
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 如果是导航请求，返回离线页面
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// 消息事件 - 用于手动触发缓存更新
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

