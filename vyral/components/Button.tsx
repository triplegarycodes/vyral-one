import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, timing } from "@/theme/tokens";
import { clsx } from "clsx";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  accentColor?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  pressableProps?: Omit<PressableProps, "onPress">;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  accentColor = colors.neon.blue,
  disabled,
  icon,
  className,
  pressableProps
}) => {
  const gradientColors =
    variant === "primary"
      ? [accentColor, colors.neon.purple]
      : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={clsx(
        "overflow-hidden rounded-glass",
        disabled ? "opacity-60" : "",
        className
      )}
      style={{
        shadowColor: accentColor,
        shadowOpacity: 0.45,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
        elevation: 5
      }}
      {...pressableProps}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon ? <View style={{ marginRight: 12 }}>{icon}</View> : null}
        <Text
          className={clsx(
            "text-center text-base font-semibold",
            variant === "primary" ? "text-black" : "text-white"
          )}
          style={{
            fontFamily: "Inter_600SemiBold",
            letterSpacing: 0.6,
            transitionDuration: `${timing.tap}ms`
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
