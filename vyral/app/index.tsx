import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { router } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { ModuleCard, type CinematicModule } from '@/components/ModuleCard';
import { palette } from '@/theme/tokens';
import { NeoCompanion } from '@/components/NeoCompanion';
import { useAuth } from '@/context/AuthContext';

const AnimatedScrollView = Animated.ScrollView;

const moduleBlueprint: Omit<CinematicModule, 'locked'>[] = [
  {
    key: 'kor',
    title: 'Kor',
    subtitle: 'Squad Sync',
    description: 'Crew coordination decks, live task boards, and shared wins pulsing in real time.',
    accent: palette.accents.kor,
    accentSecondary: '#A896FF',
    icon: 'people'
  },
  {
    key: 'stryke',
    title: 'Stryke',
    subtitle: 'Scenario Reactor',
    description: 'Interactive life missions with CSV-powered plot branches and consequence tracking.',
    accent: palette.accents.stryke,
    accentSecondary: '#FF8CEB',
    icon: 'flash'
  },
  {
    key: 'skrybe',
    title: 'Skrybe',
    subtitle: 'Story Forge',
    description: 'AI narration ally remixing prompts, lyrics, and lore with cinematic pacing.',
    accent: palette.accents.skrybe,
    accentSecondary: '#C7B3FF',
    icon: 'create'
  },
  {
    key: 'zone',
    title: 'Zone',
    subtitle: 'Signal Lounge',
    description: 'Immersive group chat arenas with particle reactions and vibe-based rooms.',
    accent: palette.accents.zone,
    accentSecondary: '#8DF5FF',
    icon: 'chatbubbles'
  },
  {
    key: 'lyfe',
    title: 'Lyfe',
    subtitle: 'Pathfinder',
    description: 'Life quests and decisions that remix your future skills, mentors, and rewards.',
    accent: palette.accents.lyfe,
    accentSecondary: '#9AFFF0',
    icon: 'planet'
  },
  {
    key: 'tree',
    title: 'Tree',
    subtitle: 'Growth Map',
    description: 'Dynamic holographic visualizer of streaks unlocking Shop drops and UI skins.',
    accent: palette.accents.tree,
    accentSecondary: '#A0FFD9',
    icon: 'leaf'
  },
  {
    key: 'board',
    title: 'Board',
    subtitle: 'Mission Control',
    description: 'Goal tracker with cinematic check-ins, progress bursts, and squad accountability.',
    accent: palette.accents.board,
    accentSecondary: '#C5BAFF',
    icon: 'grid'
  },
  {
    key: 'shop',
    title: 'Shop',
    subtitle: 'Reward Vault',
    description: 'Spend earned energy on cosmetics, power boosts, and limited neon skins.',
    accent: palette.accents.shop,
    accentSecondary: '#FFB3F6',
    icon: 'bag-handle'
  },
  {
    key: 'vyra',
    title: 'Vyra',
    subtitle: 'Mood Mentor',
    description: 'AI pulse check with journaling, emotional trendlines, and voice-guided resets.',
    accent: palette.accents.vyra,
    accentSecondary: '#B8F1FF',
    icon: 'moon'
  }
];

const neoScript: Record<string, string> = {
  kor: 'Kor is online. Your crew timeline is glowing—ready to sync missions?',
  stryke: 'Stryke awaits. Each decision branches your legend—choose the pulse you ride.',
  skrybe: 'Skrybe primed. Drop a concept and I\'ll weave the cyber-magic with you.',
  zone: 'Zone is humming. Slide through rooms and let the squad vibe ripple.',
  lyfe: 'Lyfe portal unlocked. Chart a life-path quest and snag bonus streak energy.',
  tree: 'Tree growing steady. Your progress blooms into new shop drops.',
  board: 'Board engaged. Track today\'s moves and watch goals spark to life.',
  shop: 'Shop lights are hot. Trade your energy for neon threads and power mods.',
  vyra: 'Vyra listening. Let\'s recalibrate your mood signal together.'
};

const chunkIntoPages = (modules: CinematicModule[]) => {
  const pages: (CinematicModule | null)[][] = [];
  for (let i = 0; i < modules.length; i += 4) {
    const slice = modules.slice(i, i + 4);
    while (slice.length < 4) {
      slice.push(null);
    }
    pages.push(slice);
  }
  return pages;
};

const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const { user } = useAuth();
  const [activePage, setActivePage] = useState(0);
  const pageRef = useRef(0);

  const modules = useMemo(() => {
    return moduleBlueprint.map((module) => ({
      ...module,
      locked: !user && module.key !== 'board'
    }));
  }, [user]);

  const pages = useMemo(() => chunkIntoPages(modules), [modules]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      if (index !== pageRef.current) {
        pageRef.current = index;
        runOnJS(setActivePage)(index);
      }
    }
  });

  const activeModule = useMemo(() => {
    const page = pages[activePage] ?? pages[0];
    const firstModule = page?.find((entry) => entry != null) ?? modules[0];
    return firstModule ?? modules[0];
  }, [activePage, modules, pages]);

  return (
    <GradientBackground parallaxOffset={activePage}>
      <AnimatedScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {pages.map((page, pageIndex) => (
          <View key={`page-${pageIndex}`} style={[styles.page, { width }]}
          >
            {page.map((module, itemIndex) => (
              <View key={module ? module.key : `placeholder-${itemIndex}`} style={styles.tileWrapper}>
                {module ? (
                  <ModuleCard
                    module={module}
                    scrollX={scrollX}
                    pageIndex={pageIndex}
                    itemIndex={itemIndex}
                    viewportWidth={width}
                    onPress={() => router.push(`/(modules)/${module.key}`)}
                  />
                ) : (
                  <View style={styles.placeholder} />
                )}
              </View>
            ))}
          </View>
        ))}
      </AnimatedScrollView>
      <NeoCompanion
        accent={activeModule.accent}
        accentSecondary={activeModule.accentSecondary}
        message={neoScript[activeModule.key]}
        moodIndex={activePage}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 12
  },
  tileWrapper: {
    width: '50%',
    padding: 8
  },
  placeholder: {
    flex: 1,
    borderRadius: 24,
    opacity: 0
  }
});

export default HomeScreen;
