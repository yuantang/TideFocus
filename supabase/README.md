# TideFocus Supabase 配置指南

本指南将帮助你设置 Supabase 云端同步功能。

## 📋 前置要求

- 一个 Supabase 账号（免费）
- 项目已安装 `@supabase/supabase-js`

## 🚀 快速开始

### 1. 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: TideFocus
   - **Database Password**: 设置一个强密码（请保存好）
   - **Region**: 选择离你最近的区域（如 Singapore）
4. 点击 "Create new project"，等待 1-2 分钟

### 2. 执行数据库脚本

1. 在 Supabase Dashboard 中，进入你的项目
2. 点击左侧菜单的 **SQL Editor**
3. 点击 "New query"
4. 复制 `supabase/schema.sql` 文件的全部内容
5. 粘贴到 SQL 编辑器中
6. 点击 "Run" 执行脚本

### 3. 配置环境变量

1. 在 Supabase Dashboard 中，点击左侧菜单的 **Settings** > **API**
2. 找到以下信息：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 一个很长的字符串

3. 在项目根目录创建 `.env` 文件：

```bash
# 复制 .env.example 并填入你的配置
cp .env.example .env
```

4. 编辑 `.env` 文件，填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 配置邮件认证（可选但推荐）

1. 在 Supabase Dashboard 中，点击 **Authentication** > **Providers**
2. 找到 **Email** 提供商
3. 确保 "Enable Email provider" 已开启
4. 配置邮件模板（可选）：
   - 点击 **Email Templates**
   - 自定义 "Confirm signup"、"Reset password" 等模板

### 5. 测试连接

1. 重启开发服务器：

```bash
npm run dev
```

2. 打开浏览器，访问 `http://localhost:3000`
3. 点击右上角的 "登录" 按钮
4. 尝试注册一个新账号
5. 检查邮箱，点击验证链接
6. 登录成功后，数据会自动同步到云端

## 📊 数据库表结构

### `profiles` 表
存储用户配置信息：
- `id`: 用户 ID（关联 auth.users）
- `email`: 邮箱
- `display_name`: 显示名称
- `avatar_url`: 头像 URL
- `created_at`: 创建时间
- `updated_at`: 更新时间

### `user_data` 表
存储用户应用数据：
- `id`: 记录 ID
- `user_id`: 用户 ID
- `data_type`: 数据类型（settings/history/tasks/achievements/stats）
- `data`: JSON 数据
- `version`: 版本号（用于冲突检测）
- `created_at`: 创建时间
- `updated_at`: 更新时间

## 🔒 安全性

- ✅ 启用了行级安全策略（RLS）
- ✅ 用户只能访问自己的数据
- ✅ 所有敏感操作都需要认证
- ✅ 使用 Supabase 的安全最佳实践

## 🐛 常见问题

### Q: 注册后没有收到验证邮件？
A: 检查垃圾邮件文件夹，或在 Supabase Dashboard > Authentication > Users 中手动验证用户。

### Q: 同步失败，显示 "User not authenticated"？
A: 确保已登录，并且 `.env` 文件配置正确。

### Q: 数据没有同步到云端？
A: 检查浏览器控制台是否有错误，确保 RLS 策略已正确配置。

### Q: 如何查看云端数据？
A: 在 Supabase Dashboard > Table Editor 中查看 `user_data` 表。

## 📚 更多资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Row Level Security 指南](https://supabase.com/docs/guides/auth/row-level-security)

## 🎉 完成！

现在你的 TideFocus 应用已经支持云端同步功能了！

用户可以：
- ✅ 注册和登录账号
- ✅ 自动同步数据到云端
- ✅ 在多设备间同步数据
- ✅ 从云端恢复数据

