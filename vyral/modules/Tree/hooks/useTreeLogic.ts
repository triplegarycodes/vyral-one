import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTreeLogic(userId?: string) {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('users').select('xp, streak').eq('id', userId).single();
      if (active && data) {
        setXp(data.xp ?? 0);
        setStreak(data.streak ?? 0);
      }
    };
    load().catch((error) => console.warn('[tree] failed to load profile', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { xp, streak };
}
