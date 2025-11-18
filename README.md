<div align="center">

# 🌊 TideFocus - 心流时刻

**专业的番茄钟专注计时器**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/tidefocus)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 📖 简介

TideFocus（心流时刻）是一款专业的番茄钟专注计时器，像潮汐一样有节奏地帮助你进入心流状态。集成白噪音、任务管理、成就系统，让专注成为习惯，提升工作学习效率。

### ✨ 核心特性

#### 🎯 番茄钟计时器
- 25分钟专注时间
- 5分钟短休息
- 15分钟长休息
- 自定义时长设置

#### 🎵 白噪音混音器
- **20种环境音效**
  - 🎚️ 白噪音：白噪音、粉噪音、棕噪音、紫噪音
  - 💧 水声：雨声、海浪、溪流、海洋
  - 🔥 氛围：壁炉、篝火、雷声、风声
  - 🌿 自然：森林、鸟鸣、虫鸣、风铃
  - ☕ 环境：咖啡店、图书馆、空调、城市氛围
- **8个精选混音预设**
- 自由调节音量

#### ✅ 任务管理
- 创建待办任务
- 关联专注会话
- 任务完成追踪
- 历史记录查看

#### 🏆 成就系统
- 29个成就徽章
- 专注时长统计
- 任务完成记录
- 连续专注奖励

#### 📊 数据统计
- 每日专注时长
- 周/月统计图表
- 任务完成率
- 专注趋势分析
- 数据导出（JSON/CSV）

#### 🌍 多语言支持
- 🇨🇳 简体中文
- 🏝️ 繁体中文
- 🇺🇸 English
- 🇪🇸 Español
- 🇯🇵 日本語
- 🇰🇷 한국어

### 🚀 快速开始

#### 环境要求
- Node.js 16+
- npm 或 yarn

#### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yourusername/tidefocus.git
cd tidefocus
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:3000`

#### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 📁 项目结构

```
tidefocus/
├── components/          # React 组件
│   ├── AchievementCard.tsx
│   ├── AchievementUnlockModal.tsx
│   ├── CircularProgress.tsx
│   ├── ConfirmDialog.tsx
│   ├── Controls.tsx
│   ├── Icons.tsx
│   ├── InfoModal.tsx
│   ├── IntentionModal.tsx
│   ├── LongBreakPanel.tsx
│   ├── SettingsModal.tsx
│   ├── TaskListModal.tsx
│   ├── TimerPanel.tsx
│   ├── Toast.tsx
│   └── ToastContainer.tsx
├── hooks/              # 自定义 Hooks
│   ├── useAnalytics.ts
│   └── useToast.ts
├── public/             # 静态资源
│   ├── sounds/         # 音频文件
│   ├── logo.svg        # 应用图标
│   ├── manifest.json   # PWA 配置
│   └── robots.txt      # SEO 配置
├── App.tsx             # 主应用组件
├── constants.ts        # 常量定义
├── firebase.ts         # Firebase 配置
├── i18n.ts            # 国际化配置
├── types.ts           # TypeScript 类型定义
├── utils.ts           # 工具函数
├── index.html         # HTML 入口
├── index.tsx          # React 入口
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

### 🛠️ 技术栈

- **前端框架**: React 19.2.0
- **语言**: TypeScript 5.8.2
- **构建工具**: Vite 6.2.0
- **样式**: Tailwind CSS
- **分析**: Firebase Analytics
- **状态管理**: React Hooks + LocalStorage

### 📱 PWA 支持

TideFocus 支持 PWA（渐进式 Web 应用），可以：
- 安装到桌面
- 离线使用
- 接收通知（开发中）

### 🔧 配置

#### Firebase Analytics（可选）

如果需要启用 Firebase Analytics：

1. 在 Firebase Console 创建项目
2. 复制配置信息到 `firebase.ts`
3. 重启开发服务器

### 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

### 📧 联系方式

- Email: moreless1024@gmail.com
- 项目主页: [GitHub](https://github.com/yourusername/tidefocus)

### 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。

---

## English

### 📖 Introduction

TideFocus is a professional Pomodoro focus timer that helps you enter flow state with rhythmic focus sessions like the tide. Integrated with white noise, task management, and achievement system to make focus a habit and boost productivity.

### ✨ Key Features

#### 🎯 Pomodoro Timer
- 25-minute focus sessions
- 5-minute short breaks
- 15-minute long breaks
- Customizable durations

#### 🎵 Soundscape Mixer
- **20 ambient sounds**
  - 🎚️ White Noise: White, Pink, Brown, Violet
  - 💧 Water: Rain, Waves, Stream, Ocean
  - 🔥 Atmosphere: Fireplace, Campfire, Thunder, Wind
  - 🌿 Nature: Forest, Birds, Crickets, Wind Chimes
  - ☕ Ambient: Cafe, Library, Air Conditioner, City
- **8 curated presets**
- Volume control for each sound

#### ✅ Task Management
- Create to-do tasks
- Link tasks to focus sessions
- Track task completion
- View history

#### 🏆 Achievement System
- 29 achievement badges
- Focus time statistics
- Task completion records
- Streak rewards

#### 📊 Statistics
- Daily focus time
- Weekly/monthly charts
- Task completion rate
- Focus trend analysis
- Data export (JSON/CSV)

#### 🌍 Multi-language Support
- 🇨🇳 Simplified Chinese
- 🏝️ Traditional Chinese
- 🇺🇸 English
- 🇪🇸 Spanish
- 🇯🇵 Japanese
- 🇰🇷 Korean

### 🚀 Quick Start

#### Prerequisites
- Node.js 16+
- npm or yarn

#### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tidefocus.git
cd tidefocus
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Visit `http://localhost:3000`

#### Build for Production

```bash
npm run build
```

Build output will be in the `dist` directory.

### 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Analytics**: Firebase Analytics
- **State Management**: React Hooks + LocalStorage

### 📱 PWA Support

TideFocus supports PWA (Progressive Web App):
- Install to desktop
- Offline usage
- Push notifications (coming soon)

### 🔧 Configuration

#### Firebase Analytics (Optional)

To enable Firebase Analytics:

1. Create a project in Firebase Console
2. Copy configuration to `firebase.ts`
3. Restart development server

### 📄 License

MIT License - see [LICENSE](LICENSE) file

### 📧 Contact

- Email: moreless1024@gmail.com
- Project: [GitHub](https://github.com/yourusername/tidefocus)

### 🙏 Acknowledgments

Thanks to all developers and users who contributed to this project.

---

<div align="center">

**Made with ❤️ by TideFocus Team**

</div>
