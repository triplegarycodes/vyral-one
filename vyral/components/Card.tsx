import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { colors } from "@/theme/tokens";
import { clsx } from "clsx";

interface CardProps extends ViewProps {
  accentColor?: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  accentColor = colors.neon.blue,
  className,
  style,
  ...rest
}) => (
  <View
    {...rest}
    className={clsx("rounded-glass border border-white/10 bg-white/5", className)}
    style={[
      style,
      {
        shadowColor: accentColor,
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
