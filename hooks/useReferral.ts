import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ReferralReward {
  id: string;
  reward_type: string;
  reward_id: string;
  claimed: boolean;
  created_at: string;
}

export const useReferral = () => {
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralCount, setReferralCount] = useState<number>(0);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // 未登录用户使用本地生成的邀请码
        const localCode = localStorage.getItem('local_referral_code');
        if (localCode) {
          setReferralCode(localCode);
        } else {
          const newCode = generateReferralCode();
          localStorage.setItem('local_referral_code', newCode);
          setReferralCode(newCode);
        }
        setIsLoading(false);
        return;
      }

      // 获取或生成邀请码
      const { data: profile } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', user.id)
        .single();

      if (profile?.referral_code) {
        setReferralCode(profile.referral_code);
      } else {
        // 生成新的邀请码
        const newCode = generateReferralCode();
        const { error } = await supabase
          .from('profiles')
          .update({ referral_code: newCode })
          .eq('id', user.id);

        if (!error) {
          setReferralCode(newCode);
        } else {
          // 如果更新失败，使用本地生成的邀请码
          const localCode = localStorage.getItem('local_referral_code') || generateReferralCode();
          localStorage.setItem('local_referral_code', localCode);
          setReferralCode(localCode);
        }
      }

      // 获取邀请数量
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);

      setReferralCount(count || 0);

      // 获取奖励
      const { data: rewardsData } = await supabase
        .from('referral_rewards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setRewards(rewardsData || []);
    } catch (error) {
      console.error('加载邀请数据失败:', error);
      // 出错时使用本地邀请码
      const localCode = localStorage.getItem('local_referral_code');
      if (localCode) {
        setReferralCode(localCode);
      } else {
        const newCode = generateReferralCode();
        localStorage.setItem('local_referral_code', newCode);
        setReferralCode(newCode);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateReferralCode = (): string => {
    // 生成 6 位大写字母和数字的邀请码
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const getReferralLink = (): string => {
    return `https://tidefocus.app?ref=${referralCode}`;
  };

  const copyReferralLink = async (): Promise<boolean> => {
    try {
      const link = getReferralLink();
      await navigator.clipboard.writeText(link);
      return true;
    } catch (error) {
      console.error('复制失败:', error);
      return false;
    }
  };

  const claimReward = async (rewardId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('referral_rewards')
        .update({ claimed: true })
        .eq('id', rewardId);

      if (!error) {
        await loadReferralData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('领取奖励失败:', error);
      return false;
    }
  };

  return {
    referralCode,
    referralCount,
    rewards,
    isLoading,
    getReferralLink,
    copyReferralLink,
    claimReward,
    refresh: loadReferralData
  };
};

