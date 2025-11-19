# TideFocus 优化指南

本文档提供详细的优化建议和实施步骤。

---

## 🚨 紧急优化（P0）

### 1. 性能优化 - 代码分割

**当前问题：**
```
dist/assets/index-C9Gf-a-d.js  604.06 kB │ gzip: 168.23 kB
⚠️ 打包文件超过 500 KB
```

**解决方案：**

#### 步骤 1：实现路由级代码分割
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

// 懒加载非关键组件
const InfoModal = lazy(() => import('./components/InfoModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const TaskListModal = lazy(() => import('./components/TaskListModal'));

// 使用 Suspense 包裹
<Suspense fallback={<LoadingSpinner />}>
  <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
</Suspense>
```

#### 步骤 2：优化依赖导入
```typescript
// ❌ 错误：导入整个库
import _ from 'lodash';

// ✅ 正确：只导入需要的函数
import debounce from 'lodash/debounce';
```

#### 步骤 3：配置 Vite 代码分割
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'supabase': ['@supabase/supabase-js'],
          'firebase': ['firebase/analytics']
        }
      }
    }
  }
});
```

**预期效果：**
- 主包大小：< 200 KB
- 首屏加载时间：减少 50%
- Lighthouse 性能分数：> 90

---

### 2. 移除 Tailwind CDN

**当前问题：**
```html
<!-- index.html -->
<script src="https://cdn.tailwindcss.com"></script>
⚠️ 生产环境不应使用 CDN
```

**解决方案：**

#### 步骤 1：安装依赖
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 步骤 2：配置 Tailwind
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 步骤 3：创建 CSS 文件
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 步骤 4：导入 CSS
```typescript
// index.tsx
import './index.css';
```

#### 步骤 5：移除 CDN
```html
<!-- index.html -->
<!-- 删除这一行 -->
<!-- <script src="https://cdn.tailwindcss.com"></script> -->
```

**预期效果：**
- CSS 文件大小：< 50 KB（压缩后）
- 移除外部依赖
- 构建时优化 CSS

---

### 3. 错误处理增强

**当前问题：**
- 缺少全局错误边界
- 错误信息不友好
- 没有错误日志

**解决方案：**

#### 步骤 1：完善 ErrorBoundary
```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误到日志服务
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 可选：发送到 Sentry
    // Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              哎呀，出错了！
            </h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || '发生了未知错误'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### 步骤 2：使用 ErrorBoundary
```typescript
// index.tsx
import ErrorBoundary from './components/ErrorBoundary';

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

#### 步骤 3：添加错误日志（可选）
```bash
npm install @sentry/react
```

```typescript
// index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

**预期效果：**
- 优雅的错误处理
- 用户友好的错误提示
- 错误追踪和监控

---

## 📊 性能监控

### 添加 Web Vitals

```bash
npm install web-vitals
```

```typescript
// utils/reportWebVitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals() {
  onCLS(console.log);
  onFID(console.log);
  onFCP(console.log);
  onLCP(console.log);
  onTTFB(console.log);
}
```

```typescript
// index.tsx
import { reportWebVitals } from './utils/reportWebVitals';

reportWebVitals();
```

---

## 🎨 用户体验优化

### 添加骨架屏

```typescript
// components/SkeletonLoader.tsx
export const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);
```

### 优化加载状态

```typescript
// 使用 Suspense 和骨架屏
<Suspense fallback={<SkeletonLoader />}>
  <LazyComponent />
</Suspense>
```

---

## 📝 下一步行动

### 立即执行（本周）
1. ✅ 清理项目结构
2. [ ] 实现代码分割
3. [ ] 移除 Tailwind CDN
4. [ ] 完善错误处理

### 短期目标（本月）
1. [ ] 添加首次使用引导
2. [ ] 实现番茄钟历史详情
3. [ ] 添加搜索和筛选功能
4. [ ] 优化加载状态

### 中期目标（下季度）
1. [ ] 添加单元测试
2. [ ] 实现性能监控
3. [ ] 优化统计图表
4. [ ] 添加导出功能

---

**持续优化，持续进步！** 🚀

