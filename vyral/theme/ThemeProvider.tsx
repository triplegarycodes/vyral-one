import React, { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold
} from "@expo-google-fonts/space-grotesk";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View } from "react-native";
import { colors } from "@/theme/tokens";
import { BlurView } from "expo-blur";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_600SemiBold
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <LinearGradient colors={[colors.background.start, colors.background.end]} style={{ flex: 1 }}>
      <BlurView intensity={15} tint="dark" style={{ flex: 1 }}>
        {children}
      </BlurView>
    </LinearGradient>
  );
};
