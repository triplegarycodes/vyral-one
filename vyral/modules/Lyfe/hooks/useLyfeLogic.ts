import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type LyfeQuest = { id: string; title: string };

export function useLyfeLogic(userId?: string) {
  const [quests, setQuests] = useState<LyfeQuest[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('lessons').select('id, title').eq('module', 'lyfe').limit(5);
      if (active && data) setQuests(data as LyfeQuest[]);
    };
    load().catch((error) => console.warn('[lyfe] failed to load quests', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { quests };
}
