import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type ZoneMessagePreviewProps = {
  author: string;
  body: string;
};

export const ZoneMessagePreview: React.FC<ZoneMessagePreviewProps> = ({ author, body }) => (
  <View style={styles.container}>
    <Text style={styles.author}>{author}</Text>
    <Text style={styles.body}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 16,
    gap: 8
  },
  author: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '600'
  },
  body: {
    color: palette.textSecondary,
    fontSize: 14
  }
});
