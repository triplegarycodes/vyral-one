import React from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";
import { useThemeTokens } from "@/theme/ThemeProvider";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...rest }) => {
  const { colors } = useThemeTokens();

  return (
    <View className="mb-4">
      {label ? (
        <Text
          className="mb-2 text-sm text-white/80"
          style={{ fontFamily: "Inter_600SemiBold", letterSpacing: 0.4 }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          backgroundColor: colors.glass,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          paddingHorizontal: 16,
          paddingVertical: 14
        }}
      >
        <TextInput
          placeholderTextColor={colors.text.secondary}
          className="text-base text-white"
          style={[{ fontFamily: "Inter_400Regular", color: colors.text.primary }, style]}
          {...rest}
        />
      </View>
      {error ? (
        <Text className="mt-1 text-xs text-red-400" style={{ fontFamily: "Inter_400Regular" }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};
