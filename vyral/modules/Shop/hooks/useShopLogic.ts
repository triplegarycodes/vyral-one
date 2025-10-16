import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ShopItem = { id: string; item_key: string; quantity: number };

export function useShopLogic(userId?: string) {
  const [items, setItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('inventory').select('id, item_key, quantity').eq('user_id', userId);
      if (active && data) setItems(data as ShopItem[]);
    };
    load().catch((error) => console.warn('[shop] failed to load inventory', error));
    return () => {
      active = false;
    };
  }, [userId]);

  return { items };
}
