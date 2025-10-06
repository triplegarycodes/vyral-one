import React from "react";
import { Image, ImageProps, View } from "react-native";
import { useThemeTokens } from "@/theme/ThemeProvider";

interface AvatarProps extends Omit<ImageProps, "source"> {
  uri?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 72, style, ...rest }) => {
  const { colors } = useThemeTokens();
  const accent = colors.neon.primary;

  return (
    <View
      style={{
        width: size + 12,
        height: size + 12,
        borderRadius: (size + 12) / 2,
        padding: 6,
        backgroundColor: `${accent}26`,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: accent,
        shadowOpacity: 0.4,
        shadowRadius: 16
      }}
    >
      <Image
        {...rest}
        source={{
          uri:
            uri ??
            "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=200&q=80"
        }}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: "rgba(255,255,255,0.25)",
            borderWidth: 2
          },
          style
        ]}
      />
    </View>
  );
};
