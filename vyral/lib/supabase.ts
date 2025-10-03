import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Session,
  SupabaseClient,
  createClient
} from "@supabase/supabase-js";
import Constants from "expo-constants";
import { AppStateStatus, AppState } from "react-native";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl ?? "";
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

type SupabaseContextValue = {
  client: SupabaseClient;
  session: Session | null;
  loading: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export const SupabaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
    });

    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === "active") {
        void supabase.auth.getSession().then(({ data }) => setSession(data.session));
      }
    };

    const appStateSub = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
      appStateSub.remove();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ client: supabase, session, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseContextValue => {
  const value = useContext(SupabaseContext);
  if (!value) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return value;
};
