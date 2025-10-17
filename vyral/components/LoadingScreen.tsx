=======
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

const phases = [
  {
    id: 'signal',
    title: 'Signal Boost',
    description: 'Connecting your squads & live rooms',
    threshold: 12
  },
  {
    id: 'creative',
    title: 'Creative Sync',
    description: 'Loading collab canvases & soundboards',
    threshold: 36
  },
  {
    id: 'intel',
    title: 'Intel Drop',
    description: 'Personalizing challenges that fit your vibe',
    threshold: 58
  },
  {
    id: 'vault',
    title: 'Vault Lock-in',
    description: 'Encrypting wallets & reward streaks',
    threshold: 76
  },
  {
    id: 'liftoff',
    title: 'Liftoff',
    description: 'Deploying your dashboard & feed layers',
    threshold: 92
  }
];


export const LoadingScreen: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const aura = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;
  const scan = useRef(new Animated.Value(0)).current;
  const gradientShift = useRef(new Animated.Value(0)).current;
  const tipOpacity = useRef(new Animated.Value(1)).current;
  const timelinePulse = useRef(new Animated.Value(0)).current;
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clock, setClock] = useState(() => new Date());
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
      Animated.timing(gradientShift, {
        toValue: 1,
        duration: 16000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      })
    ).start();
  }, [gradientShift]);

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
    Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [orbit]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scan, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(scan, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        })
      ])
    ).start();
  }, [scan]);

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
        const increment = 4 + Math.random() * 10;
        const noise = Math.random() * 3;
        const next = prev + increment + noise;
        return next >= 99 ? 34 + Math.random() * 4 : next;
=======
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

  useEffect(() => {
    const activeIndex = phases.reduce((acc, phase, index) => {
      if (progress >= phase.threshold) {
        return index;
      }

      return acc;
    }, 0);
    setPhaseIndex(activeIndex);

    Animated.sequence([
      Animated.timing(timelinePulse, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(timelinePulse, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start();
  }, [progress, timelinePulse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const orbitRotate = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const orbitScale = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08]
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, PROGRESS_WIDTH]
  });

  const scanTranslate = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [-PROGRESS_WIDTH * 0.35, PROGRESS_WIDTH * 0.35]
  });

  const gradientOpacity = gradientShift.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.35, 0.8, 0.35]
  });

  const timelineGlow = timelinePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1]
  });

  const progressDisplay = Math.min(99, Math.round(progress));
  const activePhase = phases[phaseIndex];
  const nextPhase = phases[(phaseIndex + 1) % phases.length];
  const clockString = useMemo(() => {
    return clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [clock]);
  const progressDisplay = Math.min(99, Math.round(progress));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05060a', '#0b1020', '#131735']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.gradientPulse, { opacity: gradientOpacity }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(125, 211, 252, 0.22)', 'rgba(59, 130, 246, 0.1)', 'rgba(30, 64, 175, 0.16)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
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
      <Animated.View
        pointerEvents="none"
        style={[
          styles.auroraTertiary,
          {
            opacity: gradientOpacity,
            transform: [
              { rotate: orbitRotate },
              { scale: orbitScale }
            ]
          }
        ]}
      >
        <LinearGradient
          colors={['rgba(252, 211, 77, 0.16)', 'rgba(129, 140, 248, 0.22)', 'transparent']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={styles.hud}>
        <View style={styles.badgeDot} />
        <View>
          <Text style={styles.hudLabel}>Vyral uplink</Text>
          <Text style={styles.hudValue}>{clockString} • phase {phaseIndex + 1}/5</Text>
        </View>

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
            <Animated.View
              pointerEvents="none"
              style={[styles.progressScanner, { transform: [{ translateX: scanTranslate }] }]}
            />
            </View>
          <View style={styles.progressMeta}>
            <Text style={styles.metaLabel}>syncing vibe decks</Text>
            <Text style={styles.metaValue}>{progressDisplay}%</Text>
          </View>
        </View>
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseTitle}>{activePhase.title}</Text>
            <Animated.Text style={[styles.phaseBadge, { opacity: timelineGlow }]}>in motion</Animated.Text>
          </View>
          <Text style={styles.phaseDescription}>{activePhase.description}</Text>
          <Text style={styles.phaseNextLabel}>Next</Text>
          <Text style={styles.phaseNextValue}>{nextPhase.title}</Text>
        </View>
        <View style={styles.timeline}>
          {phases.map((phase, index) => {
            const isActive = index === phaseIndex;
            const isComplete = progressDisplay >= phase.threshold && !isActive;

            return (
              <View key={phase.id} style={styles.timelineRow}>
                <View
                  style={[
                    styles.timelineIndicator,
                    isActive && styles.timelineIndicatorActive,
                    isComplete && styles.timelineIndicatorComplete
                  ]}
                />
                <View style={styles.timelineCopy}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      isActive && styles.timelineTitleActive,
                      isComplete && styles.timelineTitleComplete
                    ]}
                  >
                    {phase.title}
                  </Text>
                  <Text style={styles.timelineDescription}>{phase.description}</Text>
                </View>
              </View>
            );
          })}
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
  },
  aurora: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 240,
    bottom: -160,
    left: -160,
    overflow: 'hidden'
  },
  auroraTertiary: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 280,
    top: '38%',
    left: -240,
    opacity: 0.6,
    overflow: 'hidden'
  },
  hud: {
    position: 'absolute',
    top: 52,
    right: 32,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.75)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148,163,184,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: 'rgba(14, 165, 233, 0.5)',
    shadowOpacity: 0.55,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20
  },
  hudLabel: {
    color: 'rgba(148, 163, 184, 0.9)',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1.8
  },
  hudValue: {
    color: palette.textPrimary,
    fontSize: 13,
    letterSpacing: 0.8
  },
  badgeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.accents.vyra,
    shadowColor: palette.accents.vyra,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 10
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
    position: 'relative',
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
  },
  gradientPulse: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.6
  },
  progressScanner: {
    position: 'absolute',
    width: PROGRESS_WIDTH * 0.4,
    height: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(224,242,254,0.16)',
    top: 0,
    shadowColor: '#e0f2fe',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 14
  },
  phaseCard: {
    marginTop: 26,
    width: PROGRESS_WIDTH,
    backgroundColor: 'rgba(15,23,42,0.82)',
    borderRadius: 20,
    padding: 18,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148,163,184,0.25)'
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  phaseTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.6
  },
  phaseBadge: {
    color: palette.accents.vyra,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  phaseDescription: {
    color: 'rgba(203,213,225,0.9)',
    fontSize: 14,
    lineHeight: 20
  },
  phaseNextLabel: {
    marginTop: 6,
    color: 'rgba(148,163,184,0.75)',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase'
  },
  phaseNextValue: {
    color: palette.textPrimary,
    fontSize: 15,
    fontWeight: '600'
  },
  timeline: {
    width: PROGRESS_WIDTH,
    marginTop: 18,
    gap: 14
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start'
  },
  timelineIndicator: {
    width: 10,
    height: 10,
    marginTop: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(51,65,85,0.6)'
  },
  timelineIndicatorActive: {
    backgroundColor: palette.accents.vyra,
    shadowColor: palette.accents.vyra,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  timelineIndicatorComplete: {
    backgroundColor: 'rgba(45,212,191,0.6)'
  },
  timelineCopy: {
    flex: 1
  },
  timelineTitle: {
    color: 'rgba(148,163,184,0.9)',
    fontSize: 14,
    letterSpacing: 0.6
  },
  timelineTitleActive: {
    color: palette.textPrimary,
    fontWeight: '700'
  },
  timelineTitleComplete: {
    color: 'rgba(148,163,184,1)'
  },
  timelineDescription: {
    marginTop: 2,
    color: 'rgba(148,163,184,0.75)',
    fontSize: 12,
    lineHeight: 18  }
});

