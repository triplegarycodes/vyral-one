import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, typography } from '@/theme/tokens';

type LyfeQuestListProps = {
  quests: Array<{ id: string; title: string }>;
};

export const LyfeQuestList: React.FC<LyfeQuestListProps> = ({ quests }) => (
  <View style={styles.container}>
    {quests.map((quest) => (
      <View key={quest.id} style={styles.item}>
        <Text style={styles.title}>{quest.title}</Text>
        <Text style={styles.caption}>Budget smarter, earn rewards.</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 12 },
  item: { backgroundColor: palette.surface, padding: 20, borderRadius: 16, gap: 8 },
  title: typography.heading,
  caption: typography.body
});
