import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { palette } from '@/theme/tokens';

export type CinematicModule = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentSecondary: string;
  icon: keyof typeof Ionicons.glyphMap;
  locked?: boolean;
};

type ModuleCardProps = {
  module: CinematicModule;
  onPress?: () => void;
  scrollX: Animated.SharedValue<number>;
  pageIndex: number;
  itemIndex: number;
  viewportWidth: number;
};

type Particle = {
  radius: number;
  phase: number;
  delay: number;
  distance: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onPress, scrollX, pageIndex, itemIndex, viewportWidth }) => {
  const press = useSharedValue(0);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 2600 }), -1, true);
  }, [shimmer]);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 7 }).map(() => ({
        radius: Math.random() * 16 + 6,
        phase: Math.random() * Math.PI * 2,
        delay: Math.random() * 1200,
        distance: Math.random() * 36 + 16
      })),
    [module.key]
  );

  const animatedCard = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value - pageIndex * viewportWidth) / viewportWidth;
    const scale = interpolate(distance, [0, 1.2], [1, 0.86], Extrapolation.CLAMP);
    const verticalShift = (itemIndex % 2 === 0 ? -1 : 1) * interpolate(distance, [0, 1], [0, 34], Extrapolation.CLAMP);
    return {
      transform: [
        { translateY: verticalShift - press.value * 6 },
        { scale: scale - press.value * 0.04 }
      ],
      opacity: interpolate(distance, [0, 1.3], [1, 0.45], Extrapolation.CLAMP),
      shadowColor: module.accent,
      shadowOpacity: 0.3 + (1 - distance) * 0.25,
      shadowRadius: 32,
      shadowOffset: { width: 0, height: 0 }
    };
  }, [itemIndex, module.accent, pageIndex, viewportWidth]);

  const haloStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value - pageIndex * viewportWidth) / viewportWidth;
    const intensity = 1 - Math.min(distance, 1);
    return {
      opacity: 0.35 + intensity * 0.45 + press.value * 0.2,
      transform: [{ scale: 1 + intensity * 0.08 + press.value * 0.05 }]
    };
  }, [pageIndex, viewportWidth]);

  const gradientStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value - pageIndex * viewportWidth) / viewportWidth;
    const progress = 1 - Math.min(distance, 1);
    return {
      opacity: 0.65 + progress * 0.35,
      transform: [{ translateX: (progress - 0.5) * 18 }]
    };
  }, [pageIndex, viewportWidth]);

  const iconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value - pageIndex * viewportWidth) / viewportWidth;
    const normalized = 1 - Math.min(distance, 1);
    return {
      transform: [{ rotate: `${(itemIndex % 2 === 0 ? -1 : 1) * normalized * 8}deg` }],
      color: interpolateColor(normalized, [0, 1], [module.accentSecondary, module.accent])
    } as const;
  }, [itemIndex, module.accent, module.accentSecondary, pageIndex, viewportWidth]);

  const subtitleStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value - pageIndex * viewportWidth) / viewportWidth;
    return {
      opacity: 0.6 + (1 - Math.min(distance, 1)) * 0.4
    };
  }, [pageIndex, viewportWidth]);

  const handlePressIn = () => {
    press.value = withTiming(1, { duration: 140 });
  };

  const handlePressOut = () => {
    press.value = withTiming(0, { duration: 240 });
  };

  const handlePress = () => {
    if (module.locked) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress?.();
  };

  return (
    <AnimatedPressable
      style={[styles.card, animatedCard]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[styles.halo, { borderColor: module.accentSecondary }, haloStyle]} />
      <AnimatedGradient
        colors={[module.accent, module.accentSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.gradient, gradientStyle]}
      />
      <View style={styles.header}>
        <Animated.Text style={[styles.subtitle, subtitleStyle, { color: module.accentSecondary }]}>{module.subtitle}</Animated.Text>
        <View style={styles.iconContainer}>
          <Animated.View style={[styles.iconHalo, { borderColor: module.accentSecondary }, haloStyle]} />
          <AnimatedIcon name={module.icon} size={24} style={iconStyle as never} />
        </View>
      </View>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.description}>{module.description}</Text>
      {module.locked ? <Text style={styles.locked}>Sign in to unlock</Text> : null}
      <ParticleSystem particles={particles} accent={module.accent} shimmer={shimmer} />
    </AnimatedPressable>
  );
};

type ParticleSystemProps = {
  particles: Particle[];
  accent: string;
  shimmer: Animated.SharedValue<number>;
};

const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles, accent, shimmer }) => {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {particles.map((particle, index) => (
        <ParticleSprite key={`particle-${index}`} particle={particle} accent={accent} shimmer={shimmer} index={index} />
      ))}
    </View>
  );
};

type ParticleSpriteProps = {
  particle: Particle;
  accent: string;
  shimmer: Animated.SharedValue<number>;
  index: number;
};

const ParticleSprite: React.FC<ParticleSpriteProps> = ({ particle, accent, shimmer, index }) => {
  const orbit = useSharedValue(0);

  useEffect(() => {
    orbit.value = withDelay(particle.delay, withRepeat(withTiming(1, { duration: 3600 }), -1, true));
  }, [orbit, particle.delay]);

  const style = useAnimatedStyle(() => {
    const theta = orbit.value * Math.PI * 2 + particle.phase;
    const radius = particle.distance;
    const baseX = Math.cos(theta) * radius;
    const baseY = Math.sin(theta) * radius * 0.6;
    const pulse = Math.sin((shimmer.value + index * 0.15) * Math.PI * 2);
    const size = particle.radius;
    return {
      position: 'absolute',
      left: '55%',
      top: '70%',
      width: size,
      height: size,
      borderRadius: size / 2,
      transform: [{ translateX: baseX }, { translateY: baseY }],
      opacity: 0.2 + Math.abs(pulse) * 0.5
    };
  }, [index, particle]);

  return <Animated.View style={[style, { backgroundColor: accent }]} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 20,
    minHeight: 200,
    flex: 1,
    justifyContent: 'space-between'
  },
  gradient: {
    opacity: 0.7
  },
  halo: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 20,
    borderWidth: 1.2,
    opacity: 0.45
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 15, 40, 0.7)',
    overflow: 'hidden'
  },
  iconHalo: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: 1,
    opacity: 0.6
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.textPrimary
  },
  description: {
    fontSize: 14,
    color: palette.textMuted,
    marginTop: 4
  },
  locked: {
    marginTop: 12,
    color: palette.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase'
  }
});
