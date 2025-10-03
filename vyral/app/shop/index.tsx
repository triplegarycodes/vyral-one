import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { moduleAccents } from "@/theme/tokens";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const shopItems = [
  { id: "nebula", title: "Nebula Trail", description: "Animated star trail theme", cost: 400 },
  { id: "cyber", title: "Cyber Bloom", description: "Neon petals swirl aura", cost: 250 },
  { id: "aurora", title: "Aurora Drift", description: "Dynamic teal gradient", cost: 150 }
];

const ShopScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();

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

  const purchaseMutation = useMutation({
    mutationFn: async (theme: string) => {
      if (!session) throw new Error("Login required");
      const { error } = await client
        .from("customizations")
        .upsert({ user_id: session.user.id, theme })
        .select();
      if (error) throw error;
    },
    onSuccess: async () => {
      Alert.alert("Unlocked!", "Your new vibe is active in Vyra.");
      await queryClient.invalidateQueries({ queryKey: ["customizations", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to purchase", error.message)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to access the Vyral shop.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 140 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Stock your arsenal
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Spend points to unlock neon cosmetics.
      </Text>
      <View className="mt-8" style={{ rowGap: 16 }}>
        {shopItems.map((item) => {
          const isActive = customizationQuery.data?.theme === item.id;
          return (
            <Card key={item.id} accentColor={moduleAccents.shop} className="p-4">
              <Text className="text-xl text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                {item.title}
              </Text>
              <Text className="mt-2 text-sm text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
                {item.description}
              </Text>
              <Text className="mt-3 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
                {item.cost} pts
              </Text>
              <Button
                label={isActive ? "Equipped" : "Unlock"}
                onPress={() => purchaseMutation.mutate(item.id)}
                accentColor={moduleAccents.shop}
                disabled={isActive || purchaseMutation.isPending}
              />
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ShopScreen;
