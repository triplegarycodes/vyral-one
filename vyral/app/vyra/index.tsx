import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { useCustomizationQuery, customizationQueryKey } from "@/lib/useCustomizationQuery";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { defaultThemeId, themeDefinitions, themeOptions, ThemeId } from "@/theme/tokens";
import { useUserStore } from "@/store/useUserStore";
import { LinearGradient } from "expo-linear-gradient";

const VyraScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const customizationQuery = useCustomizationQuery();
  const { moduleAccents } = useThemeTokens();
  const profile = useUserStore((state) => state.profile);
  const setTheme = useUserStore((state) => state.setTheme);
  const updateAvatar = useUserStore((state) => state.updateAvatar);

  const initialTheme = (profile?.theme ?? defaultThemeId) as ThemeId;
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [theme, setThemeSelection] = useState<ThemeId>(initialTheme);
  const originalThemeRef = useRef<ThemeId>(initialTheme);

  useEffect(() => {
    if (customizationQuery.data === undefined) return;
    const nextTheme = (customizationQuery.data?.theme ?? defaultThemeId) as ThemeId;
    const nextAvatar = customizationQuery.data?.avatar_url ?? profile?.avatar_url ?? "";
    originalThemeRef.current = nextTheme;
    setThemeSelection(nextTheme);
    setTheme(nextTheme);
    setAvatarUrl(nextAvatar);
  }, [customizationQuery.data, profile?.avatar_url, setTheme]);

  useEffect(() => {
    return () => {
      setTheme(originalThemeRef.current);
    };
  }, [setTheme]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("Login required");
      const payload = { user_id: session.user.id, avatar_url: avatarUrl || null, theme };
      const { error } = await client.from("customizations").upsert(payload).select();
      if (error) throw error;

      const { error: profileError } = await client
        .from("users")
        .update({ avatar_url: avatarUrl || null })
        .eq("id", session.user.id);
      if (profileError) throw profileError;

      return payload;
    },
    onSuccess: async (result) => {
      updateAvatar(result.avatar_url);
      setTheme(result.theme as ThemeId);
      originalThemeRef.current = result.theme as ThemeId;
      Alert.alert("Vyra updated", "Customization saved.");
      await queryClient.invalidateQueries({ queryKey: customizationQueryKey(session?.user.id) });
    },
    onError: (error: Error) => Alert.alert("Unable to save", error.message)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to tune your Vyra avatar.
        </Text>
      </View>
    );
  }

  const selectedTheme = themeDefinitions[theme] ?? themeDefinitions[defaultThemeId];

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 140 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Shape your Vyra
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Calibrate avatar and theme to mirror your energy.
      </Text>
      <Card accentColor={moduleAccents.vyra} className="mt-6 items-center p-6">
        <Avatar uri={avatarUrl} size={120} />
        <Input
          label="Avatar URL"
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          placeholder="https://..."
          autoCapitalize="none"
        />
        <Text className="mb-2 mt-4 self-start text-xs uppercase text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
          Theme
        </Text>
        <LinearGradient
          colors={[selectedTheme.colors.background.start, selectedTheme.colors.background.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: "100%", borderRadius: 18, padding: 16, marginBottom: 16 }}
        >
          <Text className="text-sm text-white/80" style={{ fontFamily: "Inter_600SemiBold" }}>
            {selectedTheme.label}
          </Text>
          <Text className="mt-2 text-xs text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
            {selectedTheme.description}
          </Text>
        </LinearGradient>
        <View className="w-full flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
          {themeOptions.map((option) => (
            <View key={option.id} style={{ width: "50%", paddingHorizontal: 8, marginBottom: 12 }}>
              <Button
                label={option.label}
                onPress={() => {
                  setThemeSelection(option.id);
                  setTheme(option.id);
                }}
                accentColor={option.id === theme ? moduleAccents.vyra : undefined}
                variant={option.id === theme ? "primary" : "secondary"}
              />
            </View>
          ))}
        </View>
        <Button
          className="mt-6"
          label={saveMutation.isPending ? "Saving..." : "Save changes"}
          onPress={() => saveMutation.mutate()}
          accentColor={moduleAccents.vyra}
        />
      </Card>
    </ScrollView>
  );
};

export default VyraScreen;
