import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type StrykeScenarioCardProps = {
  scenario: string;
};

export const StrykeScenarioCard: React.FC<StrykeScenarioCardProps> = ({ scenario }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Scenario</Text>
    <Text style={styles.body}>{scenario}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: palette.surface, padding: 20, borderRadius: 16, gap: 12 },
  title: { color: palette.textSecondary, fontSize: 12, textTransform: 'uppercase' },
  body: { color: palette.textPrimary, fontSize: 16, lineHeight: 22 }
});
