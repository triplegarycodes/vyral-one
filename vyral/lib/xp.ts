import { SupabaseClient } from "@supabase/supabase-js";

import { useUserStore } from "@/store/useUserStore";

export const FOCUS_XP_PER_MINUTE = 5;
export const MINIMUM_FOCUS_XP = 5;

export const calculateFocusSessionXp = (durationSeconds: number): number => {
  if (durationSeconds <= 0) {
    return 0;
  }

  if (durationSeconds < 60) {
    return 0;
  }

  const minutes = Math.round(durationSeconds / 60);
  if (minutes <= 0) {
    return 0;
  }

  return Math.max(MINIMUM_FOCUS_XP, minutes * FOCUS_XP_PER_MINUTE);
};

export const awardXp = async (
  client: SupabaseClient,
  userId: string,
  xpToAdd: number
): Promise<number> => {
  if (xpToAdd <= 0) {
    return useUserStore.getState().profile?.xp ?? 0;
  }

  const { data: current, error: fetchError } = await client
    .from("users")
    .select("xp")
    .eq("id", userId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const currentXp = current?.xp ?? 0;
  const nextXp = currentXp + xpToAdd;

  const { data: updated, error: updateError } = await client
    .from("users")
    .update({ xp: nextXp })
    .eq("id", userId)
    .select("xp")
    .single();

  if (updateError) {
    throw updateError;
  }

  const resolvedXp = updated?.xp ?? nextXp;
  useUserStore.getState().updateXP(resolvedXp);

  return resolvedXp;
};
