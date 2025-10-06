import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { useThemeTokens } from "@/theme/ThemeProvider";

const levels = ["vision", "growth", "harvest"] as const;

type LevelKey = (typeof levels)[number];

const TreeScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const { moduleAccents } = useThemeTokens();

  const goalsQuery = useQuery({
    queryKey: ["tree-goals", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("tasks")
        .select("id, title, status, created_at")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to cultivate your Tree goals.
        </Text>
      </View>
    );
  }

  const nodesByLevel: Record<LevelKey, typeof goalsQuery.data> = {
    vision: goalsQuery.data?.filter((goal) => goal.status === "todo") ?? [],
    growth: goalsQuery.data?.filter((goal) => goal.status === "doing") ?? [],
    harvest: goalsQuery.data?.filter((goal) => goal.status === "done") ?? []
  };

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 140 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Grow your Vyral Tree
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Visualize goals branching from intention to impact.
      </Text>
      <View className="mt-10" style={{ rowGap: 32 }}>
        {levels.map((level) => (
          <View key={level}>
            <Text className="mb-4 text-sm uppercase text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
              {level}
            </Text>
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
              {nodesByLevel[level].map((node) => (
                <View key={node.id} style={{ width: 160, marginHorizontal: 8, marginBottom: 16 }}>
                  <Card accentColor={moduleAccents.tree} className="p-4">
                    <Text className="text-sm text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                      {node.title}
                    </Text>
                    <Text className="mt-2 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
                      {new Date(node.created_at).toLocaleDateString()}
                    </Text>
                  </Card>
                </View>
              ))}
              {nodesByLevel[level].length === 0 ? (
                <View style={{ width: 160, marginHorizontal: 8, marginBottom: 16 }}>
                  <Card accentColor={moduleAccents.tree} className="items-center justify-center p-4 border-dashed border-white/20">
                    <Text className="text-center text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
                      Plant a new goal on the Board.
                    </Text>
                  </Card>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TreeScreen;
