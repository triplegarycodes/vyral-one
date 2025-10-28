import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/tokens';
import { StarfieldBackground } from '@/components/StarfieldBackground';

const phases = [
  { title: 'Signal Boost', description: 'Linking squads & prepping Kor uplink', threshold: 15 },
  { title: 'Creative Sync', description: 'Calibrating Skrybe + Stryke engines', threshold: 40 },
  { title: 'Intel Drop', description: 'Personalizing quests and scenarios', threshold: 65 },
  { title: 'Vault Lock-In', description: 'Securing streaks & reward cache', threshold: 85 },
  { title: 'Liftoff', description: 'Deploying immersive dashboard', threshold: 100 }
];

const tips = [
  'Swipe through modules to orbit between missions.',
  'Neo reacts to your mood—tap modules to change the vibe.',
  'Kor squads earn bonus streak energy when synced daily.',
  'Tree blossoms faster when you clear Board streaks.',
  'Stryke branches pull CSV data to remix your story.'
];

export const LoadingScreen: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 14000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [rotation]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 4200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false
    }).start();

    const interval = setInterval(() => {
      setTipIndex((index) => (index + 1) % tips.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [progressAnim]);

  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setProgress(Math.min(100, value));
    });
    return () => {
      progressAnim.removeListener(listener);
    };
  }, [progressAnim]);

  const phase = useMemo(() => phases.find((entry) => progress <= entry.threshold) ?? phases[phases.length - 1], [progress]);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const orbit = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });

  return (
    <View style={styles.container}>
      <StarfieldBackground />
      <LinearGradient colors={palette.backgroundGradient} style={StyleSheet.absoluteFillObject} />
      <View style={styles.inner}>
        <View style={styles.logoCluster}>
          <Animated.View style={[styles.outerRing, { transform: [{ rotate: spin }] }]}>
            <Animated.View style={[styles.ringParticle, { transform: [{ rotate: orbit }] }]} />
          </Animated.View>
          <Animated.View style={[styles.innerCore, { transform: [{ rotate: orbit }] }]}>
            <Text style={styles.logoText}>VYRAL</Text>
          </Animated.View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.phaseRow}>
            <Text style={styles.phaseTitle}>{phase.title}</Text>
            <Text style={styles.phasePercent}>{Math.round(progress)}%</Text>
          </View>
          <Text style={styles.phaseDescription}>{phase.description}</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>Neo intel</Text>
          <Text style={styles.tip}>{tips[tipIndex]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundGradient[0]
  },
  inner: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 64,
    justifyContent: 'center',
    gap: 36
  },
  logoCluster: {
    alignItems: 'center'
  },
  outerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1.5,
    borderColor: 'rgba(109, 91, 254, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ringParticle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(217, 70, 239, 0.4)'
  },
  innerCore: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(109, 91, 254, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(217, 70, 239, 0.35)'
  },
  logoText: {
    fontSize: 28,
    letterSpacing: 12,
    color: palette.textPrimary,
    fontWeight: '700'
  },
  progressContainer: {
    gap: 16
  },
  progressTrack: {
    height: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 24, 53, 0.6)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: palette.glow
  },
  phaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  phaseTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  phasePercent: {
    color: palette.textSecondary,
    fontSize: 18,
    fontVariant: ['tabular-nums']
  },
  phaseDescription: {
    color: palette.textMuted,
    fontSize: 14
  },
  tipCard: {
    backgroundColor: 'rgba(11, 14, 42, 0.75)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(109, 91, 254, 0.3)',
    gap: 8
  },
  tipLabel: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontSize: 12,
    color: palette.textMuted
  },
  tip: {
    color: palette.textPrimary,
    fontSize: 16,
    lineHeight: 24
  }
});
