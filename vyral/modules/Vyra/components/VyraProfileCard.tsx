import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type VyraProfileCardProps = {
  username: string;
  bio?: string;
};

export const VyraProfileCard: React.FC<VyraProfileCardProps> = ({ username, bio }) => (
  <View style={styles.container}>
    <Text style={styles.username}>{username}</Text>
    <Text style={styles.bio}>{bio ?? 'Set your vibe and share your goals.'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: palette.surface, padding: 20, borderRadius: 16, gap: 8 },
  username: { color: palette.textPrimary, fontSize: 20, fontWeight: '600' },
  bio: { color: palette.textSecondary, fontSize: 14 }
});
