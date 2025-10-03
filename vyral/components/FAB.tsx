import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/tokens";

interface FABProps {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const FAB: React.FC<FABProps> = ({ label, onPress, icon, accentColor = colors.neon.purple }) => {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-8 right-6 flex-row items-center overflow-hidden rounded-full"
      style={{ shadowColor: accentColor, shadowOpacity: 0.45, shadowRadius: 20, elevation: 8 }}
    >
      <LinearGradient
        colors={[accentColor, colors.neon.blue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingVertical: 14, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        {icon}
        <Text className="text-base font-semibold text-black" style={{ fontFamily: "Inter_600SemiBold" }}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
