import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type SkrybePromptCardProps = {
  prompt: string;
};

export const SkrybePromptCard: React.FC<SkrybePromptCardProps> = ({ prompt }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Writing Prompt</Text>
    <Text style={styles.prompt}>{prompt}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 16,
    gap: 12
  },
  label: {
    color: palette.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  prompt: {
    color: palette.textPrimary,
    fontSize: 16,
    lineHeight: 22
  }
});
