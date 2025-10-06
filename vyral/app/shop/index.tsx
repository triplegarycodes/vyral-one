import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useSupabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomizationQuery, customizationQueryKey } from "@/lib/useCustomizationQuery";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { ThemeId } from "@/theme/tokens";
import { useUserStore } from "@/store/useUserStore";

const shopItems: { id: ThemeId; title: string; description: string; cost: number }[] = [
  { id: "nebula", title: "Nebula Trail", description: "Animated star trail theme", cost: 400 },
  { id: "cyber", title: "Cyber Bloom", description: "Neon petals swirl aura", cost: 250 },
  { id: "aurora", title: "Aurora Drift", description: "Dynamic teal gradient", cost: 150 }
];

const ShopScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const { moduleAccents } = useThemeTokens();
  const customizationQuery = useCustomizationQuery();
  const profile = useUserStore((state) => state.profile);
  const updatePoints = useUserStore((state) => state.updatePoints);
  const setTheme = useUserStore((state) => state.setTheme);

  const balance = profile?.points ?? 0;
  const activeTheme = customizationQuery.data?.theme ?? profile?.theme ?? "default";

  const purchaseMutation = useMutation({
    mutationFn: async (item: (typeof shopItems)[number]) => {
      if (!session) throw new Error("Login required");
      const currentBalance = profile?.points ?? 0;
      if (currentBalance < item.cost) {
        throw new Error("Not enough points to unlock this theme");
      }

      const { data: updatedUser, error: pointsError } = await client
        .from("users")
        .update({ points: currentBalance - item.cost })
        .eq("id", session.user.id)
        .select("points")
        .single();

      if (pointsError) throw pointsError;

      const { error: customizationError } = await client
        .from("customizations")
        .upsert({ user_id: session.user.id, theme: item.id })
        .select();

      if (customizationError) throw customizationError;

      return { points: updatedUser.points, theme: item.id };
    },
    onSuccess: async (result, item) => {
      updatePoints(result.points ?? balance - item.cost);
      setTheme(item.id);
      Alert.alert("Unlocked!", "Your new vibe is active in Vyra.");
      await queryClient.invalidateQueries({ queryKey: customizationQueryKey(session?.user.id) });
    },
    onError: (error: Error) => Alert.alert("Unable to purchase", error.message)
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
      <Text className="mt-4 text-sm text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
        Balance: {balance} pts
      </Text>
      <View className="mt-8" style={{ rowGap: 16 }}>
        {shopItems.map((item) => {
          const isActive = activeTheme === item.id;
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
                label={isActive ? "Equipped" : `Unlock (${item.cost} pts)`}
                onPress={() => purchaseMutation.mutate(item)}
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
