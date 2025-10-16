import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, typography } from '@/theme/tokens';

type BoardOverviewProps = {
  missionCount: number;
};

export const BoardOverview: React.FC<BoardOverviewProps> = ({ missionCount }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Mission Control</Text>
    <Text style={styles.subtitle}>You have {missionCount} tracked goals.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 16,
    gap: 12
  },
  title: typography.heading,
  subtitle: typography.body
});
