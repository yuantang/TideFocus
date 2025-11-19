import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            // 代码分割优化
            manualChunks: (id) => {
              // 将 node_modules 中的依赖分离到 vendor chunk
              if (id.includes('node_modules')) {
                // React 相关库单独打包
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'react-vendor';
                }
                // Supabase 相关库单独打包
                if (id.includes('@supabase')) {
                  return 'supabase-vendor';
                }
                // Firebase 相关库单独打包
                if (id.includes('firebase')) {
                  return 'firebase-vendor';
                }
                // 其他第三方库
                return 'vendor';
              }
            }
          }
        },
        // 优化构建性能
        chunkSizeWarningLimit: 1000,
        // 启用 CSS 代码分割
        cssCodeSplit: true,
        // 启用 sourcemap（开发环境）
        sourcemap: mode === 'development'
      }
    };
});
