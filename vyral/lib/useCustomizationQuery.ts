import { useSupabase } from "@/lib/supabase";
import { ThemeId } from "@/theme/tokens";
import { useQuery } from "@tanstack/react-query";

type CustomizationRow = {
  id: string;
  theme: ThemeId | null;
  avatar_url: string | null;
};

export const customizationQueryKey = (userId?: string) => ["customizations", userId];

export const useCustomizationQuery = () => {
  const { client, session } = useSupabase();

  return useQuery<CustomizationRow | null>({
    queryKey: customizationQueryKey(session?.user.id),
    enabled: Boolean(session?.user.id),
    queryFn: async () => {
      const { data, error } = await client
        .from("customizations")
        .select("id, theme, avatar_url")
        .eq("user_id", session!.user.id)
        .maybeSingle();

      if (error) throw error;
      return data as CustomizationRow | null;
    }
  });
};
