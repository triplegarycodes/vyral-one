import { useEffect } from "react";
import { useSupabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";
import { defaultThemeId, ThemeId } from "@/theme/tokens";

export const useUserBootstrap = (): void => {
  const { session, client } = useSupabase();
  const setProfile = useUserStore((state) => state.setProfile);
  const setTheme = useUserStore((state) => state.setTheme);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      setTheme(defaultThemeId);
      return;
    }

    let isMounted = true;

    const hydrateProfile = async () => {
      const [{ data: profile, error: profileError }, { data: customization, error: customizationError }] =
        await Promise.all([
          client
            .from("users")
            .select("id, username, email, avatar_url, xp, points")
            .eq("id", session.user.id)
            .single(),
          client
            .from("customizations")
            .select("theme, avatar_url")
            .eq("user_id", session.user.id)
            .maybeSingle()
        ]);

      if (!isMounted) return;

      if (profileError) {
        console.warn("Unable to hydrate profile", profileError.message);
        setProfile(null);
        return;
      }

      if (customizationError) {
        console.warn("Unable to hydrate customization", customizationError.message);
      }

      const theme = (customization?.theme ?? defaultThemeId) as ThemeId;
      setProfile({
        ...profile,
        avatar_url: customization?.avatar_url ?? profile?.avatar_url ?? null,
        theme
      });
      setTheme(theme);
    };

    void hydrateProfile();

    return () => {
      isMounted = false;
    };
  }, [client, session, setProfile, setTheme]);
};
