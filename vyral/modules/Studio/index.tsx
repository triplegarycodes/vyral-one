import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

const labs = [
  { label: 'Beat Lab', description: 'Layer loops, bass drops, and vocal chops with squad presets.' },
  { label: 'Canvas Club', description: 'Remix sticker packs, create album covers, and drop concept art.' },
  { label: 'Story Forge', description: 'Co-write zines and motion comics with guided prompts.' }
];

const StudioScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Studio</Text>
      <Text style={styles.subheading}>
        Build your next creation with collab-ready workspaces that react to your moodboards.
      </Text>
      <View style={styles.labList}>
        {labs.map((lab) => (
          <View key={lab.label} style={styles.labCard}>
            <Text style={styles.labLabel}>{lab.label}</Text>
            <Text style={styles.labDescription}>{lab.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020617',
    padding: 24,
    gap: 20
  },
  heading: {
    color: palette.textPrimary,
    fontSize: 32,
    fontWeight: '700'
  },
  subheading: {
    color: palette.textSecondary,
    fontSize: 16,
    lineHeight: 22
  },
  labList: {
    gap: 18
  },
  labCard: {
    backgroundColor: 'rgba(232,121,249,0.12)',
    borderColor: 'rgba(232,121,249,0.28)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 20,
    gap: 8
  },
  labLabel: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  labDescription: {
    color: 'rgba(203,213,225,0.85)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default StudioScreen;
