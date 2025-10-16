import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type KorChannel = { id: string; title: string; online_count: number };

export function useKorLogic() {
  const [channels, setChannels] = useState<KorChannel[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data } = await supabase.from('messages').select('channel').limit(5);
      if (!data) return;
      const normalized = data.reduce<Record<string, KorChannel>>((acc, item) => {
        const key = item.channel as string;
        if (!acc[key]) {
          acc[key] = { id: key, title: key, online_count: 1 };
        } else {
          acc[key].online_count += 1;
        }
        return acc;
      }, {});
      if (active) {
        setChannels(Object.values(normalized));
      }
    };

    load().catch((error) => console.warn('[kor] failed to load channels', error));

    return () => {
      active = false;
    };
  }, []);

  return { channels };
}
