import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { palette } from '@/theme/tokens';
import {
  FEATURED_MODULES,
  LEARNING_TRACKS,
  LIVE_SIGNALS,
  QUICK_ACTIONS
} from '@/modules/moduleRegistry';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const heroBadges = [
  { label: 'Day 21 streak', color: '#22d3ee' },
  { label: 'Crew online: 12', color: '#f472b6' },
  { label: 'XP boost active', color: '#facc15' }
];

const Section = ({ title, caption, children, style }) => (
  <View style={[styles.section, style]}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
    </View>
    {children}
  </View>
);

const ModuleCard = ({ item, delay }) => {
  const translate = useRef(new Animated.Value(16)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translate, {
      toValue: 0,
      delay,
      damping: 14,
      mass: 0.7,
      stiffness: 120,
      useNativeDriver: true
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 320,
      delay,
      useNativeDriver: true
    }).start();
  }, [delay, opacity, translate]);

  return (
    <Animated.View style={[styles.moduleCard, { opacity, transform: [{ translateY: translate }] }]}>
      <Pressable
        onPress={() => router.push(item.route)}
        style={({ pressed }) => [styles.modulePressable, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={[item.accent, `${item.accent}55`, '#111827']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.moduleGradient}
        >
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleTitle}>{item.title}</Text>
            <View style={[styles.modulePill, { backgroundColor: `${item.accent}33` }]}> 
              <Text style={[styles.modulePillText, { color: item.accent }]}>Open</Text>
            </View>
          </View>
          <Text style={styles.moduleBlurb}>{item.blurb}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const QuickAction = ({ accent, emoji, route, title }) => (
  <Pressable
    onPress={() => router.push(route)}
    style={({ pressed }) => [styles.quickAction, { borderColor: `${accent}40` }, pressed && styles.pressed]}
  >
    <LinearGradient colors={[`${accent}33`, '#0f172a']} style={styles.quickActionGradient}>
      <Text style={[styles.quickActionEmoji, { textShadowColor: accent }]}>{emoji}</Text>
      <Text style={styles.quickActionTitle}>{title}</Text>
    </LinearGradient>
  </Pressable>
);

const LearningTrack = ({ title, progress, accent }) => (
  <View style={styles.trackCard}>
    <View style={styles.trackMeta}>
      <Text style={styles.trackTitle}>{title}</Text>
      <Text style={[styles.trackProgressText, { color: accent }]}>{Math.round(progress * 100)}% synced</Text>
    </View>
    <View style={styles.trackBar}>
      <View style={[styles.trackBarFill, { width: `${Math.round(progress * 100)}%`, backgroundColor: accent }]} />
    </View>
  </View>
);

const LiveSignal = ({ title, time, accent }) => (
  <View style={[styles.signalCard, { borderColor: `${accent}66` }]}> 
    <View style={[styles.signalDot, { backgroundColor: accent }]} />
    <View style={styles.signalCopy}>
      <Text style={styles.signalTitle}>{title}</Text>
      <Text style={[styles.signalTime, { color: accent }]}>{time}</Text>
    </View>
  </View>
);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 420,
        delay: 120,
        useNativeDriver: true
      }),
      Animated.spring(heroTranslate, {
        toValue: 0,
        damping: 16,
        stiffness: 120,
        mass: 0.8,
        useNativeDriver: true
      })
    ]).start();
  }, [heroOpacity, heroTranslate]);

  const heroBadgesMemo = useMemo(() => heroBadges, []);

  return (
    <AnimatedLinearGradient
      colors={['#020617', '#0f172a', '#1e1b4b']}
      style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 40 }]}
    >
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.hero, { opacity: heroOpacity, transform: [{ translateY: heroTranslate }] }]}>
          <LinearGradient colors={['#38bdf8', '#6366f1', '#111827']} style={styles.heroGradient}>
            <View style={styles.heroHeader}>
              <Text style={styles.heroEyebrow}>Vyral Collective</Text>
              <Text style={styles.heroTitle}>Your vibe is trending</Text>
              <Text style={styles.heroSubtitle}>Dial into social energy, level up skills, and keep your bag growing.</Text>
            </View>
            <View style={styles.heroBadges}>
              {heroBadgesMemo.map((badge) => (
                <View key={badge.label} style={[styles.heroBadge, { backgroundColor: `${badge.color}22`, borderColor: `${badge.color}66` }]}> 
                  <View style={[styles.heroBadgeDot, { backgroundColor: badge.color }]} />
                  <Text style={styles.heroBadgeText}>{badge.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        <Section title="Jump back in" caption="Keep your streaks glowing">
          <FlatList
            data={FEATURED_MODULES}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => <ModuleCard item={item} delay={index * 80} />}
            scrollEnabled={false}
          />
        </Section>

        <Section title="Quick plays" caption="Launch a mission in seconds">
          <View style={styles.quickRow}>
            {QUICK_ACTIONS.map((action) => (
              <QuickAction key={action.key} {...action} />
            ))}
          </View>
        </Section>

        <Section title="Skill sync" caption="You\'re halfway to new rewards">
          <View style={styles.trackColumn}>
            {LEARNING_TRACKS.map((track) => (
              <LearningTrack key={track.key} {...track} />
            ))}
          </View>
        </Section>

        <Section title="Live signals" caption="What\'s buzzing now">
          <View style={styles.signalColumn}>
            {LIVE_SIGNALS.map((signal) => (
              <LiveSignal key={signal.key} {...signal} />
            ))}
          </View>
        </Section>
      </Animated.ScrollView>
    </AnimatedLinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  scrollContent: {
    gap: 28
  },
  hero: {
    borderRadius: 28,
    overflow: 'hidden'
  },
  heroGradient: {
    padding: 24,
    gap: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#38bdf866'
  },
  heroHeader: {
    gap: 8
  },
  heroEyebrow: {
    color: '#e0f2fe',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '700'
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 20
  },
  heroBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 999
  },
  heroBadgeText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '600'
  },
  section: {
    gap: 16
  },
  sectionHeader: {
    gap: 6
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700'
  },
  sectionCaption: {
    color: '#94a3b8',
    fontSize: 14
  },
  moduleCard: {
    marginBottom: 16
  },
  modulePressable: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  moduleGradient: {
    padding: 20,
    gap: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1d4ed840'
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moduleTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  modulePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999
  },
  modulePillText: {
    fontSize: 12,
    fontWeight: '600'
  },
  moduleBlurb: {
    color: '#cbd5f5',
    fontSize: 14,
    lineHeight: 20
  },
  pressed: {
    opacity: 0.85
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap'
  },
  quickAction: {
    flexBasis: '48%',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden'
  },
  quickActionGradient: {
    padding: 16,
    gap: 12,
    borderRadius: 18
  },
  quickActionEmoji: {
    fontSize: 24,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14
  },
  quickActionTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600'
  },
  trackColumn: {
    gap: 16
  },
  trackCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1d4ed840'
  },
  trackMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  trackTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600'
  },
  trackProgressText: {
    fontSize: 13,
    fontWeight: '600'
  },
  trackBar: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#1e293b'
  },
  trackBarFill: {
    height: '100%',
    borderRadius: 999
  },
  signalColumn: {
    gap: 12
  },
  signalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1
  },
  signalDot: {
    width: 10,
    height: 10,
    borderRadius: 999
  },
  signalCopy: {
    flex: 1
  },
  signalTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600'
  },
  signalTime: {
    fontSize: 13,
    marginTop: 4
  }
});
