import React from "react";
import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";
import { Card } from "@/components/Card";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { useUserStore } from "@/store/useUserStore";

const StrykeScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const profile = useUserStore((state) => state.profile);
  const queryClient = useQueryClient();
  const { moduleAccents } = useThemeTokens();

  const { data: challenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await client.from("challenges").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const { data: streak } = useQuery({
    queryKey: ["streak", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("streaks")
        .select("id, count, last_checked")
        .eq("user_id", session!.user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const joinMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!session) throw new Error("No session");
      const { error } = await client
        .from("streaks")
        .upsert({ user_id: session.user.id, count: (streak?.count ?? 0) + 1 })
        .select();
      if (error) throw error;
      await client
        .from("posts")
        .insert({ user_id: session.user.id, content: `Joined challenge ${challengeId}` });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["streak", session?.user.id] });
      Alert.alert("Streak boosted", "You joined the mission. Stay consistent!");
    },
    onError: (error) => {
      Alert.alert("Action failed", error.message);
    }
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to blaze your Stryke challenges.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 120 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Ignite your streak
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        {profile?.username ?? "You"} • Streak {streak?.count ?? 0}
      </Text>
      <View className="mt-8" style={{ rowGap: 16 }}>
        {challenges?.map((challenge) => (
          <Card key={challenge.id} accentColor={moduleAccents.stryke} className="p-4">
            <Text className="text-2xl text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              {challenge.title}
            </Text>
            <Text className="mt-2 text-sm text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
              {challenge.description}
            </Text>
            <Text className="mt-2 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
              XP reward: {challenge.xp_reward}
            </Text>
            <Pressable
              onPress={() => joinMutation.mutate(challenge.id)}
              className="mt-4 self-start rounded-full border border-white/20 px-4 py-2"
            >
              <Text className="text-sm text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
                {joinMutation.isPending ? "Joining..." : "Join challenge"}
              </Text>
            </Pressable>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default StrykeScreen;
