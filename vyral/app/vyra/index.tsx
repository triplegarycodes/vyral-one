import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { moduleAccents } from "@/theme/tokens";
import { Avatar } from "@/components/Avatar";

const themeOptions = ["nebula", "cyber", "aurora", "default"];

const VyraScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [theme, setTheme] = useState("default");

  const customizationQuery = useQuery({
    queryKey: ["customizations", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("customizations")
        .select("id, theme, avatar_url")
        .eq("user_id", session!.user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  useEffect(() => {
    if (customizationQuery.data) {
      setAvatarUrl(customizationQuery.data.avatar_url ?? "");
      setTheme(customizationQuery.data.theme ?? "default");
    }
  }, [customizationQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("Login required");
      const { error } = await client
        .from("customizations")
        .upsert({ user_id: session.user.id, avatar_url: avatarUrl || null, theme })
        .select();
      if (error) throw error;
    },
    onSuccess: async () => {
      Alert.alert("Vyra updated", "Customization saved.");
      await queryClient.invalidateQueries({ queryKey: ["customizations", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to save", error.message)
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
        <View className="w-full flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
          {themeOptions.map((option) => (
            <View key={option} style={{ width: "50%", paddingHorizontal: 8, marginBottom: 12 }}>
              <Button
                label={option === "default" ? "Default" : option}
                onPress={() => setTheme(option)}
                accentColor={option === theme ? moduleAccents.vyra : "rgba(255,255,255,0.3)"}
                variant={option === theme ? "primary" : "secondary"}
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
