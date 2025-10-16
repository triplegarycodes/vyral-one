import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { palette } from '@/theme/tokens';

type ModuleCardProps = {
  title: string;
  description: string;
  accent: string;
  onPress?: () => void;
  locked?: boolean;
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, accent, onPress, locked }) => {
  return (
    <Pressable
      onPress={locked ? undefined : () => {
        void Haptics.selectionAsync();
        onPress?.();
      }}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {locked ? <Text style={styles.locked}>Sign in to unlock</Text> : null}
      </View>
      <Image source={require('../assets/icon.png')} style={styles.art} contentFit="cover" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    minHeight: 120
  },
  pressed: { opacity: 0.85 },
  accent: {
    width: 6,
    alignSelf: 'stretch',
    borderRadius: 6
  },
  content: { flex: 1, gap: 8 },
  title: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  description: {
    color: palette.textSecondary,
    fontSize: 14
  },
  locked: {
    color: palette.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  art: {
    width: 56,
    height: 56,
    borderRadius: 16,
    opacity: 0.8
  }
});
