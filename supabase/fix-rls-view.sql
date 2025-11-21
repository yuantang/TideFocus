-- 修复 user_data_stats 视图的 RLS 策略
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本

-- 1. 删除旧视图
DROP VIEW IF EXISTS user_data_stats;

-- 2. 重新创建视图（添加 security_invoker 选项）
CREATE OR REPLACE VIEW user_data_stats
WITH (security_invoker = true)
AS
SELECT
  user_id,
  COUNT(*) as total_records,
  MAX(updated_at) as last_updated,
  SUM(pg_column_size(data)) as total_size_bytes
FROM user_data
GROUP BY user_id;

-- 3. 启用视图的 RLS
ALTER VIEW user_data_stats SET (security_invoker = true);

-- 4. 授予权限（只允许认证用户访问）
GRANT SELECT ON user_data_stats TO authenticated;

-- 5. 验证 RLS 是否生效
-- 执行以下查询，应该只能看到当前用户的数据
-- SELECT * FROM user_data_stats;

-- 完成！
-- 现在 user_data_stats 视图会继承 user_data 表的 RLS 策略
-- 用户只能看到自己的统计数据

