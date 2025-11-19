import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  });

  // 检查 Supabase 是否已配置
  const configured = isSupabaseConfigured();

  // 初始化：获取当前 session
  useEffect(() => {
    if (!configured) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        error: error as AuthError | null
      });
    });

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        });
      }
    );

    return () => subscription.unsubscribe();
  }, [configured]);

  // 注册
  const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
    if (!configured) {
      throw new Error('Supabase is not configured');
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split('@')[0]
        }
      }
    });

    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error }));
      throw error;
    }

    setAuthState({
      user: data.user,
      session: data.session,
      loading: false,
      error: null
    });

    return data;
  }, [configured]);

  // 登录
  const signIn = useCallback(async (email: string, password: string) => {
    if (!configured) {
      throw new Error('Supabase is not configured');
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error }));
      throw error;
    }

    setAuthState({
      user: data.user,
      session: data.session,
      loading: false,
      error: null
    });

    return data;
  }, [configured]);

  // 登出
  const signOut = useCallback(async () => {
    if (!configured) {
      throw new Error('Supabase is not configured');
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error }));
      throw error;
    }

    setAuthState({
      user: null,
      session: null,
      loading: false,
      error: null
    });
  }, [configured]);

  // 重置密码（发送邮件）
  const resetPassword = useCallback(async (email: string) => {
    if (!configured) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      throw error;
    }
  }, [configured]);

  // 更新密码
  const updatePassword = useCallback(async (newPassword: string) => {
    if (!configured) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      throw error;
    }
  }, [configured]);

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    configured,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword
  };
};

