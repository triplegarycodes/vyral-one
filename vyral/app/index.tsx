import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { ModuleCard } from '@/components/ModuleCard';
import { palette } from '@/theme/tokens';
import { useAuth } from '@/context/AuthContext';

// To add a new module, drop a folder under /modules/<Name> with hooks/components,
// then add a route in /app/(modules)/<slug>.tsx and register metadata in this list.
const modules = [
  { key: 'board', title: 'Board', description: 'Strategize missions and goals', accent: palette.accents.board },
  { key: 'lyfe', title: 'Lyfe', description: 'Financial literacy quests', accent: palette.accents.lyfe },
  { key: 'kor', title: 'Kor', description: 'Collaborative hub for crews', accent: palette.accents.kor },
  { key: 'zone', title: 'Zone', description: 'Social lounge & chat', accent: palette.accents.zone },
  { key: 'shop', title: 'Shop', description: 'Unlock items and boosts', accent: palette.accents.shop },
  { key: 'skrybe', title: 'Skrybe', description: 'Creative writing lab', accent: palette.accents.skrybe },
  { key: 'stryke', title: 'Stryke', description: 'Choice-driven life sim', accent: palette.accents.stryke },
  { key: 'tree', title: 'Tree', description: 'Growth visualization', accent: palette.accents.tree },
  { key: 'vyra', title: 'Vyra', description: 'Personal profile vault', accent: palette.accents.vyra }
];

const HomeScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <GradientBackground>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isLocked = !user && item.key !== 'board';
          return (
            <ModuleCard
              title={item.title}
              description={item.description}
              accent={item.accent}
              locked={isLocked}
              onPress={() => router.push(`/(modules)/${item.key}`)}
            />
          );
        }}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 16,
    paddingBottom: 48
  }
});

export default HomeScreen;
