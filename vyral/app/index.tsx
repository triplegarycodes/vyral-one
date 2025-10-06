import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { useSupabase } from "@/lib/supabase";

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const { session } = useSupabase();
  const { colors } = useThemeTokens();

  useEffect(() => {
    if (session) {
      router.replace("/kor");
    }
  }, [router, session]);

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-12 items-center">
        <Image
          source={{ uri: "https://i.imgur.com/8Km9tLL.png" }}
          style={{ width: 120, height: 120, marginBottom: 24, borderRadius: 60 }}
        />
        <Text className="text-4xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
          Vyral
        </Text>
        <Text
          className="mt-4 text-center text-lg text-white/70"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Enter the V’erse and amplify your flow.
        </Text>
      </View>
      <View className="w-full" style={{ rowGap: 16 }}>
        <Button
          label="Login"
          onPress={() => router.push("/auth/login")}
          accentColor={colors.neon.primary}
        />
        <Button
          label="Create Account"
          onPress={() => router.push("/auth/signup")}
          accentColor={colors.neon.secondary}
        />
      </View>
      <Link
        href="/auth/login"
        className="mt-10 text-sm text-white/60"
        style={{ fontFamily: "Inter_400Regular" }}
      >
        Continue with existing session
      </Link>
    </View>
  );
};

export default OnboardingScreen;
