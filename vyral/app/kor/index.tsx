import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { Avatar } from "@/components/Avatar";
import { ProgressRing } from "@/components/Progress";
import { colors, moduleAccents } from "@/theme/tokens";
import { Link } from "expo-router";
import { Card } from "@/components/Card";

const KorScreen: React.FC = () => {
  const profile = useUserStore((state) => state.profile);
  const xp = profile?.xp ?? 0;
  const level = Math.floor(xp / 1000) + 1;
  const progress = Math.min((xp % 1000) / 1000, 1);

  const modules = [
    { key: "stryke", title: "Stryke", subtitle: "Challenges & streaks" },
    { key: "skrybe", title: "Skrybe", subtitle: "AI infused journaling" },
    { key: "zone", title: "Zone", subtitle: "Flow focus timer" },
    { key: "lyfe", title: "Lyfe", subtitle: "Lifestyle rituals" },
    { key: "tree", title: "Tree", subtitle: "Goal map" },
    { key: "board", title: "Board", subtitle: "Productivity board" },
    { key: "shop", title: "Shop", subtitle: "Rewards" },
    { key: "vyra", title: "Vyra", subtitle: "Avatar & theme" }
  ] as const;

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 120 }}>
      <Text className="text-sm uppercase text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
        Kor nucleus
      </Text>
      <Text className="mt-1 text-4xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Hey {profile?.username ?? "Explorer"}
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Level {level} • {xp} XP
      </Text>
      <View className="mt-8 items-center">
        <ProgressRing progress={progress} label="Next level" accentColor={colors.neon.blue} />
        <View className="-mt-36">
          <Avatar uri={profile?.avatar_url ?? undefined} size={120} />
        </View>
      </View>
      <Text className="mt-12 text-lg text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
        Modules
      </Text>
      <View
        className="mt-4 flex flex-wrap flex-row justify-between"
        style={{ rowGap: 16, columnGap: 16 }}
      >
        {modules.map((module) => (
          <Link key={module.key} href={`/${module.key}`} asChild>
            <Pressable
              className="w-[48%]"
              style={{ shadowColor: moduleAccents[module.key], shadowOpacity: 0.3, shadowRadius: 12 }}
            >
              <Card accentColor={moduleAccents[module.key]} className="p-4">
                <Text className="text-xl text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                  {module.title}
                </Text>
                <Text className="mt-2 text-xs text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
                  {module.subtitle}
                </Text>
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default KorScreen;
