import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

const drops = [
  { creator: '@moonshot', title: 'Neon rooftop vlog', status: 'Queued for feedback circles' },
  { creator: '@techtonic', title: 'Budget drone hacks', status: 'Requested by 3 new squads' },
  { creator: '@kindnesscrew', title: 'Pay-it-forward challenge', status: 'Featured on the civic wall' }
];

const SpotlightScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Spotlight</Text>
      <Text style={styles.subheading}>
        Share your latest drops, highlight collabs, and boost the voices you stan.
      </Text>
      <View style={styles.dropList}>
        {drops.map((drop) => (
          <View key={drop.title} style={styles.dropCard}>
            <Text style={styles.dropCreator}>{drop.creator}</Text>
            <Text style={styles.dropTitle}>{drop.title}</Text>
            <Text style={styles.dropStatus}>{drop.status}</Text>
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
  dropList: {
    gap: 16
  },
  dropCard: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderColor: 'rgba(245,158,11,0.28)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 18,
    gap: 6
  },
  dropCreator: {
    color: 'rgba(251,191,36,0.95)',
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  dropTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  dropStatus: {
    color: 'rgba(148,163,184,0.85)',
    fontSize: 14
  }
});

export default SpotlightScreen;
