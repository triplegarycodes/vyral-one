import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold
} from "@expo-google-fonts/space-grotesk";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { defaultThemeId, themeDefinitions, ThemeDefinition } from "@/theme/tokens";
import { useUserStore } from "@/store/useUserStore";
import { useCustomizationQuery } from "@/lib/useCustomizationQuery";
import { useSupabase } from "@/lib/supabase";

const ThemeContext = createContext<ThemeDefinition>(themeDefinitions[defaultThemeId]);

export const useThemeTokens = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_600SemiBold
  });
  const { session } = useSupabase();
  const { data: customization } = useCustomizationQuery();
  const themeId = useUserStore((state) => state.theme);
  const setTheme = useUserStore((state) => state.setTheme);
  const updateAvatar = useUserStore((state) => state.updateAvatar);

  useEffect(() => {
    if (!session) {
      setTheme(defaultThemeId);
      return;
    }

    if (customization === undefined) {
      return;
    }

    if (customization === null) {
      setTheme(defaultThemeId);
      return;
    }

    setTheme(customization.theme ?? defaultThemeId);
    updateAvatar(customization.avatar_url ?? null);
  }, [customization, session, setTheme, updateAvatar]);

  const theme = useMemo(() => themeDefinitions[themeId] ?? themeDefinitions[defaultThemeId], [themeId]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <LinearGradient colors={[theme.colors.background.start, theme.colors.background.end]} style={{ flex: 1 }}>
        <BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
          {children}
        </BlurView>
      </LinearGradient>
    </ThemeContext.Provider>
  );
};
