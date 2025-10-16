import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ZoneMessage = { id: string; sender_id: string | null; body: string };

export function useZoneLogic() {
  const [messages, setMessages] = useState<ZoneMessage[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from('messages')
        .select('id, sender_id, body')
        .order('created_at', { ascending: false })
        .limit(6);
      if (active && data) setMessages(data as ZoneMessage[]);
    };

    load().catch((error) => console.warn('[zone] failed to load messages', error));

    return () => {
      active = false;
    };
  }, []);

  return { messages };
}
