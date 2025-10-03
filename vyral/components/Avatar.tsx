import React from "react";
import { Image, ImageProps, View } from "react-native";
import { colors } from "@/theme/tokens";

interface AvatarProps extends Omit<ImageProps, "source"> {
  uri?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 72, style, ...rest }) => {
  return (
    <View
      style={{
        width: size + 12,
        height: size + 12,
        borderRadius: (size + 12) / 2,
        padding: 6,
        backgroundColor: "rgba(0, 247, 255, 0.15)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.neon.blue,
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
