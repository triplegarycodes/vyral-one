import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { VyralGoal } from '@/lib/models';

export function useGoals(userId?: string) {
  const [goals, setGoals] = useState<VyralGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setGoals([]);
      setLoading(false);
      return;
    }

    let active = true;

    const hydrate = async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('id, user_id, title, description, status, progress, reward_points')
        .eq('user_id', userId);

      if (error) {
        console.warn('[goals] fetch error', error);
        if (active) setLoading(false);
        return;
      }

      if (active && data) {
        setGoals(
          data.map((goal) => ({
            id: goal.id,
            userId: goal.user_id as string,
            title: goal.title,
            description: goal.description,
            status: (goal.status as VyralGoal['status']) ?? 'pending',
            progress: goal.progress ?? 0,
            rewardPoints: goal.reward_points ?? 0
          }))
        );
        setLoading(false);
      }
    };

    hydrate().catch((error) => console.warn('[goals] hydration failure', error));

    const channel = supabase
      .channel(`goals:user:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${userId}` },
        () => hydrate().catch((error) => console.warn('[goals] realtime refresh error', error))
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { goals, loading };
}
