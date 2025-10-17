import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

const highlights = [
  { label: 'Now trending', title: 'Synthwave Skate Jam', meta: '4.2k viewers • Live' },
  { label: 'Squad mission', title: 'Glow Run Photo Hunt', meta: 'Begins in 12 min' },
  { label: 'Daily vibe', title: 'Affirmation check-in', meta: '76% of crew completed' }
];

const PulseScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Pulse</Text>
      <Text style={styles.subheading}>
        Plug into the real-time feed powering your crews, live rooms, and campus highlights.
      </Text>
      <View style={styles.cardGrid}>
        {highlights.map((item) => (
          <View key={item.title} style={styles.card}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.meta}</Text>
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
  cardGrid: {
    gap: 16
  },
  card: {
    backgroundColor: 'rgba(14,165,233,0.12)',
    borderColor: 'rgba(14,165,233,0.24)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 18,
    gap: 8
  },
  cardLabel: {
    color: 'rgba(125,211,252,0.85)',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1.6
  },
  cardTitle: {
    color: palette.textPrimary,
    fontSize: 20,
    fontWeight: '600'
  },
  cardMeta: {
    color: 'rgba(148,163,184,0.85)',
    fontSize: 14
  }
});

export default PulseScreen;
