import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, typography } from '@/theme/tokens';

type KorChannelPreviewProps = {
  channelName: string;
  activeCount: number;
};

export const KorChannelPreview: React.FC<KorChannelPreviewProps> = ({ channelName, activeCount }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{channelName}</Text>
    <Text style={styles.caption}>{activeCount} collaborators online</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 16,
    gap: 8
  },
  title: typography.heading,
  caption: typography.body
});
