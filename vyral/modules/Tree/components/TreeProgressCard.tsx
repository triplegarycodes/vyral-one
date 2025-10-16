import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type TreeProgressCardProps = {
  xp: number;
  streak: number;
};

export const TreeProgressCard: React.FC<TreeProgressCardProps> = ({ xp, streak }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Growth Stats</Text>
    <Text style={styles.metric}>XP: {xp}</Text>
    <Text style={styles.metric}>Streak: {streak} days</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: palette.surface, padding: 20, borderRadius: 16, gap: 8 },
  title: { color: palette.textPrimary, fontSize: 18, fontWeight: '600' },
  metric: { color: palette.textSecondary, fontSize: 14 }
});
