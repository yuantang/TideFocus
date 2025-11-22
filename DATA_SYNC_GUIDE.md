# 数据同步完整指南

## 🎯 问题分析与解决方案

### 原问题
用户报告：**登录账号后，成就数据没有同步出来**

### 根本原因
1. **简单覆盖策略** - 旧的 `smartMerge` 使用时间戳比较，直接覆盖数据
2. **数据丢失** - 本地成就被云端旧数据覆盖，或云端成就被本地数据覆盖
3. **缺少真正的合并** - 没有对数组类型数据（成就）进行并集合并
4. **统计数据分散** - 统计数据存储在多个独立的 localStorage 键中，未统一同步

---

## ✅ 完整解决方案

### 1. **智能数据合并策略**

#### 成就数据（achievements）
```typescript
// 取并集 - 合并所有唯一成就
const merged = Array.from(new Set([...localData, ...cloudData]));
```

**示例**：
- 本地成就：`['first-session', 'early-bird', 'task-master']`
- 云端成就：`['first-session', 'night-owl']`
- 合并结果：`['first-session', 'early-bird', 'task-master', 'night-owl']`

#### 历史记录（history）
```typescript
// 合并所有日期，相同日期取最大值
const merged = { ...cloudData, ...localData };
Object.keys(cloudData).forEach(date => {
  if (localData[date]) {
    merged[date] = Math.max(localData[date], cloudData[date]);
  }
});
```

#### 统计数据（stats）
```typescript
// 所有数值字段取最大值
Object.keys(localData).forEach(key => {
  if (typeof localData[key] === 'number' && typeof cloudData[key] === 'number') {
    merged[key] = Math.max(localData[key], cloudData[key]);
  }
});
```

#### 任务数据（tasks）
```typescript
// 使用日期较新的数据（任务每日重置）
const useLocal = localData.date >= cloudData.date;
return useLocal ? localData : cloudData;
```

#### 设置数据（settings）
```typescript
// 使用本地数据优先（用户最近的设置）
return localData || cloudData;
```

---

### 2. **统一统计数据管理**

创建了 `utils/syncHelper.ts` 工具：

#### 收集所有统计数据
```typescript
export const collectUserStats = (): UserStats => {
  return {
    totalSessions: Number(localStorage.getItem('totalSessions') || 0),
    dailySessionsCompleted: Number(localStorage.getItem('dailySessionsCompleted') || 0),
    focusStreak: Number(localStorage.getItem('focusStreak') || 0),
    totalFocusMinutes: Number(localStorage.getItem('totalFocusMinutes') || 0),
    completedTasks: Number(localStorage.getItem('completedTasks') || 0),
    nightSessions: Number(localStorage.getItem('nightSessions') || 0),
    morningSessions: Number(localStorage.getItem('morningSessions') || 0),
    longestSession: Number(localStorage.getItem('longestSession') || 0),
    goalStreakDays: Number(localStorage.getItem('goalStreakDays') || 0),
    perfectWeeks: Number(localStorage.getItem('perfectWeeks') || 0),
    lastUpdated: new Date().toISOString()
  };
};
```

#### 同步到 userStats
```typescript
export const syncStatsToStorage = (): void => {
  const stats = collectUserStats();
  localStorage.setItem('userStats', JSON.stringify(stats));
};
```

---

### 3. **自动同步机制**

#### 登录后自动同步
```typescript
useEffect(() => {
  if (isAuthenticated && user) {
    const handleLoginSync = async () => {
      console.log('🔄 Starting login sync...');
      await smartMerge(); // 使用智能合并
    };
    const timer = setTimeout(handleLoginSync, 2000);
    return () => clearTimeout(timer);
  }
}, [isAuthenticated, user, smartMerge]);
```

#### 数据变化时自动同步
```typescript
// 监听 localStorage 变化
const syncKeys = [
  'appSettings', 'dailyTasks', 'focusHistory', 
  'unlockedAchievements', 'userStats',
  'totalSessions', 'dailySessionsCompleted', 'focusStreak',
  'totalFocusMinutes', 'completedTasks', 'nightSessions', 
  'morningSessions', 'longestSession'
];
```

#### 定期同步
```typescript
// 每 5 分钟自动同步一次
periodicSyncIntervalMs: 5 * 60 * 1000
```

---

### 4. **页面刷新机制**

合并完成后自动刷新页面：
```typescript
if (hasChanges) {
  // 恢复统计数据
  saveUserStats(stats);
  
  // 刷新页面应用新数据
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
```

---

## 📊 数据同步流程

### 登录时的完整流程

```
用户登录
   ↓
触发 smartMerge
   ↓
收集本地统计数据 → syncStatsToStorage()
   ↓
遍历所有数据类型 (settings, history, tasks, achievements, stats)
   ↓
对于每种数据类型：
   ├─ 都有数据 → 智能合并 → 保存到本地 → 上传到云端
   ├─ 只有云端 → 下载到本地
   └─ 只有本地 → 上传到云端
   ↓
恢复统计数据 → saveUserStats()
   ↓
刷新页面
   ↓
用户看到完整的合并数据
```

---

## 🔍 调试工具

### 查看当前所有数据
```javascript
// 在浏览器控制台执行
import { debugPrintStats } from './utils/syncHelper';
debugPrintStats();
```

### 手动触发同步
```javascript
// 在浏览器控制台执行
localStorage.setItem('force_sync', 'true');
window.location.reload();
```

### 查看同步日志
打开浏览器控制台，查看以下日志：
- `🔄 Starting smart merge...` - 开始合并
- `🔀 Merging achievements data...` - 合并成就
- `📊 Achievements: local=X, cloud=Y, merged=Z` - 合并结果
- `✅ Smart merge completed successfully` - 合并完成
- `🔄 Data changed, reloading page...` - 刷新页面

---

## 📝 localStorage 键名映射

| 数据类型 | localStorage 键名 | 云端 data_type |
|---------|------------------|---------------|
| 设置 | `appSettings` | `settings` |
| 历史记录 | `focusHistory` | `history` |
| 任务 | `dailyTasks` | `tasks` |
| 成就 | `unlockedAchievements` | `achievements` |
| 统计 | `userStats` | `stats` |

---

## ✅ 验证方法

### 测试场景 1：本地有成就，云端没有
1. 未登录状态下完成几个番茄钟，解锁成就
2. 登录账号
3. 查看成就页面，应该看到所有本地成就
4. 检查云端数据库，应该已上传

### 测试场景 2：云端有成就，本地没有
1. 登录账号（云端已有成就数据）
2. 清除浏览器数据
3. 重新登录
4. 查看成就页面，应该看到所有云端成就

### 测试场景 3：两边都有成就（不同）
1. 设备 A：解锁成就 A、B、C
2. 设备 B：解锁成就 C、D、E
3. 设备 A 登录同步
4. 设备 B 登录同步
5. 两个设备都应该看到成就 A、B、C、D、E

---

## 🎉 优势总结

### ✅ 数据不丢失
- 成就数据取并集，永不丢失
- 统计数据取最大值，保留最佳记录
- 历史记录完整合并

### ✅ 自动化
- 登录后自动同步
- 数据变化自动上传
- 定期自动同步

### ✅ 智能合并
- 不同数据类型使用不同合并策略
- 避免简单覆盖导致的数据丢失
- 保留两端的最佳数据

### ✅ 实时更新
- 合并后自动刷新页面
- 用户立即看到最新数据
- 无需手动操作

---

## 🔗 相关文件

- `hooks/useCloudSync.ts` - 云端同步核心逻辑
- `hooks/useAutoSync.ts` - 自动同步触发器
- `hooks/useRealtimeSync.ts` - 实时同步
- `utils/syncHelper.ts` - 同步辅助工具
- `hooks/useAchievements.ts` - 成就管理

---

## 📞 问题排查

如果同步仍然有问题，请检查：

1. **浏览器控制台** - 查看同步日志和错误信息
2. **网络连接** - 确保能访问 Supabase
3. **Supabase 配置** - 检查 `lib/supabase.ts` 配置
4. **RLS 策略** - 确保 `user_data` 表的 RLS 策略正确
5. **localStorage** - 检查是否有配额限制

---

**当前版本：v1.0.6** 🚀

