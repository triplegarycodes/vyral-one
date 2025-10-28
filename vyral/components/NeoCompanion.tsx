import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import * as Speech from 'expo-speech';
import { palette } from '@/theme/tokens';

type NeoCompanionProps = {
  accent: string;
  accentSecondary: string;
  message: string;
  moodIndex: number;
};

type Particle = {
  radius: number;
  orbit: number;
  offset: number;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const NeoCompanion: React.FC<NeoCompanionProps> = ({ accent, accentSecondary, message, moodIndex }) => {
  const pulse = useSharedValue(0);
  const blink = useSharedValue(0);
  const aura = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 3200 }), -1, true);
    blink.value = withRepeat(withTiming(1, { duration: 1800 }), -1, true);
    aura.value = withRepeat(withTiming(1, { duration: 5200 }), -1, true);
  }, [pulse, blink, aura]);

  useEffect(() => {
    Speech.stop();
    Speech.speak(message, {
      pitch: 1.1,
      rate: 0.92
    });
  }, [message]);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 18 }).map(() => ({
        radius: Math.random() * 28 + 12,
        orbit: Math.random() * 36 + 28,
        offset: Math.random() * Math.PI * 2
      })),
    []
  );

  const containerStyle = useAnimatedStyle(() => {
    const wobble = Math.sin(pulse.value * Math.PI * 2) * 4;
    return {
      transform: [{ translateY: wobble }]
    };
  });

  const auraStyle = useAnimatedStyle(() => {
    const scale = 1 + Math.sin(aura.value * Math.PI * 2) * 0.12;
    const opacity = 0.4 + Math.sin(aura.value * Math.PI * 2 + moodIndex) * 0.2;
    return {
      transform: [{ scale }],
      opacity
    };
  }, [moodIndex]);

  const coreStyle = useAnimatedStyle(() => {
    const scale = 1 + Math.sin(pulse.value * Math.PI * 2 + moodIndex) * 0.08;
    return {
      transform: [{ scale }],
      backgroundColor: interpolateColor(pulse.value, [0, 1], [accentSecondary, accent])
    };
  }, [accent, accentSecondary, moodIndex]);

  const eyeStyle = useAnimatedStyle(() => {
    const blinkValue = interpolate(blink.value, [0, 0.5, 1], [1, 0.1, 1]);
    return {
      transform: [{ scaleY: blinkValue }]
    };
  });

  return (
    <View style={styles.wrapper}>
      <AnimatedView style={[styles.neoContainer, containerStyle]}>
        <Animated.View style={[styles.neoAura, { backgroundColor: accentSecondary }, auraStyle]} />
        <View style={styles.particleLayer} pointerEvents="none">
          {particles.map((particle, index) => (
            <NeoParticle key={`neo-particle-${index}`} particle={particle} accent={accent} moodIndex={moodIndex} />
          ))}
        </View>
        <Animated.View style={[styles.neoCore, coreStyle]}>
          <Animated.View style={[styles.neoEye, eyeStyle]} />
        </Animated.View>
      </AnimatedView>
      <View style={styles.messagePanel}>
        <Text style={styles.neoLabel}>Neo</Text>
        <Text style={[styles.neoMessage, { color: accent }]}>{message}</Text>
      </View>
    </View>
  );
};

type NeoParticleProps = {
  particle: Particle;
  accent: string;
  moodIndex: number;
};

const NeoParticle: React.FC<NeoParticleProps> = ({ particle, accent, moodIndex }) => {
  const orbit = useSharedValue(Math.random());

  useEffect(() => {
    orbit.value = withRepeat(withTiming(1, { duration: 4600 }), -1, true);
  }, [orbit]);

  const style = useAnimatedStyle(() => {
    const angle = orbit.value * Math.PI * 2 + particle.offset;
    const x = Math.cos(angle) * particle.orbit;
    const y = Math.sin(angle) * particle.orbit * 0.4;
    const scale = 0.6 + Math.sin(angle + moodIndex) * 0.3;
    return {
      transform: [{ translateX: x }, { translateY: y }, { scale }]
    };
  }, [particle.orbit, particle.offset, moodIndex]);

  return <Animated.View style={[styles.neoParticle, { backgroundColor: accent, width: particle.radius, height: particle.radius, borderRadius: particle.radius / 2 }, style]} />;
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 32
  },
  neoContainer: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  neoAura: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    opacity: 0.5
  },
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  neoCore: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.glow,
    shadowColor: palette.glow,
    shadowOpacity: 0.6,
    shadowRadius: 28
  },
  neoEye: {
    width: 56,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#0B0E2A'
  },
  neoParticle: {
    position: 'absolute',
    opacity: 0.45
  },
  messagePanel: {
    marginTop: 24,
    padding: 20,
    borderRadius: 20,
    backgroundColor: palette.surfaceSecondary,
    borderWidth: 1,
    borderColor: 'rgba(109, 91, 254, 0.3)'
  },
  neoLabel: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: palette.textMuted,
    marginBottom: 8
  },
  neoMessage: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600'
  }
});
