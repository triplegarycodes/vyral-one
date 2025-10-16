import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type VyraProfile = { username: string; bio?: string };

export function useVyraLogic(userId?: string) {
  const [profile, setProfile] = useState<VyraProfile>({ username: 'Guest', bio: 'Sign in to customize your profile.' });

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('users').select('username, bio').eq('id', userId).maybeSingle();
      if (active && data) {
        setProfile({ username: data.username, bio: (data as Record<string, any>).bio ?? undefined });
      }
    };
    load().catch((error) => console.warn('[vyra] failed to load profile', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { profile };
}
