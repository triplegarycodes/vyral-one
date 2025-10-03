import { useEffect } from "react";
import { useSupabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";

export const useUserBootstrap = (): void => {
  const { session, client } = useSupabase();
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }

    let isMounted = true;

    const hydrateProfile = async () => {
      const { data, error } = await client
        .from("users")
        .select("id, username, email, avatar_url, xp")
        .eq("id", session.user.id)
        .single();

      if (isMounted && !error) {
        setProfile(data ?? null);
      }
    };

    void hydrateProfile();

    return () => {
      isMounted = false;
    };
  }, [client, session, setProfile]);
};
