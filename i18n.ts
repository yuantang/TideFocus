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
  account: string;
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
    selectTask: string;
    orDivider: string;
    inputLabel: string;
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
    version: string;
    versionNumber: string;
    features: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    feature5: string;
    contact: string;
    email: string;
    quickTips: string;
    tip1: string;
    tip2: string;
    madeWith: string;
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

  // 账号管理
  accountTab: {
    // 未登录状态
    cloudSync: string;
    loginToSync: string;
    login: string;
    register: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
    minPasswordLength: string;
    forgotPassword: string;
    backToLogin: string;
    loginButton: string;
    registerButton: string;
    resetPasswordButton: string;
    processing: string;

    // 已登录状态
    userInfo: string;
    syncStatus: string;
    networkStatus: string;
    online: string;
    offline: string;
    realtimeSync: string;
    connected: string;
    disconnected: string;
    pendingSync: string;
    items: string;
    lastSync: string;
    syncNow: string;
    syncing: string;
    restoreFromCloud: string;

    // 修改密码
    changePassword: string;
    newPassword: string;

    // 退出登录
    signOut: string;

    // 消息提示
    loginSuccess: string;
    registerSuccess: string;
    resetPasswordSuccess: string;
    passwordChanged: string;
    syncSuccess: string;
    restoreSuccess: string;
    signedOut: string;
    passwordMismatch: string;
    operationFailed: string;
    syncFailed: string;
    restoreFailed: string;
    signOutFailed: string;
    restoreConfirm: string;
    signOutConfirm: string;
    pageWillReload: string;
  };

  // 模板系统
  templates: {
    // 模板选择器
    selectTemplate: string;
    createCustom: string;

    // 模板编辑器
    createTemplate: string;
    editTemplate: string;
    templateName: string;
    templateDescription: string;
    selectIcon: string;
    focusDuration: string;
    breakDuration: string;
    longBreakDuration: string;
    sessionsPerRound: string;
    preview: string;
    create: string;
    update: string;

    // 预设模板名称
    presetNames: {
      classic: string;
      study: string;
      work: string;
      creative: string;
      sprint: string;
      deepFocus: string;
      relax: string;
    };

    // 预设模板描述
    presetDescriptions: {
      classic: string;
      study: string;
      work: string;
      creative: string;
      sprint: string;
      deepFocus: string;
      relax: string;
    };

    // 消息提示
    templateCreated: string;
    templateUpdated: string;
    templateDeleted: string;
    templateApplied: string;
    deleteConfirm: string;

    // 验证消息
    nameRequired: string;
    nameTooLong: string;
    descriptionTooLong: string;
  };

  // 首次使用引导
  onboarding?: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    stepProgress: string;
    skip: string;
    prev: string;
    next: string;
    start: string;
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
    account: '账号',
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
      deep_focus: '🎯 深度专注',
      rainy_study: '🌧️ 雨中学习',
      ocean_calm: '🌊 海洋宁静',
      cozy_fireplace: '🔥 温暖壁炉',
      forest_retreat: '🌿 森林静修',
      cafe_work: '☕ 咖啡馆工作',
      library_silence: '📚 图书馆静谧',
      night_work: '🌙 深夜工作',
    },

    soundscapeDescriptions: {
      deep_focus: '棕噪音与白噪音的完美平衡，屏蔽一切干扰',
      rainy_study: '雨声与粉噪音，营造舒适的学习氛围',
      ocean_calm: '海浪与棕噪音，深沉而平静',
      cozy_fireplace: '壁炉与粉噪音，温馨舒适的工作环境',
      forest_retreat: '森林、鸟鸣与白噪音的自然和谐',
      cafe_work: '咖啡店氛围与粉噪音，模拟理想工作环境',
      library_silence: '图书馆与棕噪音，极致安静的专注空间',
      night_work: '虫鸣、风铃与紫噪音，适合夜间专注',
    },

    soundNames: {
      none: '无声',
      // 色彩噪音
      white_noise: '白噪音',
      pink_noise: '粉噪音',
      brown_noise: '棕噪音',
      violet_noise: '紫噪音',
      // 水声
      rain: '雨声',
      waves: '海浪',
      stream: '溪流',
      ocean: '海洋',
      // 火焰
      fireplace: '壁炉',
      campfire: '篝火',
      thunder: '雷声',
      wind: '风声',
      // 自然
      forest: '森林',
      birds: '鸟鸣',
      crickets: '虫鸣',
      wind_chimes: '风铃',
      // 环境
      cafe: '咖啡店',
      library: '图书馆',
      air_conditioner: '空调',
      city_ambient: '城市氛围',
      // 完成音效
      singing_bowl: '颂钵',
      bamboo_chime: '竹风铃',
      music_box: '音乐盒',
      bell: '摇铃',
      piano: '钢琴',
    },

    soundCategoryNames: {
      white_noise: '🎚️ 白噪音',
      water: '💧 水声',
      atmosphere: '🔥 氛围',
      nature: '🌿 自然',
      ambient: '☕ 环境',
    },

    aboutTitle: '关于 TideFocus',
    aboutDescription: 'TideFocus（心流时刻）是一款专业的番茄钟专注计时器，帮助你进入心流状态，提升工作学习效率。',
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
      selectTask: '选择一个任务（点击下拉）',
      orDivider: '或',
      inputLabel: '直接输入你的意图',
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
      subtitle: '心流时刻',
      description1: 'TideFocus 是一款专业的番茄钟专注计时器，像潮汐一样有节奏地帮助你进入心流状态。',
      description2: '集成白噪音、任务管理、成就系统，让专注成为习惯，提升工作学习效率。',
      version: '版本',
      versionNumber: 'v1.0.5',
      features: '核心特性',
      feature1: '🎯 番茄钟计时器 - 专注、短休息、长休息',
      feature2: '🎵 白噪音混音器 - 20种环境音可自由组合',
      feature3: '✅ 任务管理 - 将专注会话与任务关联',
      feature4: '🏆 成就系统 - 29个成就追踪你的进步',
      feature5: '📊 数据统计 - 详细的专注数据和可视化图表',
      contact: '联系我们',
      email: 'moreless1024@gmail.com',
      quickTips: '快捷提示',
      tip1: '播放 / 暂停',
      tip2: '跳过当前阶段',
      madeWith: '用 ❤️ 制作',
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

    accountTab: {
      cloudSync: '云端同步',
      loginToSync: '登录以启用多设备数据同步',
      login: '登录',
      register: '注册',
      displayName: '显示名称',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      minPasswordLength: '至少 6 个字符',
      forgotPassword: '忘记密码？',
      backToLogin: '返回登录',
      loginButton: '登录',
      registerButton: '注册',
      resetPasswordButton: '发送重置邮件',
      processing: '处理中...',

      userInfo: '用户信息',
      syncStatus: '同步状态',
      networkStatus: '网络状态',
      online: '在线',
      offline: '离线',
      realtimeSync: '实时同步',
      connected: '已连接',
      disconnected: '未连接',
      pendingSync: '待同步',
      items: '项',
      lastSync: '最后同步',
      syncNow: '立即同步',
      syncing: '同步中...',
      restoreFromCloud: '从云端恢复',

      changePassword: '修改密码',
      newPassword: '新密码',

      signOut: '退出登录',

      loginSuccess: '登录成功！',
      registerSuccess: '注册成功！请查收验证邮件。',
      resetPasswordSuccess: '密码重置邮件已发送！',
      passwordChanged: '密码修改成功！',
      syncSuccess: '同步成功！',
      restoreSuccess: '恢复成功！页面将在 3 秒后刷新...',
      signedOut: '已退出登录',
      passwordMismatch: '两次输入的密码不一致',
      operationFailed: '操作失败，请重试',
      syncFailed: '同步失败',
      restoreFailed: '恢复失败',
      signOutFailed: '退出登录失败',
      restoreConfirm: '确定要从云端恢复数据吗？这将覆盖本地数据！',
      signOutConfirm: '确定要退出登录吗？',
      pageWillReload: '页面将在 3 秒后刷新',
    },

    templates: {
      selectTemplate: '选择模板',
      createCustom: '创建自定义模板',

      createTemplate: '创建模板',
      editTemplate: '编辑模板',
      templateName: '模板名称',
      templateDescription: '模板描述',
      selectIcon: '选择图标',
      focusDuration: '专注时长',
      breakDuration: '短休息时长',
      longBreakDuration: '长休息时长',
      sessionsPerRound: '每轮次数',
      preview: '预览',
      create: '创建',
      update: '更新',

      presetNames: {
        classic: '经典番茄钟',
        study: '学习模式',
        work: '工作模式',
        creative: '创作模式',
        sprint: '冲刺模式',
        deepFocus: '深度专注',
        relax: '轻松模式',
      },

      presetDescriptions: {
        classic: '25分专注，5分休息，适合大多数工作场景',
        study: '25分专注，5分休息，适合学习和记忆',
        work: '50分专注，10分休息，适合深度工作',
        creative: '90分专注，20分休息，适合创意工作',
        sprint: '15分专注，3分休息，短时高效',
        deepFocus: '120分专注，30分休息，极致专注',
        relax: '20分专注，10分休息，低压力学习',
      },

      templateCreated: '模板已创建',
      templateUpdated: '模板已更新',
      templateDeleted: '模板已删除',
      templateApplied: '已切换到模板',
      deleteConfirm: '确定要删除这个模板吗？',

      nameRequired: '请输入模板名称',
      nameTooLong: '模板名称不能超过 20 个字符',
      descriptionTooLong: '模板描述不能超过 100 个字符',
    },

    onboarding: {
      step1Title: '欢迎使用 TideFocus',
      step1Desc: '一个帮助你专注工作、提升效率的番茄钟应用。让我们快速了解核心功能，开始你的专注之旅！',
      step2Title: '设置你的专注意图',
      step2Desc: '每次开始专注前，设定你要完成的任务。明确的目标让专注更有方向，效率更高。',
      step3Title: '选择白噪音',
      step3Desc: '20种环境音效，帮助你进入专注状态。可以混合多种声音创造独特氛围，找到最适合你的专注环境。',
      step4Title: '查看统计数据',
      step4Desc: '追踪你的专注时长、完成的任务，解锁成就。数据可视化让你清晰看到自己的成长轨迹。',
      step5Title: '使用模板快速开始',
      step5Desc: '7种预设模板，适合不同场景：深度工作、快速冲刺、学习考试等。一键切换，立即开始专注！',
      stepProgress: '步骤',
      skip: '跳过',
      prev: '上一步',
      next: '下一步',
      start: '开始使用',
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
    account: '帳號',
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
      deep_focus: '🎯 深度專注',
      rainy_study: '🌧️ 雨中學習',
      ocean_calm: '🌊 海洋寧靜',
      cozy_fireplace: '🔥 溫暖壁爐',
      forest_retreat: '🌿 森林靜修',
      cafe_work: '☕ 咖啡館工作',
      library_silence: '📚 圖書館靜謐',
      night_work: '🌙 深夜工作',
    },

    soundscapeDescriptions: {
      deep_focus: '棕噪音與白噪音的完美平衡，屏蔽一切干擾',
      rainy_study: '雨聲與粉噪音，營造舒適的學習氛圍',
      ocean_calm: '海浪與棕噪音，深沉而平靜',
      cozy_fireplace: '壁爐與粉噪音，溫馨舒適的工作環境',
      forest_retreat: '森林、鳥鳴與白噪音的自然和諧',
      cafe_work: '咖啡店氛圍與粉噪音，模擬理想工作環境',
      library_silence: '圖書館與棕噪音，極致安靜的專注空間',
      night_work: '蟲鳴、風鈴與紫噪音，適合夜間專注',
    },

    soundNames: {
      none: '無聲',
      // 色彩噪音
      white_noise: '白噪音',
      pink_noise: '粉噪音',
      brown_noise: '棕噪音',
      violet_noise: '紫噪音',
      // 水聲
      rain: '雨聲',
      waves: '海浪',
      stream: '溪流',
      ocean: '海洋',
      // 火焰
      fireplace: '壁爐',
      campfire: '篝火',
      thunder: '雷聲',
      wind: '風聲',
      // 自然
      forest: '森林',
      birds: '鳥鳴',
      crickets: '蟲鳴',
      wind_chimes: '風鈴',
      // 環境
      cafe: '咖啡店',
      library: '圖書館',
      air_conditioner: '空調',
      city_ambient: '城市氛圍',
      // 完成音效
      singing_bowl: '頌缽',
      bamboo_chime: '竹風鈴',
      music_box: '音樂盒',
      bell: '搖鈴',
      piano: '鋼琴',
    },

    soundCategoryNames: {
      white_noise: '🎚️ 白噪音',
      water: '💧 水聲',
      atmosphere: '🔥 氛圍',
      nature: '🌿 自然',
      ambient: '☕ 環境',
    },

    aboutTitle: '關於 TideFocus',
    aboutDescription: 'TideFocus（心流時刻）是一款專業的番茄鐘專注計時器，幫助你進入心流狀態，提升工作學習效率。',
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
      selectTask: '選擇一個任務（點擊下拉）',
      orDivider: '或',
      inputLabel: '直接輸入你的意圖',
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
      subtitle: '心流時刻',
      description1: 'TideFocus 是一款專業的番茄鐘專注計時器，像潮汐一樣有節奏地幫助你進入心流狀態。',
      description2: '集成白噪音、任務管理、成就系統，讓專注成為習慣，提升工作學習效率。',
      version: '版本',
      versionNumber: 'v1.0.5',
      features: '核心特性',
      feature1: '🎯 番茄鐘計時器 - 專注、短休息、長休息',
      feature2: '🎵 白噪音混音器 - 20種環境音可自由組合',
      feature3: '✅ 任務管理 - 將專注會話與任務關聯',
      feature4: '🏆 成就系統 - 29個成就追蹤你的進步',
      feature5: '📊 數據統計 - 詳細的專注數據和可視化圖表',
      contact: '聯繫我們',
      email: 'moreless1024@gmail.com',
      quickTips: '快捷提示',
      tip1: '播放 / 暫停',
      tip2: '跳過當前階段',
      madeWith: '用 ❤️ 製作',
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

    accountTab: {
      cloudSync: '雲端同步',
      loginToSync: '登入以啟用多裝置資料同步',
      login: '登入',
      register: '註冊',
      displayName: '顯示名稱',
      email: '電子郵件',
      password: '密碼',
      confirmPassword: '確認密碼',
      minPasswordLength: '至少 6 個字元',
      forgotPassword: '忘記密碼？',
      backToLogin: '返回登入',
      loginButton: '登入',
      registerButton: '註冊',
      resetPasswordButton: '發送重設郵件',
      processing: '處理中...',

      userInfo: '使用者資訊',
      syncStatus: '同步狀態',
      networkStatus: '網路狀態',
      online: '線上',
      offline: '離線',
      realtimeSync: '即時同步',
      connected: '已連接',
      disconnected: '未連接',
      pendingSync: '待同步',
      items: '項',
      lastSync: '最後同步',
      syncNow: '立即同步',
      syncing: '同步中...',
      restoreFromCloud: '從雲端恢復',

      changePassword: '修改密碼',
      newPassword: '新密碼',

      signOut: '登出',

      loginSuccess: '登入成功！',
      registerSuccess: '註冊成功！請查收驗證郵件。',
      resetPasswordSuccess: '密碼重設郵件已發送！',
      passwordChanged: '密碼修改成功！',
      syncSuccess: '同步成功！',
      restoreSuccess: '恢復成功！頁面將在 3 秒後重新整理...',
      signedOut: '已登出',
      passwordMismatch: '兩次輸入的密碼不一致',
      operationFailed: '操作失敗，請重試',
      syncFailed: '同步失敗',
      restoreFailed: '恢復失敗',
      signOutFailed: '登出失敗',
      restoreConfirm: '確定要從雲端恢復資料嗎？這將覆蓋本機資料！',
      signOutConfirm: '確定要登出嗎？',
      pageWillReload: '頁面將在 3 秒後重新整理',
    },

    templates: {
      selectTemplate: '選擇模板',
      createCustom: '建立自訂模板',

      createTemplate: '建立模板',
      editTemplate: '編輯模板',
      templateName: '模板名稱',
      templateDescription: '模板描述',
      selectIcon: '選擇圖示',
      focusDuration: '專注時長',
      breakDuration: '短休息時長',
      longBreakDuration: '長休息時長',
      sessionsPerRound: '每輪次數',
      preview: '預覽',
      create: '建立',
      update: '更新',

      presetNames: {
        classic: '經典番茄鐘',
        study: '學習模式',
        work: '工作模式',
        creative: '創作模式',
        sprint: '衝刺模式',
        deepFocus: '深度專注',
        relax: '輕鬆模式',
      },

      presetDescriptions: {
        classic: '25分專注，5分休息，適合大多數工作場景',
        study: '25分專注，5分休息，適合學習和記憶',
        work: '50分專注，10分休息，適合深度工作',
        creative: '90分專注，20分休息，適合創意工作',
        sprint: '15分專注，3分休息，短時高效',
        deepFocus: '120分專注，30分休息，極致專注',
        relax: '20分專注，10分休息，低壓力學習',
      },

      templateCreated: '模板已建立',
      templateUpdated: '模板已更新',
      templateDeleted: '模板已刪除',
      templateApplied: '已切換到模板',
      deleteConfirm: '確定要刪除這個模板嗎？',

      nameRequired: '請輸入模板名稱',
      nameTooLong: '模板名稱不能超過 20 個字元',
      descriptionTooLong: '模板描述不能超過 100 個字元',
    },

    onboarding: {
      step1Title: '歡迎使用 TideFocus',
      step1Desc: '一個幫助你專注工作、提升效率的番茄鐘應用。讓我們快速了解核心功能，開始你的專注之旅！',
      step2Title: '設置你的專注意圖',
      step2Desc: '每次開始專注前，設定你要完成的任務。明確的目標讓專注更有方向，效率更高。',
      step3Title: '選擇白噪音',
      step3Desc: '20種環境音效，幫助你進入專注狀態。可以混合多種聲音創造獨特氛圍，找到最適合你的專注環境。',
      step4Title: '查看統計數據',
      step4Desc: '追蹤你的專注時長、完成的任務，解鎖成就。數據可視化讓你清晰看到自己的成長軌跡。',
      step5Title: '使用模板快速開始',
      step5Desc: '7種預設模板，適合不同場景：深度工作、快速衝刺、學習考試等。一鍵切換，立即開始專注！',
      stepProgress: '步驟',
      skip: '跳過',
      prev: '上一步',
      next: '下一步',
      start: '開始使用',
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
    account: 'Account',
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
      deep_focus: '🎯 Deep Focus',
      rainy_study: '🌧️ Rainy Study',
      ocean_calm: '🌊 Ocean Calm',
      cozy_fireplace: '🔥 Cozy Fireplace',
      forest_retreat: '🌿 Forest Retreat',
      cafe_work: '☕ Cafe Work',
      library_silence: '📚 Library Silence',
      night_work: '🌙 Night Work',
    },

    soundscapeDescriptions: {
      deep_focus: 'Perfect balance of brown and white noise, blocking all distractions',
      rainy_study: 'Rain and pink noise, creating a comfortable study atmosphere',
      ocean_calm: 'Waves and brown noise, deep and peaceful',
      cozy_fireplace: 'Fireplace and pink noise, warm and comfortable work environment',
      forest_retreat: 'Forest, birds and white noise in natural harmony',
      cafe_work: 'Cafe ambiance and pink noise, simulating ideal work environment',
      library_silence: 'Library and brown noise, ultimate quiet focus space',
      night_work: 'Crickets, wind chimes and violet noise, perfect for night focus',
    },

    soundNames: {
      none: 'None',
      // Colored Noise
      white_noise: 'White Noise',
      pink_noise: 'Pink Noise',
      brown_noise: 'Brown Noise',
      violet_noise: 'Violet Noise',
      // Water
      rain: 'Rain',
      waves: 'Waves',
      stream: 'Stream',
      ocean: 'Ocean',
      // Fire
      fireplace: 'Fireplace',
      campfire: 'Campfire',
      thunder: 'Thunder',
      wind: 'Wind',
      // Nature
      forest: 'Forest',
      birds: 'Birds',
      crickets: 'Crickets',
      wind_chimes: 'Wind Chimes',
      // Ambient
      cafe: 'Cafe',
      library: 'Library',
      air_conditioner: 'Air Conditioner',
      city_ambient: 'City Ambient',
      // Completion Sounds
      singing_bowl: 'Singing Bowl',
      bamboo_chime: 'Bamboo Chime',
      music_box: 'Music Box',
      bell: 'Bell',
      piano: 'Piano',
    },

    soundCategoryNames: {
      white_noise: '🎚️ White Noise',
      water: '💧 Water',
      atmosphere: '🔥 Atmosphere',
      nature: '🌿 Nature',
      ambient: '☕ Ambient',
    },

    aboutTitle: 'About TideFocus',
    aboutDescription: 'TideFocus is a professional Pomodoro focus timer that helps you enter flow state and boost productivity.',
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
      selectTask: 'Select a task (click dropdown)',
      orDivider: 'OR',
      inputLabel: 'Or type your intention directly',
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
      subtitle: 'Flow Focus Timer',
      description1: 'TideFocus is a professional Pomodoro focus timer that helps you enter flow state with rhythmic focus sessions like the tide.',
      description2: 'Integrated with white noise, task management, and achievement system to make focus a habit and boost productivity.',
      version: 'Version',
      versionNumber: 'v1.0.5',
      features: 'Key Features',
      feature1: '🎯 Pomodoro Timer - Focus, short break, long break',
      feature2: '🎵 Soundscape Mixer - 20 ambient sounds to mix freely',
      feature3: '✅ Task Management - Link focus sessions to tasks',
      feature4: '🏆 Achievement System - 29 achievements to track progress',
      feature5: '📊 Statistics - Detailed focus data and visualizations',
      contact: 'Contact Us',
      email: 'moreless1024@gmail.com',
      quickTips: 'Quick Tips',
      tip1: 'to Play / Pause',
      tip2: 'to Skip',
      madeWith: 'Made with ❤️',
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

    accountTab: {
      cloudSync: 'Cloud Sync',
      loginToSync: 'Sign in to enable multi-device data sync',
      login: 'Sign In',
      register: 'Sign Up',
      displayName: 'Display Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      minPasswordLength: 'At least 6 characters',
      forgotPassword: 'Forgot password?',
      backToLogin: 'Back to Sign In',
      loginButton: 'Sign In',
      registerButton: 'Sign Up',
      resetPasswordButton: 'Send Reset Email',
      processing: 'Processing...',

      userInfo: 'User Info',
      syncStatus: 'Sync Status',
      networkStatus: 'Network Status',
      online: 'Online',
      offline: 'Offline',
      realtimeSync: 'Realtime Sync',
      connected: 'Connected',
      disconnected: 'Disconnected',
      pendingSync: 'Pending Sync',
      items: 'items',
      lastSync: 'Last Sync',
      syncNow: 'Sync Now',
      syncing: 'Syncing...',
      restoreFromCloud: 'Restore from Cloud',

      changePassword: 'Change Password',
      newPassword: 'New Password',

      signOut: 'Sign Out',

      loginSuccess: 'Signed in successfully!',
      registerSuccess: 'Signed up successfully! Please check your email for verification.',
      resetPasswordSuccess: 'Password reset email sent!',
      passwordChanged: 'Password changed successfully!',
      syncSuccess: 'Synced successfully!',
      restoreSuccess: 'Restored successfully! Page will reload in 3 seconds...',
      signedOut: 'Signed out',
      passwordMismatch: 'Passwords do not match',
      operationFailed: 'Operation failed, please try again',
      syncFailed: 'Sync failed',
      restoreFailed: 'Restore failed',
      signOutFailed: 'Sign out failed',
      restoreConfirm: 'Are you sure you want to restore data from cloud? This will overwrite local data!',
      signOutConfirm: 'Are you sure you want to sign out?',
      pageWillReload: 'Page will reload in 3 seconds',
    },

    templates: {
      selectTemplate: 'Select Template',
      createCustom: 'Create Custom Template',

      createTemplate: 'Create Template',
      editTemplate: 'Edit Template',
      templateName: 'Template Name',
      templateDescription: 'Template Description',
      selectIcon: 'Select Icon',
      focusDuration: 'Focus Duration',
      breakDuration: 'Short Break Duration',
      longBreakDuration: 'Long Break Duration',
      sessionsPerRound: 'Sessions Per Round',
      preview: 'Preview',
      create: 'Create',
      update: 'Update',

      presetNames: {
        classic: 'Classic Pomodoro',
        study: 'Study Mode',
        work: 'Work Mode',
        creative: 'Creative Mode',
        sprint: 'Sprint Mode',
        deepFocus: 'Deep Focus',
        relax: 'Relax Mode',
      },

      presetDescriptions: {
        classic: '25min focus, 5min break, suitable for most work scenarios',
        study: '25min focus, 5min break, suitable for learning and memorization',
        work: '50min focus, 10min break, suitable for deep work',
        creative: '90min focus, 20min break, suitable for creative work',
        sprint: '15min focus, 3min break, short and efficient',
        deepFocus: '120min focus, 30min break, ultimate focus',
        relax: '20min focus, 10min break, low-pressure learning',
      },

      templateCreated: 'Template created',
      templateUpdated: 'Template updated',
      templateDeleted: 'Template deleted',
      templateApplied: 'Switched to template',
      deleteConfirm: 'Are you sure you want to delete this template?',

      nameRequired: 'Please enter template name',
      nameTooLong: 'Template name cannot exceed 20 characters',
      descriptionTooLong: 'Template description cannot exceed 100 characters',
    },

    onboarding: {
      step1Title: 'Welcome to TideFocus',
      step1Desc: 'A Pomodoro app that helps you focus and boost productivity. Let\'s quickly explore the core features and start your focus journey!',
      step2Title: 'Set Your Focus Intention',
      step2Desc: 'Before each focus session, define what you want to accomplish. Clear goals make your focus more purposeful and efficient.',
      step3Title: 'Choose White Noise',
      step3Desc: '20 ambient sounds to help you enter a focused state. Mix multiple sounds to create your unique atmosphere and find your perfect focus environment.',
      step4Title: 'View Statistics',
      step4Desc: 'Track your focus time, completed tasks, and unlock achievements. Data visualization helps you see your growth clearly.',
      step5Title: 'Use Templates for Quick Start',
      step5Desc: '7 preset templates for different scenarios: deep work, quick sprint, study sessions, and more. One-click switch to start focusing immediately!',
      stepProgress: 'Step',
      skip: 'Skip',
      prev: 'Previous',
      next: 'Next',
      start: 'Get Started',
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
    account: 'Cuenta',
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
      deep_focus: '🎯 Enfoque Profundo',
      rainy_study: '🌧️ Estudio Lluvioso',
      ocean_calm: '🌊 Calma Oceánica',
      cozy_fireplace: '🔥 Chimenea Acogedora',
      forest_retreat: '🌿 Retiro Forestal',
      cafe_work: '☕ Trabajo en Cafetería',
      library_silence: '📚 Silencio de Biblioteca',
      night_work: '🌙 Trabajo Nocturno',
    },

    soundscapeDescriptions: {
      deep_focus: 'Equilibrio perfecto de ruido marrón y blanco, bloqueando todas las distracciones',
      rainy_study: 'Lluvia y ruido rosa, creando una atmósfera de estudio cómoda',
      ocean_calm: 'Olas y ruido marrón, profundo y tranquilo',
      cozy_fireplace: 'Chimenea y ruido rosa, ambiente de trabajo cálido y cómodo',
      forest_retreat: 'Bosque, pájaros y ruido blanco en armonía natural',
      cafe_work: 'Ambiente de cafetería y ruido rosa, simulando el entorno de trabajo ideal',
      library_silence: 'Biblioteca y ruido marrón, espacio de enfoque silencioso definitivo',
      night_work: 'Grillos, campanillas de viento y ruido violeta, perfecto para el enfoque nocturno',
    },

    soundNames: {
      none: 'Ninguno',
      // Ruido de Color
      white_noise: 'Ruido Blanco',
      pink_noise: 'Ruido Rosa',
      brown_noise: 'Ruido Marrón',
      violet_noise: 'Ruido Violeta',
      // Agua
      rain: 'Lluvia',
      waves: 'Olas',
      stream: 'Arroyo',
      ocean: 'Océano',
      // Fuego
      fireplace: 'Chimenea',
      campfire: 'Fogata',
      thunder: 'Trueno',
      wind: 'Viento',
      // Naturaleza
      forest: 'Bosque',
      birds: 'Pájaros',
      crickets: 'Grillos',
      wind_chimes: 'Campanillas de Viento',
      // Ambiente
      cafe: 'Cafetería',
      library: 'Biblioteca',
      air_conditioner: 'Aire Acondicionado',
      city_ambient: 'Ambiente Urbano',
      // Sonidos de Finalización
      singing_bowl: 'Cuenco Tibetano',
      bamboo_chime: 'Campanilla de Bambú',
      music_box: 'Caja de Música',
      bell: 'Campana',
      piano: 'Piano',
    },

    soundCategoryNames: {
      white_noise: '🎚️ Ruido Blanco',
      water: '💧 Agua',
      atmosphere: '🔥 Atmósfera',
      nature: '🌿 Naturaleza',
      ambient: '☕ Ambiente',
    },

    aboutTitle: 'Acerca de TideFocus',
    aboutDescription: 'TideFocus es un temporizador Pomodoro profesional que te ayuda a entrar en estado de flujo y aumentar la productividad.',
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
      selectTask: 'Selecciona una tarea (haz clic en el menú)',
      orDivider: 'O',
      inputLabel: 'O escribe tu intención directamente',
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
      subtitle: 'Temporizador de Flujo',
      description1: 'TideFocus es un temporizador Pomodoro profesional que te ayuda a entrar en estado de flujo con sesiones rítmicas como la marea.',
      description2: 'Integrado con ruido blanco, gestión de tareas y sistema de logros para hacer del enfoque un hábito y aumentar la productividad.',
      version: 'Versión',
      versionNumber: 'v1.0.5',
      features: 'Características Principales',
      feature1: '🎯 Temporizador Pomodoro - Enfoque, descanso corto, descanso largo',
      feature2: '🎵 Mezclador de Sonidos - 20 sonidos ambientales para mezclar libremente',
      feature3: '✅ Gestión de Tareas - Vincula sesiones de enfoque con tareas',
      feature4: '🏆 Sistema de Logros - 29 logros para seguir tu progreso',
      feature5: '📊 Estadísticas - Datos detallados de enfoque y visualizaciones',
      contact: 'Contáctanos',
      email: 'moreless1024@gmail.com',
      quickTips: 'Consejos Rápidos',
      tip1: 'para Reproducir / Pausar',
      tip2: 'para Saltar',
      madeWith: 'Hecho con ❤️',
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

    accountTab: {
      cloudSync: 'Sincronización en la Nube',
      loginToSync: 'Inicia sesión para habilitar la sincronización de datos entre dispositivos',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      displayName: 'Nombre para Mostrar',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      minPasswordLength: 'Al menos 6 caracteres',
      forgotPassword: '¿Olvidaste tu contraseña?',
      backToLogin: 'Volver a Iniciar Sesión',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Registrarse',
      resetPasswordButton: 'Enviar Correo de Restablecimiento',
      processing: 'Procesando...',

      userInfo: 'Información del Usuario',
      syncStatus: 'Estado de Sincronización',
      networkStatus: 'Estado de Red',
      online: 'En Línea',
      offline: 'Sin Conexión',
      realtimeSync: 'Sincronización en Tiempo Real',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      pendingSync: 'Sincronización Pendiente',
      items: 'elementos',
      lastSync: 'Última Sincronización',
      syncNow: 'Sincronizar Ahora',
      syncing: 'Sincronizando...',
      restoreFromCloud: 'Restaurar desde la Nube',

      changePassword: 'Cambiar Contraseña',
      newPassword: 'Nueva Contraseña',

      signOut: 'Cerrar Sesión',

      loginSuccess: '¡Sesión iniciada con éxito!',
      registerSuccess: '¡Registro exitoso! Por favor, revisa tu correo para verificación.',
      resetPasswordSuccess: '¡Correo de restablecimiento de contraseña enviado!',
      passwordChanged: '¡Contraseña cambiada con éxito!',
      syncSuccess: '¡Sincronizado con éxito!',
      restoreSuccess: '¡Restaurado con éxito! La página se recargará en 3 segundos...',
      signedOut: 'Sesión cerrada',
      passwordMismatch: 'Las contraseñas no coinciden',
      operationFailed: 'Operación fallida, por favor intenta de nuevo',
      syncFailed: 'Sincronización fallida',
      restoreFailed: 'Restauración fallida',
      signOutFailed: 'Cierre de sesión fallido',
      restoreConfirm: '¿Estás seguro de que quieres restaurar datos desde la nube? ¡Esto sobrescribirá los datos locales!',
      signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
      pageWillReload: 'La página se recargará en 3 segundos',
    },

    templates: {
      selectTemplate: 'Seleccionar Plantilla',
      createCustom: 'Crear Plantilla Personalizada',

      createTemplate: 'Crear Plantilla',
      editTemplate: 'Editar Plantilla',
      templateName: 'Nombre de la Plantilla',
      templateDescription: 'Descripción de la Plantilla',
      selectIcon: 'Seleccionar Icono',
      focusDuration: 'Duración del Enfoque',
      breakDuration: 'Duración del Descanso Corto',
      longBreakDuration: 'Duración del Descanso Largo',
      sessionsPerRound: 'Sesiones por Ronda',
      preview: 'Vista Previa',
      create: 'Crear',
      update: 'Actualizar',

      presetNames: {
        classic: 'Pomodoro Clásico',
        study: 'Modo de Estudio',
        work: 'Modo de Trabajo',
        creative: 'Modo Creativo',
        sprint: 'Modo Sprint',
        deepFocus: 'Enfoque Profundo',
        relax: 'Modo Relajado',
      },

      presetDescriptions: {
        classic: '25min enfoque, 5min descanso, adecuado para la mayoría de escenarios de trabajo',
        study: '25min enfoque, 5min descanso, adecuado para aprendizaje y memorización',
        work: '50min enfoque, 10min descanso, adecuado para trabajo profundo',
        creative: '90min enfoque, 20min descanso, adecuado para trabajo creativo',
        sprint: '15min enfoque, 3min descanso, corto y eficiente',
        deepFocus: '120min enfoque, 30min descanso, enfoque máximo',
        relax: '20min enfoque, 10min descanso, aprendizaje de baja presión',
      },

      templateCreated: 'Plantilla creada',
      templateUpdated: 'Plantilla actualizada',
      templateDeleted: 'Plantilla eliminada',
      templateApplied: 'Cambiado a plantilla',
      deleteConfirm: '¿Estás seguro de que quieres eliminar esta plantilla?',

      nameRequired: 'Por favor ingresa el nombre de la plantilla',
      nameTooLong: 'El nombre de la plantilla no puede exceder 20 caracteres',
      descriptionTooLong: 'La descripción de la plantilla no puede exceder 100 caracteres',
    },

    onboarding: {
      step1Title: 'Bienvenido a TideFocus',
      step1Desc: 'Una aplicación Pomodoro que te ayuda a concentrarte y aumentar la productividad. ¡Exploremos rápidamente las funciones principales y comencemos tu viaje de concentración!',
      step2Title: 'Establece tu Intención de Enfoque',
      step2Desc: 'Antes de cada sesión de enfoque, define lo que quieres lograr. Los objetivos claros hacen que tu enfoque sea más propositivo y eficiente.',
      step3Title: 'Elige Ruido Blanco',
      step3Desc: '20 sonidos ambientales para ayudarte a entrar en un estado de concentración. Mezcla múltiples sonidos para crear tu atmósfera única y encontrar tu entorno de enfoque perfecto.',
      step4Title: 'Ver Estadísticas',
      step4Desc: 'Rastrea tu tiempo de enfoque, tareas completadas y desbloquea logros. La visualización de datos te ayuda a ver tu crecimiento claramente.',
      step5Title: 'Usa Plantillas para Inicio Rápido',
      step5Desc: '7 plantillas preestablecidas para diferentes escenarios: trabajo profundo, sprint rápido, sesiones de estudio y más. ¡Cambia con un clic para comenzar a enfocarte inmediatamente!',
      stepProgress: 'Paso',
      skip: 'Saltar',
      prev: 'Anterior',
      next: 'Siguiente',
      start: 'Comenzar',
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
    account: 'アカウント',
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
      deep_focus: '🎯 深い集中',
      rainy_study: '🌧️ 雨の勉強',
      ocean_calm: '🌊 海の静けさ',
      cozy_fireplace: '🔥 暖かい暖炉',
      forest_retreat: '🌿 森の隠れ家',
      cafe_work: '☕ カフェ作業',
      library_silence: '📚 図書館の静寂',
      night_work: '🌙 夜の作業',
    },

    soundscapeDescriptions: {
      deep_focus: 'ブラウンノイズとホワイトノイズの完璧なバランス、すべての邪魔を遮断',
      rainy_study: '雨とピンクノイズ、快適な勉強の雰囲気を作る',
      ocean_calm: '波とブラウンノイズ、深く穏やか',
      cozy_fireplace: '暖炉とピンクノイズ、温かく快適な作業環境',
      forest_retreat: '森、鳥、ホワイトノイズの自然な調和',
      cafe_work: 'カフェの雰囲気とピンクノイズ、理想的な作業環境をシミュレート',
      library_silence: '図書館とブラウンノイズ、究極の静かな集中空間',
      night_work: 'コオロギ、風鈴、バイオレットノイズ、夜の集中に最適',
    },

    soundNames: {
      none: 'なし',
      // カラーノイズ
      white_noise: 'ホワイトノイズ',
      pink_noise: 'ピンクノイズ',
      brown_noise: 'ブラウンノイズ',
      violet_noise: 'バイオレットノイズ',
      // 水
      rain: '雨',
      waves: '波',
      stream: '小川',
      ocean: '海',
      // 火
      fireplace: '暖炉',
      campfire: '焚き火',
      thunder: '雷',
      wind: '風',
      // 自然
      forest: '森',
      birds: '鳥',
      crickets: 'コオロギ',
      wind_chimes: '風鈴',
      // 環境
      cafe: 'カフェ',
      library: '図書館',
      air_conditioner: 'エアコン',
      city_ambient: '都市の雰囲気',
      // 完了音
      singing_bowl: 'シンギングボウル',
      bamboo_chime: '竹風鈴',
      music_box: 'オルゴール',
      bell: 'ベル',
      piano: 'ピアノ',
    },

    soundCategoryNames: {
      white_noise: '🎚️ ホワイトノイズ',
      water: '💧 水',
      atmosphere: '🔥 雰囲気',
      nature: '🌿 自然',
      ambient: '☕ 環境',
    },

    aboutTitle: 'TideFocusについて',
    aboutDescription: 'TideFocusはフロー状態に入り、生産性を高めるプロフェッショナルなポモドーロタイマーです。',
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
      selectTask: 'タスクを選択（ドロップダウンをクリック）',
      orDivider: 'または',
      inputLabel: 'または直接意図を入力',
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
      subtitle: 'フロー集中タイマー',
      description1: 'TideFocusは、潮の満ち引きのようなリズミカルな集中セッションでフロー状態に入るのを助けるプロフェッショナルなポモドーロタイマーです。',
      description2: 'ホワイトノイズ、タスク管理、実績システムを統合し、集中を習慣化して生産性を高めます。',
      version: 'バージョン',
      versionNumber: 'v1.0.5',
      features: '主な機能',
      feature1: '🎯 ポモドーロタイマー - 集中、短い休憩、長い休憩',
      feature2: '🎵 サウンドスケープミキサー - 20種類の環境音を自由にミックス',
      feature3: '✅ タスク管理 - 集中セッションをタスクにリンク',
      feature4: '🏆 実績システム - 29の実績で進捗を追跡',
      feature5: '📊 統計 - 詳細な集中データと可視化',
      contact: 'お問い合わせ',
      email: 'moreless1024@gmail.com',
      quickTips: 'クイックヒント',
      tip1: '再生 / 一時停止',
      tip2: 'スキップ',
      madeWith: '❤️ を込めて作成',
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

    accountTab: {
      cloudSync: 'クラウド同期',
      loginToSync: 'マルチデバイスデータ同期を有効にするにはサインインしてください',
      login: 'サインイン',
      register: '登録',
      displayName: '表示名',
      email: 'メールアドレス',
      password: 'パスワード',
      confirmPassword: 'パスワード確認',
      minPasswordLength: '6文字以上',
      forgotPassword: 'パスワードをお忘れですか？',
      backToLogin: 'サインインに戻る',
      loginButton: 'サインイン',
      registerButton: '登録',
      resetPasswordButton: 'リセットメールを送信',
      processing: '処理中...',

      userInfo: 'ユーザー情報',
      syncStatus: '同期状態',
      networkStatus: 'ネットワーク状態',
      online: 'オンライン',
      offline: 'オフライン',
      realtimeSync: 'リアルタイム同期',
      connected: '接続済み',
      disconnected: '未接続',
      pendingSync: '同期待ち',
      items: '件',
      lastSync: '最終同期',
      syncNow: '今すぐ同期',
      syncing: '同期中...',
      restoreFromCloud: 'クラウドから復元',

      changePassword: 'パスワード変更',
      newPassword: '新しいパスワード',

      signOut: 'サインアウト',

      loginSuccess: 'サインインに成功しました！',
      registerSuccess: '登録に成功しました！確認メールをご確認ください。',
      resetPasswordSuccess: 'パスワードリセットメールを送信しました！',
      passwordChanged: 'パスワードを変更しました！',
      syncSuccess: '同期に成功しました！',
      restoreSuccess: '復元に成功しました！3秒後にページを再読み込みします...',
      signedOut: 'サインアウトしました',
      passwordMismatch: 'パスワードが一致しません',
      operationFailed: '操作に失敗しました。もう一度お試しください',
      syncFailed: '同期に失敗しました',
      restoreFailed: '復元に失敗しました',
      signOutFailed: 'サインアウトに失敗しました',
      restoreConfirm: 'クラウドからデータを復元しますか？ローカルデータが上書きされます！',
      signOutConfirm: 'サインアウトしますか？',
      pageWillReload: '3秒後にページを再読み込みします',
    },

    templates: {
      selectTemplate: 'テンプレートを選択',
      createCustom: 'カスタムテンプレートを作成',

      createTemplate: 'テンプレートを作成',
      editTemplate: 'テンプレートを編集',
      templateName: 'テンプレート名',
      templateDescription: 'テンプレートの説明',
      selectIcon: 'アイコンを選択',
      focusDuration: '集中時間',
      breakDuration: '短い休憩時間',
      longBreakDuration: '長い休憩時間',
      sessionsPerRound: 'ラウンドあたりのセッション数',
      preview: 'プレビュー',
      create: '作成',
      update: '更新',

      presetNames: {
        classic: 'クラシックポモドーロ',
        study: '学習モード',
        work: '作業モード',
        creative: 'クリエイティブモード',
        sprint: 'スプリントモード',
        deepFocus: 'ディープフォーカス',
        relax: 'リラックスモード',
      },

      presetDescriptions: {
        classic: '25分集中、5分休憩、ほとんどの作業シナリオに適しています',
        study: '25分集中、5分休憩、学習と記憶に適しています',
        work: '50分集中、10分休憩、深い作業に適しています',
        creative: '90分集中、20分休憩、クリエイティブな作業に適しています',
        sprint: '15分集中、3分休憩、短時間で効率的',
        deepFocus: '120分集中、30分休憩、究極の集中',
        relax: '20分集中、10分休憩、低圧力学習',
      },

      templateCreated: 'テンプレートを作成しました',
      templateUpdated: 'テンプレートを更新しました',
      templateDeleted: 'テンプレートを削除しました',
      templateApplied: 'テンプレートに切り替えました',
      deleteConfirm: 'このテンプレートを削除しますか？',

      nameRequired: 'テンプレート名を入力してください',
      nameTooLong: 'テンプレート名は20文字を超えることはできません',
      descriptionTooLong: 'テンプレートの説明は100文字を超えることはできません',
    },

    onboarding: {
      step1Title: 'TideFocusへようこそ',
      step1Desc: '集中力を高め、生産性を向上させるポモドーロアプリです。コア機能を素早く理解して、集中の旅を始めましょう！',
      step2Title: '集中の意図を設定',
      step2Desc: '各集中セッションの前に、達成したいことを定義します。明確な目標により、集中がより目的的で効率的になります。',
      step3Title: 'ホワイトノイズを選択',
      step3Desc: '20種類の環境音で集中状態に入るのを助けます。複数の音を混ぜて独自の雰囲気を作り、完璧な集中環境を見つけましょう。',
      step4Title: '統計を表示',
      step4Desc: '集中時間、完了したタスクを追跡し、実績をアンロックします。データの可視化により、成長を明確に確認できます。',
      step5Title: 'テンプレートでクイックスタート',
      step5Desc: '7つのプリセットテンプレートで、さまざまなシナリオに対応：深い作業、クイックスプリント、学習セッションなど。ワンクリックで切り替えて、すぐに集中を開始！',
      stepProgress: 'ステップ',
      skip: 'スキップ',
      prev: '前へ',
      next: '次へ',
      start: '始める',
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
    account: '계정',
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
      deep_focus: '🎯 깊은 집중',
      rainy_study: '🌧️ 비 오는 공부',
      ocean_calm: '🌊 바다의 고요함',
      cozy_fireplace: '🔥 따뜻한 벽난로',
      forest_retreat: '🌿 숲 속 휴식',
      cafe_work: '☕ 카페 작업',
      library_silence: '📚 도서관 정적',
      night_work: '🌙 밤 작업',
    },

    soundscapeDescriptions: {
      deep_focus: '브라운 노이즈와 화이트 노이즈의 완벽한 균형, 모든 방해 차단',
      rainy_study: '비와 핑크 노이즈, 편안한 학습 분위기 조성',
      ocean_calm: '파도와 브라운 노이즈, 깊고 평화로움',
      cozy_fireplace: '벽난로와 핑크 노이즈, 따뜻하고 편안한 작업 환경',
      forest_retreat: '숲, 새, 화이트 노이즈의 자연스러운 조화',
      cafe_work: '카페 분위기와 핑크 노이즈, 이상적인 작업 환경 시뮬레이션',
      library_silence: '도서관과 브라운 노이즈, 궁극의 조용한 집중 공간',
      night_work: '귀뚜라미, 풍경, 바이올렛 노이즈, 밤 집중에 완벽',
    },

    soundNames: {
      none: '없음',
      // 컬러 노이즈
      white_noise: '화이트 노이즈',
      pink_noise: '핑크 노이즈',
      brown_noise: '브라운 노이즈',
      violet_noise: '바이올렛 노이즈',
      // 물
      rain: '비',
      waves: '파도',
      stream: '시냇물',
      ocean: '바다',
      // 불
      fireplace: '벽난로',
      campfire: '모닥불',
      thunder: '천둥',
      wind: '바람',
      // 자연
      forest: '숲',
      birds: '새',
      crickets: '귀뚜라미',
      wind_chimes: '풍경',
      // 환경
      cafe: '카페',
      library: '도서관',
      air_conditioner: '에어컨',
      city_ambient: '도시 분위기',
      // 완료 사운드
      singing_bowl: '싱잉볼',
      bamboo_chime: '대나무 풍경',
      music_box: '오르골',
      bell: '종',
      piano: '피아노',
    },

    soundCategoryNames: {
      white_noise: '🎚️ 화이트 노이즈',
      water: '💧 물',
      atmosphere: '🔥 분위기',
      nature: '🌿 자연',
      ambient: '☕ 환경',
    },

    aboutTitle: 'TideFocus 정보',
    aboutDescription: 'TideFocus는 몰입 상태에 들어가 생산성을 높이는 전문 포모도로 타이머입니다.',
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
      selectTask: '작업 선택 (드롭다운 클릭)',
      orDivider: '또는',
      inputLabel: '또는 의도를 직접 입력',
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
      subtitle: '플로우 집중 타이머',
      description1: 'TideFocus는 조수의 리듬처럼 리드미컬한 집중 세션으로 몰입 상태에 들어가도록 돕는 전문 포모도로 타이머입니다.',
      description2: '화이트 노이즈, 작업 관리, 업적 시스템을 통합하여 집중을 습관화하고 생산성을 높입니다.',
      version: '버전',
      versionNumber: 'v1.0.5',
      features: '주요 기능',
      feature1: '🎯 포모도로 타이머 - 집중, 짧은 휴식, 긴 휴식',
      feature2: '🎵 사운드스케이프 믹서 - 20가지 환경음을 자유롭게 믹스',
      feature3: '✅ 작업 관리 - 집중 세션을 작업에 연결',
      feature4: '🏆 업적 시스템 - 29개의 업적으로 진행 상황 추적',
      feature5: '📊 통계 - 상세한 집중 데이터 및 시각화',
      contact: '문의하기',
      email: 'moreless1024@gmail.com',
      quickTips: '빠른 팁',
      tip1: '재생 / 일시정지',
      tip2: '건너뛰기',
      madeWith: '❤️ 로 제작',
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

    accountTab: {
      cloudSync: '클라우드 동기화',
      loginToSync: '다중 기기 데이터 동기화를 활성화하려면 로그인하세요',
      login: '로그인',
      register: '회원가입',
      displayName: '표시 이름',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      minPasswordLength: '최소 6자',
      forgotPassword: '비밀번호를 잊으셨나요?',
      backToLogin: '로그인으로 돌아가기',
      loginButton: '로그인',
      registerButton: '회원가입',
      resetPasswordButton: '재설정 이메일 보내기',
      processing: '처리 중...',

      userInfo: '사용자 정보',
      syncStatus: '동기화 상태',
      networkStatus: '네트워크 상태',
      online: '온라인',
      offline: '오프라인',
      realtimeSync: '실시간 동기화',
      connected: '연결됨',
      disconnected: '연결 안 됨',
      pendingSync: '동기화 대기 중',
      items: '항목',
      lastSync: '마지막 동기화',
      syncNow: '지금 동기화',
      syncing: '동기화 중...',
      restoreFromCloud: '클라우드에서 복원',

      changePassword: '비밀번호 변경',
      newPassword: '새 비밀번호',

      signOut: '로그아웃',

      loginSuccess: '로그인 성공!',
      registerSuccess: '회원가입 성공! 확인 이메일을 확인하세요.',
      resetPasswordSuccess: '비밀번호 재설정 이메일을 보냈습니다!',
      passwordChanged: '비밀번호가 변경되었습니다!',
      syncSuccess: '동기화 성공!',
      restoreSuccess: '복원 성공! 3초 후 페이지가 새로고침됩니다...',
      signedOut: '로그아웃됨',
      passwordMismatch: '비밀번호가 일치하지 않습니다',
      operationFailed: '작업 실패, 다시 시도하세요',
      syncFailed: '동기화 실패',
      restoreFailed: '복원 실패',
      signOutFailed: '로그아웃 실패',
      restoreConfirm: '클라우드에서 데이터를 복원하시겠습니까? 로컬 데이터를 덮어씁니다!',
      signOutConfirm: '로그아웃하시겠습니까?',
      pageWillReload: '3초 후 페이지가 새로고침됩니다',
    },

    templates: {
      selectTemplate: '템플릿 선택',
      createCustom: '사용자 정의 템플릿 만들기',

      createTemplate: '템플릿 만들기',
      editTemplate: '템플릿 편집',
      templateName: '템플릿 이름',
      templateDescription: '템플릿 설명',
      selectIcon: '아이콘 선택',
      focusDuration: '집중 시간',
      breakDuration: '짧은 휴식 시간',
      longBreakDuration: '긴 휴식 시간',
      sessionsPerRound: '라운드당 세션 수',
      preview: '미리보기',
      create: '만들기',
      update: '업데이트',

      presetNames: {
        classic: '클래식 포모도로',
        study: '학습 모드',
        work: '작업 모드',
        creative: '창작 모드',
        sprint: '스프린트 모드',
        deepFocus: '딥 포커스',
        relax: '휴식 모드',
      },

      presetDescriptions: {
        classic: '25분 집중, 5분 휴식, 대부분의 작업 시나리오에 적합',
        study: '25분 집중, 5분 휴식, 학습 및 암기에 적합',
        work: '50분 집중, 10분 휴식, 깊은 작업에 적합',
        creative: '90분 집중, 20분 휴식, 창의적인 작업에 적합',
        sprint: '15분 집중, 3분 휴식, 짧고 효율적',
        deepFocus: '120분 집중, 30분 휴식, 궁극의 집중',
        relax: '20분 집중, 10분 휴식, 저압 학습',
      },

      templateCreated: '템플릿이 생성되었습니다',
      templateUpdated: '템플릿이 업데이트되었습니다',
      templateDeleted: '템플릿이 삭제되었습니다',
      templateApplied: '템플릿으로 전환되었습니다',
      deleteConfirm: '이 템플릿을 삭제하시겠습니까?',

      nameRequired: '템플릿 이름을 입력하세요',
      nameTooLong: '템플릿 이름은 20자를 초과할 수 없습니다',
      descriptionTooLong: '템플릿 설명은 100자를 초과할 수 없습니다',
    },

    onboarding: {
      step1Title: 'TideFocus에 오신 것을 환영합니다',
      step1Desc: '집중력을 높이고 생산성을 향상시키는 포모도로 앱입니다. 핵심 기능을 빠르게 살펴보고 집중 여정을 시작하세요!',
      step2Title: '집중 의도 설정',
      step2Desc: '각 집중 세션 전에 달성하고자 하는 것을 정의하세요. 명확한 목표는 집중을 더 목적적이고 효율적으로 만듭니다.',
      step3Title: '백색 소음 선택',
      step3Desc: '20가지 주변 소리로 집중 상태에 들어가는 것을 도와줍니다. 여러 소리를 혼합하여 독특한 분위기를 만들고 완벽한 집중 환경을 찾으세요.',
      step4Title: '통계 보기',
      step4Desc: '집중 시간, 완료된 작업을 추적하고 업적을 잠금 해제하세요. 데이터 시각화를 통해 성장을 명확하게 확인할 수 있습니다.',
      step5Title: '템플릿으로 빠른 시작',
      step5Desc: '다양한 시나리오를 위한 7가지 사전 설정 템플릿: 깊은 작업, 빠른 스프린트, 학습 세션 등. 원클릭으로 전환하여 즉시 집중을 시작하세요!',
      stepProgress: '단계',
      skip: '건너뛰기',
      prev: '이전',
      next: '다음',
      start: '시작하기',
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

