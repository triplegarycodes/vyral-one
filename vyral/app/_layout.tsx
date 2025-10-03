import { Stack, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { SupabaseProvider, useSupabase } from "@/lib/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useUserBootstrap } from "@/lib/useUserBootstrap";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

const RootProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  useUserBootstrap();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

const RootLayoutInner: React.FC = () => {
  const { loading } = useSupabase();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [loading]);

  return (
    <RootProviders>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade"
        }}
      />
    </RootProviders>
  );
};

const RootLayout: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SupabaseProvider>
        <RootLayoutInner />
      </SupabaseProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
