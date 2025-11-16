// 多语言配置文件

export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'es' | 'ja' | 'ko';

export interface Translations {
  // 通用
  close: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  
  // 标签页
  progress: string;
  milestones: string;
  about: string;
  
  // 视图类型
  dayView: string;
  weekView: string;
  monthView: string;
  
  // 日期导航
  today: string;
  previous: string;
  next: string;
  
  // 周几
  weekdays: {
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
  };
  
  // 周几（短）
  weekdaysShort: {
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
  };
  
  // 进度视图
  currentDayFocus: string;
  currentWeekFocus: string;
  currentMonthFocus: string;
  focusCount: string;
  totalFocusCount: string;
  goalAchieved: string;
  
  // 关键指标
  streakDays: string;
  totalSessions: string;
  
  // 进度图表
  currentDayProgress: string;
  currentWeekProgress: string;
  currentMonthProgress: string;
  
  // 快速统计
  quickStats: string;
  totalTime: string;
  totalFocus: string;
  averagePerDay: string;
  streakCount: string;
  completedTasks: string;
  longestSession: string;
  perfectWeeks: string;
  
  // 月度统计
  monthlyStats: string;
  overview: string;
  timeDistribution: string;
  personalRecords: string;
  dataExport: string;
  exportJSON: string;
  exportCSV: string;
  
  // 时段
  timeSlots: {
    lateNight: string;
    earlyMorning: string;
    morning: string;
    noon: string;
    afternoon: string;
    evening: string;
  };
  
  // 成就
  achievements: string;
  unlocked: string;
  locked: string;
  all: string;
  comingSoon: string;
  unlockedAt: string;
  achievementProgress: string;
  
  // 成就筛选
  achievementFilters: {
    all: string;
    unlocked: string;
    locked: string;
    allCategories: string;
  };

  // 成就分类
  achievementCategories: {
    focus: string;
    streak: string;
    time: string;
    task: string;
  };

  // 成就相关
  yourMilestones: string;
  upcomingAchievement: string;
  unlockedOn: string;
  noAchievements: string;

  // 成就名称和描述
  achievementNames: {
    [key: string]: string;
  };
  achievementDescriptions: {
    [key: string]: string;
  };

  // 音景预设名称和描述
  soundscapeNames: {
    [key: string]: string;
  };
  soundscapeDescriptions: {
    [key: string]: string;
  };

  // 白噪音资源名称
  soundNames: {
    [key: string]: string;
  };

  // 白噪音分类名称
  soundCategoryNames: {
    [key: string]: string;
  };

  // 关于
  aboutTitle: string;
  aboutDescription: string;
  version: string;
  
  // 单位
  units: {
    times: string;
    days: string;
    weeks: string;
    hours: string;
    minutes: string;
    sessions: string;
  };
  
  // 周标签
  weekLabel: string;

  // 任务管理
  tasks: {
    title: string;
    addTask: string;
    placeholder: string;
    completed: string;
    totalPomodoros: string;
    emptyState: string;
    emptyHint: string;
    highPriority: string;
    mediumPriority: string;
    lowPriority: string;
    deleteConfirm: string;
    deleteMessage: string;
    filterAll: string;
    filterActive: string;
    filterCompleted: string;
    sortByPriority: string;
    sortByCreated: string;
    sortByStatus: string;
  };

  // 意图设置
  intention: {
    title: string;
    subtitle: string;
    placeholder: string;
    skip: string;
    start: string;
  };

  // 设置
  settings: {
    title: string;
    language: string;
    languageReloadHint: string;
    timer: string;
    focusDuration: string;
    breakDuration: string;
    longBreakDuration: string;
    sessionsPerRound: string;
    sessionsPerRoundHint: string;
    dailyGoal: string;
    soundscape: string;
    completionSound: string;
    reminderSound: string;
    breathingGuide: string;
    desktopNotifications: string;
    theme: string;
    focusBg: string;
    focusText: string;
    breakBg: string;
    breakText: string;
    longBreakBg: string;
    longBreakText: string;
    resetTheme: string;
    presets: string;
    currentMix: string;
    browseLibrary: string;
    hideLibrary: string;
    categories: string;
  };

  // Toast 提示
  toast: {
    taskAdded: string;
    taskDeleted: string;
    taskCompleted: string;
    taskUncompleted: string;
    settingsSaved: string;
    themeReset: string;
    achievementUnlocked: string;
  };

  // 确认对话框
  confirm: string;

  // 关于页面
  aboutContent: {
    subtitle: string;
    description1: string;
    description2: string;
    quickTips: string;
    tip1: string;
    tip2: string;
  };

  // CSV 导出列标题
  csvHeaders: {
    metric: string;
    value: string;
    totalSessions: string;
    totalMinutes: string;
    completedTasks: string;
    streakDays: string;
    dailyGoal: string;
    todayCompleted: string;
    nightSessions: string;
    morningSessions: string;
    longestSession: string;
    perfectWeeks: string;
    goalStreakDays: string;
  };

  // 主界面
  mainUI: {
    focus: string;
    break: string;
    longBreak: string;
    skipToBreak: string;
    skipToFocus: string;
    skipToLongBreak: string;
  };
}

export const translations: Record<Language, Translations> = {
  'zh-CN': {
    close: '关闭',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',

    progress: '进度',
    milestones: '成就',
    about: '关于',
    
    dayView: '日',
    weekView: '周',
    monthView: '月',
    
    today: '今天',
    previous: '上一个',
    next: '下一个',
    
    weekdays: {
      sun: '周日',
      mon: '周一',
      tue: '周二',
      wed: '周三',
      thu: '周四',
      fri: '周五',
      sat: '周六',
    },
    
    weekdaysShort: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六',
    },
    
    currentDayFocus: '当日专注',
    currentWeekFocus: '本周专注',
    currentMonthFocus: '本月专注',
    focusCount: '专注次数',
    totalFocusCount: '总专注次数',
    goalAchieved: '目标达成！',
    
    streakDays: '连续专注天数',
    totalSessions: '总专注次数',
    
    currentDayProgress: '当日进度',
    currentWeekProgress: '本周进度',
    currentMonthProgress: '本月进度',
    
    quickStats: '快速统计',
    totalTime: '总时长',
    totalFocus: '总专注',
    averagePerDay: '平均/天',
    streakCount: '连续天数',
    completedTasks: '完成任务',
    longestSession: '最长专注',
    perfectWeeks: '完美周数',
    
    monthlyStats: '月度统计',
    overview: '总览',
    timeDistribution: '时段分布',
    personalRecords: '个人记录',
    dataExport: '数据导出',
    exportJSON: '导出 JSON',
    exportCSV: '导出 CSV',
    
    timeSlots: {
      lateNight: '深夜',
      earlyMorning: '清晨',
      morning: '上午',
      noon: '午间',
      afternoon: '下午',
      evening: '晚间',
    },
    
    achievements: '成就',
    unlocked: '已解锁',
    locked: '未解锁',
    all: '全部',
    comingSoon: '即将解锁',
    unlockedAt: '解锁于',
    achievementProgress: '进度',

    achievementFilters: {
      all: '全部',
      unlocked: '已解锁',
      locked: '未解锁',
      allCategories: '全部分类',
    },

    achievementCategories: {
      focus: '专注',
      streak: '连续',
      time: '时长',
      task: '任务',
    },

    yourMilestones: '你的成就',
    upcomingAchievement: '即将解锁',
    unlockedOn: '解锁于',
    noAchievements: '没有符合条件的成就',

    achievementNames: {
      first_session: '初次绽放',
      growing_strong: '🌱 茁壮成长',
      blooming: '🌸 盛开',
      flourishing: '🌿 繁茂',
      century: '🌳 百年树木',
      full_bloom: '🌺 满园春色',
      ancient_tree: '🌲 古树参天',
      three_day_streak: '🔥 三日之火',
      seven_day_streak: '每周仪式',
      power_week: '⚡ 能量周',
      monthly_master: '💎 月度大师',
      dedication: '🌟 专注奉献',
      daily_goal_met: '目标达成',
      consistent: '🎯 持之以恒',
      perfect_week: '📅 完美一周',
      unstoppable: '💪 势不可挡',
      night_owl: '🦉 夜猫子',
      midnight_scholar: '🌙 午夜学者',
      early_bird: '🐦 早起鸟儿',
      dawn_warrior: '🌅 黎明战士',
      time_keeper: '⏰ 时间守护者',
      time_master: '🕐 时间大师',
      focused_mind: '🧠 专注之心',
      marathon: '🏃 马拉松',
      ultra_marathon: '⏳ 超级马拉松',
      task_starter: '📝 任务新手',
      task_master: '✅ 任务大师',
      task_champion: '🎯 任务冠军',
      task_legend: '🏆 任务传奇',
    },

    achievementDescriptions: {
      first_session: '完成第一次专注',
      growing_strong: '完成 10 次专注',
      blooming: '完成 25 次专注',
      flourishing: '完成 50 次专注',
      century: '完成 100 次专注',
      full_bloom: '完成 200 次专注',
      ancient_tree: '完成 500 次专注',
      three_day_streak: '连续 3 天专注',
      seven_day_streak: '连续 7 天专注',
      power_week: '连续 14 天专注',
      monthly_master: '连续 30 天专注',
      dedication: '连续 60 天专注',
      daily_goal_met: '首次达成每日目标',
      consistent: '连续 7 天达成每日目标',
      perfect_week: '一周内每天都达成目标',
      unstoppable: '连续 30 天达成每日目标',
      night_owl: '在 23:00-05:00 完成专注',
      midnight_scholar: '在深夜完成 10 次专注',
      early_bird: '在 05:00-07:00 完成专注',
      dawn_warrior: '在清晨完成 10 次专注',
      time_keeper: '累计专注 10 小时',
      time_master: '累计专注 50 小时',
      focused_mind: '累计专注 100 小时',
      marathon: '单次专注 2 小时以上',
      ultra_marathon: '单次专注 5 小时以上',
      task_starter: '完成 10 个任务',
      task_master: '完成 50 个任务',
      task_champion: '完成 100 个任务',
      task_legend: '完成 500 个任务',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ 雨夜森林',
      ocean_breeze: '🌊 海边微风',
      peaceful_stream: '🏞️ 溪边静谧',
      cozy_evening: '🔥 温馨夜晚',
      deep_ocean: '🐋 深海宁静',
      summer_night: '🌙 夏夜星空',
      mountain_camp: '⛺ 山间营地',
      urban_calm: '☕ 都市静谧',
    },

    soundscapeDescriptions: {
      rainy_forest: '雨声、雷声与森林的自然交响',
      ocean_breeze: '海浪、海鸥与轻柔的风声',
      peaceful_stream: '溪流、鸟鸣与森林的和谐',
      cozy_evening: '壁炉、虫鸣与夜晚的宁静',
      deep_ocean: '海洋的深邃与平静',
      summer_night: '虫鸣、夜晚与轻柔的风',
      mountain_camp: '篝火、溪流与夜晚的自然',
      urban_calm: '咖啡店的温馨氛围',
    },

    soundNames: {
      none: '无声',
      rain: '雨声',
      thunder: '雷声',
      ocean: '海洋',
      waves: '海浪',
      seagulls: '海鸥',
      stream: '溪流',
      forest: '森林',
      birds: '鸟鸣',
      crickets: '虫鸣',
      wind: '风声',
      fireplace: '壁炉',
      campfire: '篝火',
      night: '夜晚',
      cafe: '咖啡店',
      library: '图书馆',
      wind_chimes: '风铃',
      white_noise: '白噪音',
      singing_bowl: '颂钵',
      bamboo_chime: '竹风铃',
      music_box: '音乐盒',
      bell: '摇铃',
      piano: '钢琴',
    },

    soundCategoryNames: {
      water: '💧 水声',
      nature: '🌿 自然',
      fire: '🔥 火焰',
      urban: '🏙️ 城市',
      other: '🎵 其他',
    },

    aboutTitle: '关于 FlowMind',
    aboutDescription: 'FlowMind 是一个专注于提升专注力的番茄钟应用。',
    version: '版本',
    
    units: {
      times: '次',
      days: '天',
      weeks: '周',
      hours: '小时',
      minutes: '分钟',
      sessions: '次',
    },
    
    weekLabel: '第{week}周',

    tasks: {
      title: '今日任务',
      addTask: '添加任务',
      placeholder: '添加新任务...',
      completed: '已完成',
      totalPomodoros: '个番茄钟',
      emptyState: '还没有任务',
      emptyHint: '添加一个任务开始专注吧！',
      highPriority: '高优先级',
      mediumPriority: '中优先级',
      lowPriority: '低优先级',
      deleteConfirm: '删除任务',
      deleteMessage: '确定要删除这个任务吗？此操作无法撤销。',
      filterAll: '全部任务',
      filterActive: '未完成',
      filterCompleted: '已完成',
      sortByPriority: '按优先级',
      sortByCreated: '按创建时间',
      sortByStatus: '按完成状态',
    },

    intention: {
      title: '设定你的意图',
      subtitle: '在开始之前，想一想你想要完成什么',
      placeholder: '我想要...',
      skip: '跳过',
      start: '开始专注',
    },

    settings: {
      title: '设置',
      language: '语言',
      languageReloadHint: '切换语言后页面将自动刷新',
      timer: '计时器',
      focusDuration: '专注时长',
      breakDuration: '休息时长',
      longBreakDuration: '长休息时长',
      sessionsPerRound: '每轮专注次数',
      sessionsPerRoundHint: '长休息前的专注次数。设为 0 禁用长休息。',
      dailyGoal: '每日目标',
      soundscape: '白噪音混音器',
      completionSound: '完成提示音',
      reminderSound: '提醒音',
      breathingGuide: '呼吸引导',
      desktopNotifications: '桌面通知',
      theme: '主题颜色',
      focusBg: '专注背景',
      focusText: '专注文字',
      breakBg: '休息背景',
      breakText: '休息文字',
      longBreakBg: '长休息背景',
      longBreakText: '长休息文字',
      resetTheme: '重置主题',
      presets: '精选预设',
      currentMix: '当前混合',
      browseLibrary: '浏览音频库',
      hideLibrary: '收起音频库',
      categories: '分类',
    },

    toast: {
      taskAdded: '任务已添加',
      taskDeleted: '任务已删除',
      taskCompleted: '任务已完成',
      taskUncompleted: '任务已取消完成',
      settingsSaved: '设置已保存',
      themeReset: '主题已重置',
      achievementUnlocked: '成就已解锁',
    },

    confirm: '确认',

    aboutContent: {
      subtitle: '一个温柔的专注空间',
      description1: '这是一个为那些觉得传统番茄钟应用过于刺激的人设计的极简计时器。',
      description2: '柔和的色彩、轻柔的声音和简洁的界面，在你学习和工作时静静地支持你。',
      quickTips: '快捷提示',
      tip1: '播放 / 暂停',
      tip2: '跳过当前阶段',
    },

    csvHeaders: {
      metric: '指标',
      value: '数值',
      totalSessions: '总专注次数',
      totalMinutes: '总专注时长(分钟)',
      completedTasks: '完成任务数',
      streakDays: '连续专注天数',
      dailyGoal: '每日目标',
      todayCompleted: '今日完成',
      nightSessions: '深夜专注次数',
      morningSessions: '清晨专注次数',
      longestSession: '最长单次专注(分钟)',
      perfectWeeks: '完美周数',
      goalStreakDays: '目标连续天数',
    },

    mainUI: {
      focus: '专注',
      break: '休息',
      longBreak: '长休息',
      skipToBreak: '跳到休息',
      skipToFocus: '跳到专注',
      skipToLongBreak: '跳到长休息',
    },
  },

  'zh-TW': {
    close: '關閉',
    save: '儲存',
    cancel: '取消',
    delete: '刪除',
    edit: '編輯',
    add: '新增',

    progress: '進度',
    milestones: '成就',
    about: '關於',
    
    dayView: '日',
    weekView: '週',
    monthView: '月',
    
    today: '今天',
    previous: '上一個',
    next: '下一個',
    
    weekdays: {
      sun: '週日',
      mon: '週一',
      tue: '週二',
      wed: '週三',
      thu: '週四',
      fri: '週五',
      sat: '週六',
    },
    
    weekdaysShort: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六',
    },
    
    currentDayFocus: '當日專注',
    currentWeekFocus: '本週專注',
    currentMonthFocus: '本月專注',
    focusCount: '專注次數',
    totalFocusCount: '總專注次數',
    goalAchieved: '目標達成！',
    
    streakDays: '連續專注天數',
    totalSessions: '總專注次數',
    
    currentDayProgress: '當日進度',
    currentWeekProgress: '本週進度',
    currentMonthProgress: '本月進度',
    
    quickStats: '快速統計',
    totalTime: '總時長',
    totalFocus: '總專注',
    averagePerDay: '平均/天',
    streakCount: '連續天數',
    completedTasks: '完成任務',
    longestSession: '最長專注',
    perfectWeeks: '完美週數',
    
    monthlyStats: '月度統計',
    overview: '總覽',
    timeDistribution: '時段分佈',
    personalRecords: '個人記錄',
    dataExport: '資料匯出',
    exportJSON: '匯出 JSON',
    exportCSV: '匯出 CSV',
    
    timeSlots: {
      lateNight: '深夜',
      earlyMorning: '清晨',
      morning: '上午',
      noon: '午間',
      afternoon: '下午',
      evening: '晚間',
    },
    
    achievements: '成就',
    unlocked: '已解鎖',
    locked: '未解鎖',
    all: '全部',
    comingSoon: '即將解鎖',
    unlockedAt: '解鎖於',
    achievementProgress: '進度',

    achievementFilters: {
      all: '全部',
      unlocked: '已解鎖',
      locked: '未解鎖',
      allCategories: '全部分類',
    },

    achievementCategories: {
      focus: '專注',
      streak: '連續',
      time: '時長',
      task: '任務',
    },

    yourMilestones: '你的成就',
    upcomingAchievement: '即將解鎖',
    unlockedOn: '解鎖於',
    noAchievements: '沒有符合條件的成就',

    achievementNames: {
      first_session: '初次綻放',
      growing_strong: '🌱 茁壯成長',
      blooming: '🌸 盛開',
      flourishing: '🌿 繁茂',
      century: '🌳 百年樹木',
      full_bloom: '🌺 滿園春色',
      ancient_tree: '🌲 古樹參天',
      three_day_streak: '🔥 三日之火',
      seven_day_streak: '每週儀式',
      power_week: '⚡ 能量週',
      monthly_master: '💎 月度大師',
      dedication: '🌟 專注奉獻',
      daily_goal_met: '目標達成',
      consistent: '🎯 持之以恆',
      perfect_week: '📅 完美一週',
      unstoppable: '💪 勢不可擋',
      night_owl: '🦉 夜貓子',
      midnight_scholar: '🌙 午夜學者',
      early_bird: '🐦 早起鳥兒',
      dawn_warrior: '🌅 黎明戰士',
      time_keeper: '⏰ 時間守護者',
      time_master: '🕐 時間大師',
      focused_mind: '🧠 專注之心',
      marathon: '🏃 馬拉松',
      ultra_marathon: '⏳ 超級馬拉松',
      task_starter: '📝 任務新手',
      task_master: '✅ 任務大師',
      task_champion: '🎯 任務冠軍',
      task_legend: '🏆 任務傳奇',
    },

    achievementDescriptions: {
      first_session: '完成第一次專注',
      growing_strong: '完成 10 次專注',
      blooming: '完成 25 次專注',
      flourishing: '完成 50 次專注',
      century: '完成 100 次專注',
      full_bloom: '完成 200 次專注',
      ancient_tree: '完成 500 次專注',
      three_day_streak: '連續 3 天專注',
      seven_day_streak: '連續 7 天專注',
      power_week: '連續 14 天專注',
      monthly_master: '連續 30 天專注',
      dedication: '連續 60 天專注',
      daily_goal_met: '首次達成每日目標',
      consistent: '連續 7 天達成每日目標',
      perfect_week: '一週內每天都達成目標',
      unstoppable: '連續 30 天達成每日目標',
      night_owl: '在 23:00-05:00 完成專注',
      midnight_scholar: '在深夜完成 10 次專注',
      early_bird: '在 05:00-07:00 完成專注',
      dawn_warrior: '在清晨完成 10 次專注',
      time_keeper: '累計專注 10 小時',
      time_master: '累計專注 50 小時',
      focused_mind: '累計專注 100 小時',
      marathon: '單次專注 2 小時以上',
      ultra_marathon: '單次專注 5 小時以上',
      task_starter: '完成 10 個任務',
      task_master: '完成 50 個任務',
      task_champion: '完成 100 個任務',
      task_legend: '完成 500 個任務',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ 雨夜森林',
      ocean_breeze: '🌊 海邊微風',
      peaceful_stream: '🏞️ 溪邊靜謐',
      cozy_evening: '🔥 溫馨夜晚',
      deep_ocean: '🐋 深海寧靜',
      summer_night: '🌙 夏夜星空',
      mountain_camp: '⛺ 山間營地',
      urban_calm: '☕ 都市靜謐',
    },

    soundscapeDescriptions: {
      rainy_forest: '雨聲、雷聲與森林的自然交響',
      ocean_breeze: '海浪、海鷗與輕柔的風聲',
      peaceful_stream: '溪流、鳥鳴與森林的和諧',
      cozy_evening: '壁爐、蟲鳴與夜晚的寧靜',
      deep_ocean: '海洋的深邃與平靜',
      summer_night: '蟲鳴、夜晚與輕柔的風',
      mountain_camp: '篝火、溪流與夜晚的自然',
      urban_calm: '咖啡店的溫馨氛圍',
    },

    soundNames: {
      none: '無聲',
      rain: '雨聲',
      thunder: '雷聲',
      ocean: '海洋',
      waves: '海浪',
      seagulls: '海鷗',
      stream: '溪流',
      forest: '森林',
      birds: '鳥鳴',
      crickets: '蟲鳴',
      wind: '風聲',
      fireplace: '壁爐',
      campfire: '篝火',
      night: '夜晚',
      cafe: '咖啡店',
      library: '圖書館',
      wind_chimes: '風鈴',
      white_noise: '白噪音',
      singing_bowl: '頌缽',
      bamboo_chime: '竹風鈴',
      music_box: '音樂盒',
      bell: '搖鈴',
      piano: '鋼琴',
    },

    soundCategoryNames: {
      water: '💧 水聲',
      nature: '🌿 自然',
      fire: '🔥 火焰',
      urban: '🏙️ 城市',
      other: '🎵 其他',
    },

    aboutTitle: '關於 FlowMind',
    aboutDescription: 'FlowMind 是一個專注於提升專注力的番茄鐘應用。',
    version: '版本',
    
    units: {
      times: '次',
      days: '天',
      weeks: '週',
      hours: '小時',
      minutes: '分鐘',
      sessions: '次',
    },
    
    weekLabel: '第{week}週',

    tasks: {
      title: '今日任務',
      addTask: '新增任務',
      placeholder: '新增任務...',
      completed: '已完成',
      totalPomodoros: '個番茄鐘',
      emptyState: '還沒有任務',
      emptyHint: '新增一個任務開始專注吧！',
      highPriority: '高優先級',
      mediumPriority: '中優先級',
      lowPriority: '低優先級',
      deleteConfirm: '刪除任務',
      deleteMessage: '確定要刪除這個任務嗎？此操作無法撤銷。',
      filterAll: '全部任務',
      filterActive: '未完成',
      filterCompleted: '已完成',
      sortByPriority: '按優先級',
      sortByCreated: '按創建時間',
      sortByStatus: '按完成狀態',
    },

    intention: {
      title: '設定你的意圖',
      subtitle: '在開始之前，想一想你想要完成什麼',
      placeholder: '我想要...',
      skip: '跳過',
      start: '開始專注',
    },

    settings: {
      title: '設定',
      language: '語言',
      languageReloadHint: '切換語言後頁面將自動刷新',
      timer: '計時器',
      focusDuration: '專注時長',
      breakDuration: '休息時長',
      longBreakDuration: '長休息時長',
      sessionsPerRound: '每輪專注次數',
      sessionsPerRoundHint: '長休息前的專注次數。設為 0 禁用長休息。',
      dailyGoal: '每日目標',
      soundscape: '白噪音混音器',
      completionSound: '完成提示音',
      reminderSound: '提醒音',
      breathingGuide: '呼吸引導',
      desktopNotifications: '桌面通知',
      theme: '主題顏色',
      focusBg: '專注背景',
      focusText: '專注文字',
      breakBg: '休息背景',
      breakText: '休息文字',
      longBreakBg: '長休息背景',
      longBreakText: '長休息文字',
      resetTheme: '重置主題',
      presets: '精選預設',
      currentMix: '當前混合',
      browseLibrary: '瀏覽音訊庫',
      hideLibrary: '收起音訊庫',
      categories: '分類',
    },

    toast: {
      taskAdded: '任務已新增',
      taskDeleted: '任務已刪除',
      taskCompleted: '任務已完成',
      taskUncompleted: '任務已取消完成',
      settingsSaved: '設定已儲存',
      themeReset: '主題已重置',
      achievementUnlocked: '成就已解鎖',
    },

    confirm: '確認',

    aboutContent: {
      subtitle: '一個溫柔的專注空間',
      description1: '這是一個為那些覺得傳統番茄鐘應用過於刺激的人設計的極簡計時器。',
      description2: '柔和的色彩、輕柔的聲音和簡潔的介面，在你學習和工作時靜靜地支持你。',
      quickTips: '快捷提示',
      tip1: '播放 / 暫停',
      tip2: '跳過當前階段',
    },

    csvHeaders: {
      metric: '指標',
      value: '數值',
      totalSessions: '總專注次數',
      totalMinutes: '總專注時長(分鐘)',
      completedTasks: '完成任務數',
      streakDays: '連續專注天數',
      dailyGoal: '每日目標',
      todayCompleted: '今日完成',
      nightSessions: '深夜專注次數',
      morningSessions: '清晨專注次數',
      longestSession: '最長單次專注(分鐘)',
      perfectWeeks: '完美週數',
      goalStreakDays: '目標連續天數',
    },

    mainUI: {
      focus: '專注',
      break: '休息',
      longBreak: '長休息',
      skipToBreak: '跳到休息',
      skipToFocus: '跳到專注',
      skipToLongBreak: '跳到長休息',
    },
  },

  'en': {
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    
    progress: 'Progress',
    milestones: 'Milestones',
    about: 'About',
    
    dayView: 'Day',
    weekView: 'Week',
    monthView: 'Month',
    
    today: 'Today',
    previous: 'Previous',
    next: 'Next',
    
    weekdays: {
      sun: 'Sunday',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
    },
    
    weekdaysShort: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
    },
    
    currentDayFocus: 'Today\'s Focus',
    currentWeekFocus: 'This Week\'s Focus',
    currentMonthFocus: 'This Month\'s Focus',
    focusCount: 'Focus Count',
    totalFocusCount: 'Total Focus Count',
    goalAchieved: 'Goal Achieved!',
    
    streakDays: 'Streak Days',
    totalSessions: 'Total Sessions',
    
    currentDayProgress: 'Today\'s Progress',
    currentWeekProgress: 'This Week\'s Progress',
    currentMonthProgress: 'This Month\'s Progress',
    
    quickStats: 'Quick Stats',
    totalTime: 'Total Time',
    totalFocus: 'Total Focus',
    averagePerDay: 'Avg/Day',
    streakCount: 'Streak',
    completedTasks: 'Tasks Done',
    longestSession: 'Longest',
    perfectWeeks: 'Perfect Weeks',
    
    monthlyStats: 'Monthly Stats',
    overview: 'Overview',
    timeDistribution: 'Time Distribution',
    personalRecords: 'Personal Records',
    dataExport: 'Data Export',
    exportJSON: 'Export JSON',
    exportCSV: 'Export CSV',
    
    timeSlots: {
      lateNight: 'Late Night',
      earlyMorning: 'Early Morning',
      morning: 'Morning',
      noon: 'Noon',
      afternoon: 'Afternoon',
      evening: 'Evening',
    },
    
    achievements: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    all: 'All',
    comingSoon: 'Coming Soon',
    unlockedAt: 'Unlocked at',
    achievementProgress: 'Progress',

    achievementFilters: {
      all: 'All',
      unlocked: 'Unlocked',
      locked: 'Locked',
      allCategories: 'All Categories',
    },

    achievementCategories: {
      focus: 'Focus',
      streak: 'Streak',
      time: 'Time',
      task: 'Task',
    },

    yourMilestones: 'Your Milestones',
    upcomingAchievement: 'Coming Soon',
    unlockedOn: 'Unlocked on',
    noAchievements: 'No matching achievements',

    achievementNames: {
      first_session: 'First Bloom',
      growing_strong: '🌱 Growing Strong',
      blooming: '🌸 Blooming',
      flourishing: '🌿 Flourishing',
      century: '🌳 Century',
      full_bloom: '🌺 Full Bloom',
      ancient_tree: '🌲 Ancient Tree',
      three_day_streak: '🔥 Three Days',
      seven_day_streak: 'Weekly Ritual',
      power_week: '⚡ Power Week',
      monthly_master: '💎 Monthly Master',
      dedication: '🌟 Dedication',
      daily_goal_met: 'Goal Achieved',
      consistent: '🎯 Consistent',
      perfect_week: '📅 Perfect Week',
      unstoppable: '💪 Unstoppable',
      night_owl: '🦉 Night Owl',
      midnight_scholar: '🌙 Midnight Scholar',
      early_bird: '🐦 Early Bird',
      dawn_warrior: '🌅 Dawn Warrior',
      time_keeper: '⏰ Time Keeper',
      time_master: '🕐 Time Master',
      focused_mind: '🧠 Focused Mind',
      marathon: '🏃 Marathon',
      ultra_marathon: '⏳ Ultra Marathon',
      task_starter: '📝 Task Starter',
      task_master: '✅ Task Master',
      task_champion: '🎯 Task Champion',
      task_legend: '🏆 Task Legend',
    },

    achievementDescriptions: {
      first_session: 'Complete your first focus session',
      growing_strong: 'Complete 10 focus sessions',
      blooming: 'Complete 25 focus sessions',
      flourishing: 'Complete 50 focus sessions',
      century: 'Complete 100 focus sessions',
      full_bloom: 'Complete 200 focus sessions',
      ancient_tree: 'Complete 500 focus sessions',
      three_day_streak: 'Focus for 3 consecutive days',
      seven_day_streak: 'Focus for 7 consecutive days',
      power_week: 'Focus for 14 consecutive days',
      monthly_master: 'Focus for 30 consecutive days',
      dedication: 'Focus for 60 consecutive days',
      daily_goal_met: 'Achieve your daily goal for the first time',
      consistent: 'Achieve daily goal for 7 consecutive days',
      perfect_week: 'Achieve goal every day for a week',
      unstoppable: 'Achieve daily goal for 30 consecutive days',
      night_owl: 'Complete a focus session between 23:00-05:00',
      midnight_scholar: 'Complete 10 focus sessions at night',
      early_bird: 'Complete a focus session between 05:00-07:00',
      dawn_warrior: 'Complete 10 focus sessions in the morning',
      time_keeper: 'Accumulate 10 hours of focus time',
      time_master: 'Accumulate 50 hours of focus time',
      focused_mind: 'Accumulate 100 hours of focus time',
      marathon: 'Complete a single focus session over 2 hours',
      ultra_marathon: 'Complete a single focus session over 5 hours',
      task_starter: 'Complete 10 tasks',
      task_master: 'Complete 50 tasks',
      task_champion: 'Complete 100 tasks',
      task_legend: 'Complete 500 tasks',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ Rainy Forest',
      ocean_breeze: '🌊 Ocean Breeze',
      peaceful_stream: '🏞️ Peaceful Stream',
      cozy_evening: '🔥 Cozy Evening',
      deep_ocean: '🐋 Deep Ocean',
      summer_night: '🌙 Summer Night',
      mountain_camp: '⛺ Mountain Camp',
      urban_calm: '☕ Urban Calm',
    },

    soundscapeDescriptions: {
      rainy_forest: 'Rain, thunder and forest symphony',
      ocean_breeze: 'Waves, seagulls and gentle wind',
      peaceful_stream: 'Stream, birds and forest harmony',
      cozy_evening: 'Fireplace, crickets and night serenity',
      deep_ocean: 'Deep and peaceful ocean',
      summer_night: 'Crickets, night and gentle breeze',
      mountain_camp: 'Campfire, stream and nature at night',
      urban_calm: 'Cozy cafe atmosphere',
    },

    soundNames: {
      none: 'None',
      rain: 'Rain',
      thunder: 'Thunder',
      ocean: 'Ocean',
      waves: 'Waves',
      seagulls: 'Seagulls',
      stream: 'Stream',
      forest: 'Forest',
      birds: 'Birds',
      crickets: 'Crickets',
      wind: 'Wind',
      fireplace: 'Fireplace',
      campfire: 'Campfire',
      night: 'Night',
      cafe: 'Cafe',
      library: 'Library',
      wind_chimes: 'Wind Chimes',
      white_noise: 'White Noise',
      singing_bowl: 'Singing Bowl',
      bamboo_chime: 'Bamboo Chime',
      music_box: 'Music Box',
      bell: 'Bell',
      piano: 'Piano',
    },

    soundCategoryNames: {
      water: '💧 Water',
      nature: '🌿 Nature',
      fire: '🔥 Fire',
      urban: '🏙️ Urban',
      other: '🎵 Other',
    },

    aboutTitle: 'About FlowMind',
    aboutDescription: 'FlowMind is a Pomodoro timer app focused on improving focus.',
    version: 'Version',
    
    units: {
      times: '',
      days: 'd',
      weeks: 'w',
      hours: 'h',
      minutes: 'm',
      sessions: '',
    },
    
    weekLabel: 'Week {week}',

    tasks: {
      title: "Today's Tasks",
      addTask: 'Add Task',
      placeholder: 'Add a new task...',
      completed: 'Completed',
      totalPomodoros: 'pomodoros',
      emptyState: 'No tasks yet',
      emptyHint: 'Add a task to start focusing!',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      lowPriority: 'Low Priority',
      deleteConfirm: 'Delete Task',
      deleteMessage: 'Are you sure you want to delete this task? This action cannot be undone.',
      filterAll: 'All Tasks',
      filterActive: 'Active',
      filterCompleted: 'Completed',
      sortByPriority: 'By Priority',
      sortByCreated: 'By Created Time',
      sortByStatus: 'By Status',
    },

    intention: {
      title: 'Set Your Intention',
      subtitle: 'Before you begin, think about what you want to accomplish',
      placeholder: 'I want to...',
      skip: 'Skip',
      start: 'Start Focusing',
    },

    settings: {
      title: 'Settings',
      language: 'Language',
      languageReloadHint: 'Page will reload after changing language',
      timer: 'Timer',
      focusDuration: 'Focus Duration',
      breakDuration: 'Break Duration',
      longBreakDuration: 'Long Break Duration',
      sessionsPerRound: 'Sessions Per Round',
      sessionsPerRoundHint: 'Number of focus sessions before a long break. Set to 0 to disable long breaks.',
      dailyGoal: 'Daily Goal',
      soundscape: 'Soundscape Mixer',
      completionSound: 'Completion Sound',
      reminderSound: 'Reminder Sound',
      breathingGuide: 'Breathing Guide',
      desktopNotifications: 'Desktop Notifications',
      theme: 'Theme Colors',
      focusBg: 'Focus BG',
      focusText: 'Focus Text',
      breakBg: 'Break BG',
      breakText: 'Break Text',
      longBreakBg: 'Long Break BG',
      longBreakText: 'Long Break Text',
      resetTheme: 'Reset Theme',
      presets: 'Featured Presets',
      currentMix: 'Current Mix',
      browseLibrary: 'Browse Library',
      hideLibrary: 'Hide Library',
      categories: 'Categories',
    },

    toast: {
      taskAdded: 'Task added',
      taskDeleted: 'Task deleted',
      taskCompleted: 'Task completed',
      taskUncompleted: 'Task uncompleted',
      settingsSaved: 'Settings saved',
      themeReset: 'Theme reset',
      achievementUnlocked: 'Achievement unlocked',
    },

    confirm: 'Confirm',

    aboutContent: {
      subtitle: 'A Gentle Place to Focus',
      description1: 'This is a minimal timer designed for those who find traditional Pomodoro apps too stimulating.',
      description2: 'The soft colors, gentle sounds, and clean interface are here to quietly support you during your study and work time.',
      quickTips: 'Quick Tips',
      tip1: 'to Play / Pause',
      tip2: 'to Skip',
    },

    csvHeaders: {
      metric: 'Metric',
      value: 'Value',
      totalSessions: 'Total Sessions',
      totalMinutes: 'Total Minutes',
      completedTasks: 'Completed Tasks',
      streakDays: 'Streak Days',
      dailyGoal: 'Daily Goal',
      todayCompleted: 'Today Completed',
      nightSessions: 'Night Sessions',
      morningSessions: 'Morning Sessions',
      longestSession: 'Longest Session (min)',
      perfectWeeks: 'Perfect Weeks',
      goalStreakDays: 'Goal Streak Days',
    },

    mainUI: {
      focus: 'FOCUS',
      break: 'BREAK',
      longBreak: 'LONG BREAK',
      skipToBreak: 'Skip to Break',
      skipToFocus: 'Skip to Focus',
      skipToLongBreak: 'Skip to Long Break',
    },
  },

  'es': {
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar',

    progress: 'Progreso',
    milestones: 'Logros',
    about: 'Acerca de',

    dayView: 'Día',
    weekView: 'Semana',
    monthView: 'Mes',

    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente',

    weekdays: {
      sun: 'Domingo',
      mon: 'Lunes',
      tue: 'Martes',
      wed: 'Miércoles',
      thu: 'Jueves',
      fri: 'Viernes',
      sat: 'Sábado',
    },

    weekdaysShort: {
      sun: 'Dom',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb',
    },

    currentDayFocus: 'Enfoque del Día',
    currentWeekFocus: 'Enfoque de la Semana',
    currentMonthFocus: 'Enfoque del Mes',
    focusCount: 'Sesiones',
    totalFocusCount: 'Total de Sesiones',
    goalAchieved: '¡Meta Alcanzada!',

    streakDays: 'Días Consecutivos',
    totalSessions: 'Total de Sesiones',

    currentDayProgress: 'Progreso del Día',
    currentWeekProgress: 'Progreso de la Semana',
    currentMonthProgress: 'Progreso del Mes',

    quickStats: 'Estadísticas Rápidas',
    totalTime: 'Tiempo Total',
    totalFocus: 'Enfoque Total',
    averagePerDay: 'Promedio/Día',
    streakCount: 'Días Consecutivos',
    completedTasks: 'Tareas Completadas',
    longestSession: 'Sesión Más Larga',
    perfectWeeks: 'Semanas Perfectas',

    monthlyStats: 'Estadísticas Mensuales',
    overview: 'Resumen',
    timeDistribution: 'Distribución de Tiempo',
    personalRecords: 'Récords Personales',
    dataExport: 'Exportar Datos',
    exportJSON: 'Exportar JSON',
    exportCSV: 'Exportar CSV',

    timeSlots: {
      lateNight: 'Madrugada',
      earlyMorning: 'Temprano',
      morning: 'Mañana',
      noon: 'Mediodía',
      afternoon: 'Tarde',
      evening: 'Noche',
    },

    achievements: 'Logros',
    unlocked: 'Desbloqueados',
    locked: 'Bloqueados',
    all: 'Todos',
    comingSoon: 'Próximamente',
    unlockedAt: 'Desbloqueado el',
    achievementProgress: 'Progreso de Logros',

    achievementFilters: {
      all: 'Todos',
      unlocked: 'Desbloqueados',
      locked: 'Bloqueados',
      allCategories: 'Todas las Categorías',
    },

    achievementCategories: {
      focus: 'Enfoque',
      streak: 'Racha',
      time: 'Tiempo',
      task: 'Tareas',
    },

    yourMilestones: 'Tus Logros',
    upcomingAchievement: 'Próximamente',
    unlockedOn: 'Desbloqueado el',
    noAchievements: 'No hay logros que coincidan',

    achievementNames: {
      first_session: 'Primera Floración',
      growing_strong: '🌱 Creciendo Fuerte',
      blooming: '🌸 Floreciendo',
      flourishing: '🌿 Floreciente',
      century: '🌳 Centenario',
      full_bloom: '🌺 Plena Floración',
      ancient_tree: '🌲 Árbol Ancestral',
      three_day_streak: '🔥 Tres Días',
      seven_day_streak: 'Ritual Semanal',
      power_week: '⚡ Semana Poderosa',
      monthly_master: '💎 Maestro Mensual',
      dedication: '🌟 Dedicación',
      daily_goal_met: 'Meta Alcanzada',
      consistent: '🎯 Consistente',
      perfect_week: '📅 Semana Perfecta',
      unstoppable: '💪 Imparable',
      night_owl: '🦉 Búho Nocturno',
      midnight_scholar: '🌙 Erudito de Medianoche',
      early_bird: '🐦 Madrugador',
      dawn_warrior: '🌅 Guerrero del Amanecer',
      time_keeper: '⏰ Guardián del Tiempo',
      time_master: '🕐 Maestro del Tiempo',
      focused_mind: '🧠 Mente Enfocada',
      marathon: '🏃 Maratón',
      ultra_marathon: '⏳ Ultra Maratón',
      task_starter: '📝 Iniciador de Tareas',
      task_master: '✅ Maestro de Tareas',
      task_champion: '🎯 Campeón de Tareas',
      task_legend: '🏆 Leyenda de Tareas',
    },

    achievementDescriptions: {
      first_session: 'Completa tu primera sesión de enfoque',
      growing_strong: 'Completa 10 sesiones de enfoque',
      blooming: 'Completa 25 sesiones de enfoque',
      flourishing: 'Completa 50 sesiones de enfoque',
      century: 'Completa 100 sesiones de enfoque',
      full_bloom: 'Completa 200 sesiones de enfoque',
      ancient_tree: 'Completa 500 sesiones de enfoque',
      three_day_streak: 'Enfócate durante 3 días consecutivos',
      seven_day_streak: 'Enfócate durante 7 días consecutivos',
      power_week: 'Enfócate durante 14 días consecutivos',
      monthly_master: 'Enfócate durante 30 días consecutivos',
      dedication: 'Enfócate durante 60 días consecutivos',
      daily_goal_met: 'Alcanza tu meta diaria por primera vez',
      consistent: 'Alcanza la meta diaria durante 7 días consecutivos',
      perfect_week: 'Alcanza la meta todos los días durante una semana',
      unstoppable: 'Alcanza la meta diaria durante 30 días consecutivos',
      night_owl: 'Completa una sesión de enfoque entre 23:00-05:00',
      midnight_scholar: 'Completa 10 sesiones de enfoque por la noche',
      early_bird: 'Completa una sesión de enfoque entre 05:00-07:00',
      dawn_warrior: 'Completa 10 sesiones de enfoque por la mañana',
      time_keeper: 'Acumula 10 horas de tiempo de enfoque',
      time_master: 'Acumula 50 horas de tiempo de enfoque',
      focused_mind: 'Acumula 100 horas de tiempo de enfoque',
      marathon: 'Completa una sesión de enfoque de más de 2 horas',
      ultra_marathon: 'Completa una sesión de enfoque de más de 5 horas',
      task_starter: 'Completa 10 tareas',
      task_master: 'Completa 50 tareas',
      task_champion: 'Completa 100 tareas',
      task_legend: 'Completa 500 tareas',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ Bosque Lluvioso',
      ocean_breeze: '🌊 Brisa Marina',
      peaceful_stream: '🏞️ Arroyo Tranquilo',
      cozy_evening: '🔥 Noche Acogedora',
      deep_ocean: '🐋 Océano Profundo',
      summer_night: '🌙 Noche de Verano',
      mountain_camp: '⛺ Campamento de Montaña',
      urban_calm: '☕ Calma Urbana',
    },

    soundscapeDescriptions: {
      rainy_forest: 'Lluvia, truenos y sinfonía del bosque',
      ocean_breeze: 'Olas, gaviotas y viento suave',
      peaceful_stream: 'Arroyo, pájaros y armonía del bosque',
      cozy_evening: 'Chimenea, grillos y serenidad nocturna',
      deep_ocean: 'Océano profundo y tranquilo',
      summer_night: 'Grillos, noche y brisa suave',
      mountain_camp: 'Fogata, arroyo y naturaleza nocturna',
      urban_calm: 'Ambiente acogedor de cafetería',
    },

    soundNames: {
      none: 'Ninguno',
      rain: 'Lluvia',
      thunder: 'Trueno',
      ocean: 'Océano',
      waves: 'Olas',
      seagulls: 'Gaviotas',
      stream: 'Arroyo',
      forest: 'Bosque',
      birds: 'Pájaros',
      crickets: 'Grillos',
      wind: 'Viento',
      fireplace: 'Chimenea',
      campfire: 'Fogata',
      night: 'Noche',
      cafe: 'Cafetería',
      library: 'Biblioteca',
      wind_chimes: 'Campanillas de Viento',
      white_noise: 'Ruido Blanco',
      singing_bowl: 'Cuenco Tibetano',
      bamboo_chime: 'Campanilla de Bambú',
      music_box: 'Caja de Música',
      bell: 'Campana',
      piano: 'Piano',
    },

    soundCategoryNames: {
      water: '💧 Agua',
      nature: '🌿 Naturaleza',
      fire: '🔥 Fuego',
      urban: '🏙️ Urbano',
      other: '🎵 Otro',
    },

    aboutTitle: 'Acerca de',
    aboutDescription: 'Un temporizador minimalista para enfoque profundo',
    version: 'Versión',

    units: {
      times: 'veces',
      days: 'días',
      weeks: 'semanas',
      hours: 'horas',
      minutes: 'minutos',
      sessions: 'sesiones',
    },

    weekLabel: 'Semana',

    tasks: {
      title: 'Tareas de Hoy',
      addTask: 'Agregar Tarea',
      placeholder: 'Agregar nueva tarea...',
      completed: 'Completadas',
      totalPomodoros: 'pomodoros',
      emptyState: 'No hay tareas. ¡Agrega una para comenzar!',
      emptyHint: 'Haz clic en el botón + para agregar tu primera tarea',
      highPriority: 'Alta Prioridad',
      mediumPriority: 'Prioridad Media',
      lowPriority: 'Baja Prioridad',
      deleteConfirm: 'Eliminar Tarea',
      deleteMessage: '¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.',
      filterAll: 'Todas las Tareas',
      filterActive: 'Activas',
      filterCompleted: 'Completadas',
      sortByPriority: 'Por Prioridad',
      sortByCreated: 'Por Fecha de Creación',
      sortByStatus: 'Por Estado',
    },

    intention: {
      title: 'Establece tu Intención',
      subtitle: 'Antes de comenzar, piensa en lo que quieres lograr',
      placeholder: 'Quiero...',
      skip: 'Omitir',
      start: 'Comenzar a Enfocar',
    },

    settings: {
      title: 'Configuración',
      language: 'Idioma',
      languageReloadHint: 'La página se recargará después de cambiar el idioma',
      timer: 'Temporizador',
      focusDuration: 'Duración de Enfoque',
      breakDuration: 'Duración de Descanso',
      longBreakDuration: 'Duración de Descanso Largo',
      sessionsPerRound: 'Sesiones por Ronda',
      sessionsPerRoundHint: 'Número de sesiones de enfoque antes de un descanso largo. Establece en 0 para deshabilitar descansos largos.',
      dailyGoal: 'Meta Diaria',
      soundscape: 'Mezclador de Sonidos',
      completionSound: 'Sonido de Finalización',
      reminderSound: 'Sonido de Recordatorio',
      breathingGuide: 'Guía de Respiración',
      desktopNotifications: 'Notificaciones de Escritorio',
      theme: 'Colores del Tema',
      focusBg: 'Fondo de Enfoque',
      focusText: 'Texto de Enfoque',
      breakBg: 'Fondo de Descanso',
      breakText: 'Texto de Descanso',
      longBreakBg: 'Fondo de Descanso Largo',
      longBreakText: 'Texto de Descanso Largo',
      resetTheme: 'Restablecer Tema',
      presets: 'Preajustes Destacados',
      currentMix: 'Mezcla Actual',
      browseLibrary: 'Explorar Biblioteca',
      hideLibrary: 'Ocultar Biblioteca',
      categories: 'Categorías',
    },

    toast: {
      taskAdded: 'Tarea agregada',
      taskDeleted: 'Tarea eliminada',
      taskCompleted: 'Tarea completada',
      taskUncompleted: 'Tarea marcada como incompleta',
      settingsSaved: 'Configuración guardada',
      themeReset: 'Tema restablecido',
      achievementUnlocked: 'Logro desbloqueado',
    },

    confirm: 'Confirmar',

    aboutContent: {
      subtitle: 'Un Lugar Tranquilo para Enfocarse',
      description1: 'Este es un temporizador minimalista diseñado para aquellos que encuentran las aplicaciones Pomodoro tradicionales demasiado estimulantes.',
      description2: 'Los colores suaves, sonidos gentiles e interfaz limpia están aquí para apoyarte silenciosamente durante tu tiempo de estudio y trabajo.',
      quickTips: 'Consejos Rápidos',
      tip1: 'para Reproducir / Pausar',
      tip2: 'para Saltar',
    },

    csvHeaders: {
      metric: 'Métrica',
      value: 'Valor',
      totalSessions: 'Total de Sesiones',
      totalMinutes: 'Total de Minutos',
      completedTasks: 'Tareas Completadas',
      streakDays: 'Días Consecutivos',
      dailyGoal: 'Meta Diaria',
      todayCompleted: 'Completadas Hoy',
      nightSessions: 'Sesiones Nocturnas',
      morningSessions: 'Sesiones Matutinas',
      longestSession: 'Sesión Más Larga (min)',
      perfectWeeks: 'Semanas Perfectas',
      goalStreakDays: 'Días Consecutivos de Meta',
    },

    mainUI: {
      focus: 'ENFOQUE',
      break: 'DESCANSO',
      longBreak: 'DESCANSO LARGO',
      skipToBreak: 'Saltar a Descanso',
      skipToFocus: 'Saltar a Enfoque',
      skipToLongBreak: 'Saltar a Descanso Largo',
    },
  },

  'ja': {
    close: '閉じる',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    add: '追加',

    progress: '進捗',
    milestones: '実績',
    about: '情報',
    
    dayView: '日',
    weekView: '週',
    monthView: '月',
    
    today: '今日',
    previous: '前へ',
    next: '次へ',
    
    weekdays: {
      sun: '日曜日',
      mon: '月曜日',
      tue: '火曜日',
      wed: '水曜日',
      thu: '木曜日',
      fri: '金曜日',
      sat: '土曜日',
    },
    
    weekdaysShort: {
      sun: '日',
      mon: '月',
      tue: '火',
      wed: '水',
      thu: '木',
      fri: '金',
      sat: '土',
    },
    
    currentDayFocus: '本日の集中',
    currentWeekFocus: '今週の集中',
    currentMonthFocus: '今月の集中',
    focusCount: '集中回数',
    totalFocusCount: '総集中回数',
    goalAchieved: '目標達成！',
    
    streakDays: '連続日数',
    totalSessions: '総セッション数',
    
    currentDayProgress: '本日の進捗',
    currentWeekProgress: '今週の進捗',
    currentMonthProgress: '今月の進捗',
    
    quickStats: 'クイック統計',
    totalTime: '合計時間',
    totalFocus: '総集中',
    averagePerDay: '平均/日',
    streakCount: '連続日数',
    completedTasks: '完了タスク',
    longestSession: '最長セッション',
    perfectWeeks: '完璧な週',
    
    monthlyStats: '月次統計',
    overview: '概要',
    timeDistribution: '時間帯分布',
    personalRecords: '個人記録',
    dataExport: 'データエクスポート',
    exportJSON: 'JSON出力',
    exportCSV: 'CSV出力',
    
    timeSlots: {
      lateNight: '深夜',
      earlyMorning: '早朝',
      morning: '午前',
      noon: '正午',
      afternoon: '午後',
      evening: '夕方',
    },
    
    achievements: '実績',
    unlocked: 'アンロック済み',
    locked: 'ロック中',
    all: 'すべて',
    comingSoon: 'もうすぐ',
    unlockedAt: 'アンロック日時',
    achievementProgress: '進捗',

    achievementFilters: {
      all: 'すべて',
      unlocked: 'アンロック済み',
      locked: 'ロック中',
      allCategories: 'すべてのカテゴリ',
    },

    achievementCategories: {
      focus: '集中',
      streak: '連続',
      time: '時間',
      task: 'タスク',
    },

    yourMilestones: 'あなたの実績',
    upcomingAchievement: 'まもなく',
    unlockedOn: 'アンロック日',
    noAchievements: '一致する実績がありません',

    achievementNames: {
      first_session: '初めての開花',
      growing_strong: '🌱 力強く成長',
      blooming: '🌸 開花',
      flourishing: '🌿 繁栄',
      century: '🌳 百年の木',
      full_bloom: '🌺 満開',
      ancient_tree: '🌲 古木',
      three_day_streak: '🔥 3日間',
      seven_day_streak: '週間の儀式',
      power_week: '⚡ パワーウィーク',
      monthly_master: '💎 月間マスター',
      dedication: '🌟 献身',
      daily_goal_met: '目標達成',
      consistent: '🎯 一貫性',
      perfect_week: '📅 完璧な週',
      unstoppable: '💪 止められない',
      night_owl: '🦉 夜更かし',
      midnight_scholar: '🌙 真夜中の学者',
      early_bird: '🐦 早起き',
      dawn_warrior: '🌅 夜明けの戦士',
      time_keeper: '⏰ タイムキーパー',
      time_master: '🕐 タイムマスター',
      focused_mind: '🧠 集中した心',
      marathon: '🏃 マラソン',
      ultra_marathon: '⏳ ウルトラマラソン',
      task_starter: '📝 タスクスターター',
      task_master: '✅ タスクマスター',
      task_champion: '🎯 タスクチャンピオン',
      task_legend: '🏆 タスクレジェンド',
    },

    achievementDescriptions: {
      first_session: '最初の集中セッションを完了',
      growing_strong: '10回の集中セッションを完了',
      blooming: '25回の集中セッションを完了',
      flourishing: '50回の集中セッションを完了',
      century: '100回の集中セッションを完了',
      full_bloom: '200回の集中セッションを完了',
      ancient_tree: '500回の集中セッションを完了',
      three_day_streak: '3日連続で集中',
      seven_day_streak: '7日連続で集中',
      power_week: '14日連続で集中',
      monthly_master: '30日連続で集中',
      dedication: '60日連続で集中',
      daily_goal_met: '初めて毎日の目標を達成',
      consistent: '7日連続で毎日の目標を達成',
      perfect_week: '1週間毎日目標を達成',
      unstoppable: '30日連続で毎日の目標を達成',
      night_owl: '23:00-05:00に集中セッションを完了',
      midnight_scholar: '夜間に10回の集中セッションを完了',
      early_bird: '05:00-07:00に集中セッションを完了',
      dawn_warrior: '朝に10回の集中セッションを完了',
      time_keeper: '10時間の集中時間を蓄積',
      time_master: '50時間の集中時間を蓄積',
      focused_mind: '100時間の集中時間を蓄積',
      marathon: '2時間以上の単一集中セッションを完了',
      ultra_marathon: '5時間以上の単一集中セッションを完了',
      task_starter: '10個のタスクを完了',
      task_master: '50個のタスクを完了',
      task_champion: '100個のタスクを完了',
      task_legend: '500個のタスクを完了',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ 雨の森',
      ocean_breeze: '🌊 海風',
      peaceful_stream: '🏞️ 静かな小川',
      cozy_evening: '🔥 心地よい夜',
      deep_ocean: '🐋 深海の静けさ',
      summer_night: '🌙 夏の夜',
      mountain_camp: '⛺ 山のキャンプ',
      urban_calm: '☕ 都会の静けさ',
    },

    soundscapeDescriptions: {
      rainy_forest: '雨、雷、森のシンフォニー',
      ocean_breeze: '波、カモメ、優しい風',
      peaceful_stream: '小川、鳥、森のハーモニー',
      cozy_evening: '暖炉、コオロギ、夜の静けさ',
      deep_ocean: '深く穏やかな海',
      summer_night: 'コオロギ、夜、優しいそよ風',
      mountain_camp: '焚き火、小川、夜の自然',
      urban_calm: '居心地の良いカフェの雰囲気',
    },

    soundNames: {
      none: 'なし',
      rain: '雨',
      thunder: '雷',
      ocean: '海',
      waves: '波',
      seagulls: 'カモメ',
      stream: '小川',
      forest: '森',
      birds: '鳥',
      crickets: 'コオロギ',
      wind: '風',
      fireplace: '暖炉',
      campfire: '焚き火',
      night: '夜',
      cafe: 'カフェ',
      library: '図書館',
      wind_chimes: '風鈴',
      white_noise: 'ホワイトノイズ',
      singing_bowl: 'シンギングボウル',
      bamboo_chime: '竹風鈴',
      music_box: 'オルゴール',
      bell: 'ベル',
      piano: 'ピアノ',
    },

    soundCategoryNames: {
      water: '💧 水',
      nature: '🌿 自然',
      fire: '🔥 火',
      urban: '🏙️ 都市',
      other: '🎵 その他',
    },

    aboutTitle: 'FlowMindについて',
    aboutDescription: 'FlowMindは集中力向上に特化したポモドーロタイマーアプリです。',
    version: 'バージョン',
    
    units: {
      times: '回',
      days: '日',
      weeks: '週',
      hours: '時間',
      minutes: '分',
      sessions: '回',
    },
    
    weekLabel: '第{week}週',

    tasks: {
      title: '今日のタスク',
      addTask: 'タスクを追加',
      placeholder: '新しいタスクを追加...',
      completed: '完了',
      totalPomodoros: 'ポモドーロ',
      emptyState: 'タスクがありません',
      emptyHint: 'タスクを追加して集中を始めましょう！',
      highPriority: '高優先度',
      mediumPriority: '中優先度',
      lowPriority: '低優先度',
      deleteConfirm: 'タスクを削除',
      deleteMessage: 'このタスクを削除してもよろしいですか？この操作は元に戻せません。',
      filterAll: 'すべてのタスク',
      filterActive: '未完了',
      filterCompleted: '完了済み',
      sortByPriority: '優先度順',
      sortByCreated: '作成日順',
      sortByStatus: 'ステータス順',
    },

    intention: {
      title: '意図を設定',
      subtitle: '始める前に、何を達成したいか考えてみましょう',
      placeholder: '私は...',
      skip: 'スキップ',
      start: '集中を開始',
    },

    settings: {
      title: '設定',
      language: '言語',
      languageReloadHint: '言語を変更するとページが再読み込みされます',
      timer: 'タイマー',
      focusDuration: '集中時間',
      breakDuration: '休憩時間',
      longBreakDuration: '長い休憩時間',
      sessionsPerRound: 'ラウンドごとのセッション数',
      sessionsPerRoundHint: '長い休憩前の集中セッション数。0に設定すると長い休憩を無効にします。',
      dailyGoal: '1日の目標',
      soundscape: 'サウンドスケープミキサー',
      completionSound: '完了音',
      reminderSound: 'リマインダー音',
      breathingGuide: '呼吸ガイド',
      desktopNotifications: 'デスクトップ通知',
      theme: 'テーマカラー',
      focusBg: '集中背景',
      focusText: '集中テキスト',
      breakBg: '休憩背景',
      breakText: '休憩テキスト',
      longBreakBg: '長い休憩背景',
      longBreakText: '長い休憩テキスト',
      resetTheme: 'テーマをリセット',
      presets: 'おすすめプリセット',
      currentMix: '現在のミックス',
      browseLibrary: 'ライブラリを閲覧',
      hideLibrary: 'ライブラリを閉じる',
      categories: 'カテゴリ',
    },

    toast: {
      taskAdded: 'タスクを追加しました',
      taskDeleted: 'タスクを削除しました',
      taskCompleted: 'タスクを完了しました',
      taskUncompleted: 'タスクの完了を取り消しました',
      settingsSaved: '設定を保存しました',
      themeReset: 'テーマをリセットしました',
      achievementUnlocked: '実績をアンロックしました',
    },

    confirm: '確認',

    aboutContent: {
      subtitle: '優しい集中空間',
      description1: '従来のポモドーロアプリが刺激的すぎると感じる方のために設計されたミニマルなタイマーです。',
      description2: '柔らかい色、優しい音、シンプルなインターフェースが、学習や仕事の時間を静かにサポートします。',
      quickTips: 'クイックヒント',
      tip1: '再生 / 一時停止',
      tip2: 'スキップ',
    },

    csvHeaders: {
      metric: '指標',
      value: '値',
      totalSessions: '総セッション数',
      totalMinutes: '総時間(分)',
      completedTasks: '完了タスク数',
      streakDays: '連続日数',
      dailyGoal: '1日の目標',
      todayCompleted: '今日の完了',
      nightSessions: '深夜セッション数',
      morningSessions: '早朝セッション数',
      longestSession: '最長セッション(分)',
      perfectWeeks: '完璧な週',
      goalStreakDays: '目標連続日数',
    },

    mainUI: {
      focus: '集中',
      break: '休憩',
      longBreak: '長い休憩',
      skipToBreak: '休憩へスキップ',
      skipToFocus: '集中へスキップ',
      skipToLongBreak: '長い休憩へスキップ',
    },
  },

  'ko': {
    close: '닫기',
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    edit: '편집',
    add: '추가',

    progress: '진행',
    milestones: '업적',
    about: '정보',
    
    dayView: '일',
    weekView: '주',
    monthView: '월',
    
    today: '오늘',
    previous: '이전',
    next: '다음',
    
    weekdays: {
      sun: '일요일',
      mon: '월요일',
      tue: '화요일',
      wed: '수요일',
      thu: '목요일',
      fri: '금요일',
      sat: '토요일',
    },
    
    weekdaysShort: {
      sun: '일',
      mon: '월',
      tue: '화',
      wed: '수',
      thu: '목',
      fri: '금',
      sat: '토',
    },
    
    currentDayFocus: '오늘의 집중',
    currentWeekFocus: '이번 주 집중',
    currentMonthFocus: '이번 달 집중',
    focusCount: '집중 횟수',
    totalFocusCount: '총 집중 횟수',
    goalAchieved: '목표 달성!',
    
    streakDays: '연속 일수',
    totalSessions: '총 세션 수',
    
    currentDayProgress: '오늘의 진행',
    currentWeekProgress: '이번 주 진행',
    currentMonthProgress: '이번 달 진행',
    
    quickStats: '빠른 통계',
    totalTime: '총 시간',
    totalFocus: '총 집중',
    averagePerDay: '평균/일',
    streakCount: '연속 일수',
    completedTasks: '완료된 작업',
    longestSession: '최장 세션',
    perfectWeeks: '완벽한 주',
    
    monthlyStats: '월간 통계',
    overview: '개요',
    timeDistribution: '시간대 분포',
    personalRecords: '개인 기록',
    dataExport: '데이터 내보내기',
    exportJSON: 'JSON 내보내기',
    exportCSV: 'CSV 내보내기',
    
    timeSlots: {
      lateNight: '심야',
      earlyMorning: '이른 아침',
      morning: '오전',
      noon: '정오',
      afternoon: '오후',
      evening: '저녁',
    },
    
    achievements: '업적',
    unlocked: '잠금 해제됨',
    locked: '잠김',
    all: '전체',
    comingSoon: '곧 출시',
    unlockedAt: '잠금 해제 시간',
    achievementProgress: '진행',

    achievementFilters: {
      all: '전체',
      unlocked: '잠금 해제됨',
      locked: '잠김',
      allCategories: '모든 카테고리',
    },

    achievementCategories: {
      focus: '집중',
      streak: '연속',
      time: '시간',
      task: '작업',
    },

    yourMilestones: '당신의 업적',
    upcomingAchievement: '곧 출시',
    unlockedOn: '잠금 해제일',
    noAchievements: '일치하는 업적이 없습니다',

    achievementNames: {
      first_session: '첫 개화',
      growing_strong: '🌱 강하게 성장',
      blooming: '🌸 개화',
      flourishing: '🌿 번영',
      century: '🌳 백년목',
      full_bloom: '🌺 만개',
      ancient_tree: '🌲 고목',
      three_day_streak: '🔥 3일',
      seven_day_streak: '주간 의식',
      power_week: '⚡ 파워 위크',
      monthly_master: '💎 월간 마스터',
      dedication: '🌟 헌신',
      daily_goal_met: '목표 달성',
      consistent: '🎯 일관성',
      perfect_week: '📅 완벽한 주',
      unstoppable: '💪 멈출 수 없는',
      night_owl: '🦉 올빼미',
      midnight_scholar: '🌙 자정의 학자',
      early_bird: '🐦 일찍 일어나는 새',
      dawn_warrior: '🌅 새벽의 전사',
      time_keeper: '⏰ 시간 지킴이',
      time_master: '🕐 시간 마스터',
      focused_mind: '🧠 집중된 마음',
      marathon: '🏃 마라톤',
      ultra_marathon: '⏳ 울트라 마라톤',
      task_starter: '📝 작업 시작자',
      task_master: '✅ 작업 마스터',
      task_champion: '🎯 작업 챔피언',
      task_legend: '🏆 작업 전설',
    },

    achievementDescriptions: {
      first_session: '첫 집중 세션 완료',
      growing_strong: '10회 집중 세션 완료',
      blooming: '25회 집중 세션 완료',
      flourishing: '50회 집중 세션 완료',
      century: '100회 집중 세션 완료',
      full_bloom: '200회 집중 세션 완료',
      ancient_tree: '500회 집중 세션 완료',
      three_day_streak: '3일 연속 집중',
      seven_day_streak: '7일 연속 집중',
      power_week: '14일 연속 집중',
      monthly_master: '30일 연속 집중',
      dedication: '60일 연속 집중',
      daily_goal_met: '처음으로 일일 목표 달성',
      consistent: '7일 연속 일일 목표 달성',
      perfect_week: '일주일 동안 매일 목표 달성',
      unstoppable: '30일 연속 일일 목표 달성',
      night_owl: '23:00-05:00 사이에 집중 세션 완료',
      midnight_scholar: '밤에 10회 집중 세션 완료',
      early_bird: '05:00-07:00 사이에 집중 세션 완료',
      dawn_warrior: '아침에 10회 집중 세션 완료',
      time_keeper: '10시간의 집중 시간 누적',
      time_master: '50시간의 집중 시간 누적',
      focused_mind: '100시간의 집중 시간 누적',
      marathon: '2시간 이상의 단일 집중 세션 완료',
      ultra_marathon: '5시간 이상의 단일 집중 세션 완료',
      task_starter: '10개 작업 완료',
      task_master: '50개 작업 완료',
      task_champion: '100개 작업 완료',
      task_legend: '500개 작업 완료',
    },

    soundscapeNames: {
      rainy_forest: '🌧️ 비 오는 숲',
      ocean_breeze: '🌊 바다 바람',
      peaceful_stream: '🏞️ 평화로운 시냇물',
      cozy_evening: '🔥 아늑한 저녁',
      deep_ocean: '🐋 깊은 바다',
      summer_night: '🌙 여름밤',
      mountain_camp: '⛺ 산속 캠프',
      urban_calm: '☕ 도시의 고요함',
    },

    soundscapeDescriptions: {
      rainy_forest: '비, 천둥, 숲의 교향곡',
      ocean_breeze: '파도, 갈매기, 부드러운 바람',
      peaceful_stream: '시냇물, 새, 숲의 조화',
      cozy_evening: '벽난로, 귀뚜라미, 밤의 고요함',
      deep_ocean: '깊고 평화로운 바다',
      summer_night: '귀뚜라미, 밤, 부드러운 산들바람',
      mountain_camp: '모닥불, 시냇물, 밤의 자연',
      urban_calm: '아늑한 카페 분위기',
    },

    soundNames: {
      none: '없음',
      rain: '비',
      thunder: '천둥',
      ocean: '바다',
      waves: '파도',
      seagulls: '갈매기',
      stream: '시냇물',
      forest: '숲',
      birds: '새',
      crickets: '귀뚜라미',
      wind: '바람',
      fireplace: '벽난로',
      campfire: '모닥불',
      night: '밤',
      cafe: '카페',
      library: '도서관',
      wind_chimes: '풍경',
      white_noise: '백색 소음',
      singing_bowl: '싱잉볼',
      bamboo_chime: '대나무 풍경',
      music_box: '오르골',
      bell: '종',
      piano: '피아노',
    },

    soundCategoryNames: {
      water: '💧 물',
      nature: '🌿 자연',
      fire: '🔥 불',
      urban: '🏙️ 도시',
      other: '🎵 기타',
    },

    aboutTitle: 'FlowMind 정보',
    aboutDescription: 'FlowMind는 집중력 향상에 초점을 맞춘 포모도로 타이머 앱입니다.',
    version: '버전',
    
    units: {
      times: '회',
      days: '일',
      weeks: '주',
      hours: '시간',
      minutes: '분',
      sessions: '회',
    },
    
    weekLabel: '{week}주차',

    tasks: {
      title: '오늘의 작업',
      addTask: '작업 추가',
      placeholder: '새 작업 추가...',
      completed: '완료됨',
      totalPomodoros: '개 포모도로',
      emptyState: '작업이 없습니다',
      emptyHint: '작업을 추가하여 집중을 시작하세요!',
      highPriority: '높은 우선순위',
      mediumPriority: '중간 우선순위',
      lowPriority: '낮은 우선순위',
      deleteConfirm: '작업 삭제',
      deleteMessage: '이 작업을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
      filterAll: '모든 작업',
      filterActive: '진행 중',
      filterCompleted: '완료됨',
      sortByPriority: '우선순위별',
      sortByCreated: '생성일별',
      sortByStatus: '상태별',
    },

    intention: {
      title: '의도 설정',
      subtitle: '시작하기 전에 무엇을 달성하고 싶은지 생각해보세요',
      placeholder: '나는...',
      skip: '건너뛰기',
      start: '집중 시작',
    },

    settings: {
      title: '설정',
      language: '언어',
      languageReloadHint: '언어를 변경하면 페이지가 다시 로드됩니다',
      timer: '타이머',
      focusDuration: '집중 시간',
      breakDuration: '휴식 시간',
      longBreakDuration: '긴 휴식 시간',
      sessionsPerRound: '라운드당 세션 수',
      sessionsPerRoundHint: '긴 휴식 전 집중 세션 수. 0으로 설정하면 긴 휴식이 비활성화됩니다.',
      dailyGoal: '일일 목표',
      soundscape: '사운드스케이프 믹서',
      completionSound: '완료 사운드',
      reminderSound: '알림 사운드',
      breathingGuide: '호흡 가이드',
      desktopNotifications: '데스크톱 알림',
      theme: '테마 색상',
      focusBg: '집중 배경',
      focusText: '집중 텍스트',
      breakBg: '휴식 배경',
      breakText: '휴식 텍스트',
      longBreakBg: '긴 휴식 배경',
      longBreakText: '긴 휴식 텍스트',
      resetTheme: '테마 재설정',
      presets: '추천 프리셋',
      currentMix: '현재 믹스',
      browseLibrary: '라이브러리 탐색',
      hideLibrary: '라이브러리 숨기기',
      categories: '카테고리',
    },

    toast: {
      taskAdded: '작업이 추가되었습니다',
      taskDeleted: '작업이 삭제되었습니다',
      taskCompleted: '작업이 완료되었습니다',
      taskUncompleted: '작업 완료가 취소되었습니다',
      settingsSaved: '설정이 저장되었습니다',
      themeReset: '테마가 재설정되었습니다',
      achievementUnlocked: '업적이 잠금 해제되었습니다',
    },

    confirm: '확인',

    aboutContent: {
      subtitle: '부드러운 집중 공간',
      description1: '전통적인 포모도로 앱이 너무 자극적이라고 느끼는 사람들을 위해 설계된 미니멀 타이머입니다.',
      description2: '부드러운 색상, 은은한 소리, 깔끔한 인터페이스가 학습과 작업 시간을 조용히 지원합니다.',
      quickTips: '빠른 팁',
      tip1: '재생 / 일시정지',
      tip2: '건너뛰기',
    },

    csvHeaders: {
      metric: '지표',
      value: '값',
      totalSessions: '총 세션 수',
      totalMinutes: '총 시간(분)',
      completedTasks: '완료된 작업',
      streakDays: '연속 일수',
      dailyGoal: '일일 목표',
      todayCompleted: '오늘 완료',
      nightSessions: '야간 세션 수',
      morningSessions: '아침 세션 수',
      longestSession: '최장 세션(분)',
      perfectWeeks: '완벽한 주',
      goalStreakDays: '목표 연속 일수',
    },

    mainUI: {
      focus: '집중',
      break: '휴식',
      longBreak: '긴 휴식',
      skipToBreak: '휴식으로 건너뛰기',
      skipToFocus: '집중으로 건너뛰기',
      skipToLongBreak: '긴 휴식으로 건너뛰기',
    },
  },
};

// 获取系统语言
export function getSystemLanguage(): Language {
  const browserLang = navigator.language || (navigator as any).userLanguage;

  if (browserLang.startsWith('zh')) {
    // 区分简体和繁体
    if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
      return 'zh-TW';
    }
    return 'zh-CN';
  } else if (browserLang.startsWith('es')) {
    return 'es';
  } else if (browserLang.startsWith('ja')) {
    return 'ja';
  } else if (browserLang.startsWith('ko')) {
    return 'ko';
  }

  return 'en';
}

// 获取当前语言
export function getCurrentLanguage(): Language {
  const saved = localStorage.getItem('language') as Language;
  return saved || getSystemLanguage();
}

// 设置语言
export function setLanguage(lang: Language) {
  localStorage.setItem('language', lang);
}

// 获取翻译
export function getTranslations(lang?: Language): Translations {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang];
}

// 获取周几名称
export function getWeekdayName(dayIndex: number, short: boolean = false, lang?: Language): string {
  const t = getTranslations(lang);
  const weekdayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
  const key = weekdayKeys[dayIndex];
  return short ? t.weekdaysShort[key] : t.weekdays[key];
}

