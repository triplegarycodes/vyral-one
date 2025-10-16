import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useStrykeLogic(userId?: string) {
  const [scenario, setScenario] = useState('Choose how you respond to a surprise opportunity.');

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from('lessons')
        .select('content')
        .eq('module', 'stryke')
        .limit(1)
        .single();
      if (active && data?.content) setScenario(data.content as string);
    };
    load().catch((error) => console.warn('[stryke] failed to load scenario', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { scenario };
}
