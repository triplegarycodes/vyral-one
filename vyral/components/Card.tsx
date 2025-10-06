import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { clsx } from "clsx";

interface CardProps extends ViewProps {
  accentColor?: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  accentColor,
  className,
  style,
  ...rest
}) => {
  const { colors } = useThemeTokens();
  const resolvedAccent = accentColor ?? colors.neon.primary;

  return (
    <View
      {...rest}
      className={clsx("rounded-glass border border-white/10 bg-white/5", className)}
      style={[
        style,
        {
          shadowColor: resolvedAccent,
          shadowOpacity: 0.3,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 0 },
          backgroundColor: colors.glass
        }
      ]}
    >
      {children}
    </View>
  );
};
