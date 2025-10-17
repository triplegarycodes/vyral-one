import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/tokens';

const PROGRESS_WIDTH = 280;
const tips = [
  'Queuing the freshest drops for your vibe deck…',
  'Spinning up squads and syncing your streaks…',
  'Mapping your hype radius for tonight\'s missions…',
  'Charging neon cores for turbo reactions…',
  'Polishing badges and unlocking secret emotes…'
];

export const LoadingScreen: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const aura = useRef(new Animated.Value(0)).current;
  const tipOpacity = useRef(new Animated.Value(1)).current;
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const progressAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [rotation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true
        })
      ])
    ).start();
  }, [pulse]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(aura, {
          toValue: 1,
          duration: 5200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(aura, {
          toValue: 0,
          duration: 5200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        })
      ])
    ).start();
  }, [aura]);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(tipOpacity, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (!finished) return;
        setTipIndex((prev) => (prev + 1) % tips.length);
        Animated.timing(tipOpacity, {
          toValue: 1,
          duration: 340,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }).start();
      });
    }, 3600);

    return () => clearInterval(interval);
  }, [tipOpacity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 6 + Math.random() * 12;
        const next = prev + increment;
        return next >= 98 ? 28 : next;
      });
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [progress, progressAnim]);

  const rotationDeg = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.25]
  });

  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.85]
  });

  const auraTranslate = aura.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 30]
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, PROGRESS_WIDTH]
  });

  const progressDisplay = Math.min(99, Math.round(progress));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05060a', '#0b1020', '#131735']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.aurora, { transform: [{ rotate: rotationDeg }] }]}
      >
        <LinearGradient
          colors={['rgba(34,211,238,0.55)', 'rgba(168,85,247,0.4)', 'transparent']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.auroraSecondary,
          {
            opacity: pulseOpacity,
            transform: [
              { translateY: auraTranslate },
              { rotate: rotationDeg },
              { scale: pulseScale }
            ]
          }
        ]}
      >
        <LinearGradient
          colors={['rgba(56,189,248,0.4)', 'rgba(251,113,133,0.35)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={styles.badge}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeText}>calibrating hype engines</Text>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[styles.logoAura, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
        />
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[palette.accents.vyra, palette.accents.skrybe, palette.accents.stryke]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.logoText}>V</Text>
        </View>
        <Text style={styles.headline}>Dropping you into the Vyral flow</Text>
        <Animated.Text style={[styles.tip, { opacity: tipOpacity }]}>{tips[tipIndex]}</Animated.Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth } as Animated.WithAnimatedObject<ViewStyle>]}
            >
              <LinearGradient
                colors={[palette.accents.vyra, palette.accents.kor, palette.accents.skrybe]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.metaLabel}>syncing vibe decks</Text>
            <Text style={styles.metaValue}>{progressDisplay}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 18
  },
  aurora: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 240,
    top: -180,
    right: -120,
    opacity: 0.55,
    overflow: 'hidden'
  },
  auroraSecondary: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 240,
    bottom: -160,
    left: -160,
    overflow: 'hidden'
  },
  badge: {
    position: 'absolute',
    top: 68,
    right: 32,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.65)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148,163,184,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.accents.vyra,
    shadowColor: palette.accents.vyra,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8
  },
  badgeText: {
    color: palette.textSecondary,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  logoAura: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(45,212,191,0.18)'
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    shadowColor: palette.accents.vyra,
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 32,
    elevation: 10
  },
  logoText: {
    fontSize: 56,
    fontWeight: '700',
    color: palette.textPrimary,
    letterSpacing: 6
  },
  headline: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '600',
    color: palette.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  tip: {
    maxWidth: 320,
    textAlign: 'center',
    color: 'rgba(224,242,254,0.85)',
    fontSize: 16,
    lineHeight: 22
  },
  progressWrap: {
    marginTop: 12,
    alignItems: 'center',
    gap: 12
  },
  progressTrack: {
    width: PROGRESS_WIDTH,
    height: 14,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
    shadowColor: '#0ea5e9',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden'
  },
  progressMeta: {
    width: PROGRESS_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaLabel: {
    color: 'rgba(148,163,184,0.85)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12
  },
  metaValue: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    fontVariant: ['tabular-nums']
  }
});

