import React from "react";
import Svg, { Circle } from "react-native-svg";
import { View, Text } from "react-native";
import { useThemeTokens } from "@/theme/ThemeProvider";

interface ProgressProps {
  size?: number;
  progress: number; // 0 - 1
  label?: string;
  accentColor?: string;
}

export const ProgressRing: React.FC<ProgressProps> = ({
  size = 160,
  progress,
  label,
  accentColor
}) => {
  const { colors } = useThemeTokens();
  const resolvedAccent = accentColor ?? colors.neon.primary;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(255,255,255,0.08)"
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <Circle
          stroke={resolvedAccent}
          fill="transparent"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </Svg>
      <View className="absolute items-center">
        <Text
          className="text-3xl text-white"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          {Math.round(progress * 100)}%
        </Text>
        {label ? (
          <Text className="mt-2 text-sm text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
            {label}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
