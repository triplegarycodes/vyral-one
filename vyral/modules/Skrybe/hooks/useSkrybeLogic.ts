import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSkrybeLogic(userId?: string) {
  const [prompt, setPrompt] = useState('Compose your origin story.');

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from('lessons')
        .select('content')
        .eq('module', 'skrybe')
        .limit(1)
        .single();
      if (active && data?.content) setPrompt(data.content as string);
    };
    load().catch((error) => console.warn('[skrybe] failed to load prompt', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { prompt };
}
