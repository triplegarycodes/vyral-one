import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

const boosts = [
  { title: 'Mindful resets', detail: '3-minute breathing journeys and journal sparks.' },
  { title: 'Career quests', detail: 'Mini-internships and resume glow-ups from mentors.' },
  { title: 'Civic energy', detail: 'Volunteer adventures that unlock community badges.' }
];

const LifeLabScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Life Lab</Text>
      <Text style={styles.subheading}>
        Level up real-life skills with bite-sized experiments and mentor shout-outs.
      </Text>
      <View style={styles.boostList}>
        {boosts.map((boost) => (
          <View key={boost.title} style={styles.boostCard}>
            <Text style={styles.boostTitle}>{boost.title}</Text>
            <Text style={styles.boostDetail}>{boost.detail}</Text>
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
  boostList: {
    gap: 16
  },
  boostCard: {
    backgroundColor: 'rgba(99,102,241,0.12)',
    borderColor: 'rgba(99,102,241,0.28)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 18,
    gap: 8
  },
  boostTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  boostDetail: {
    color: 'rgba(203,213,225,0.85)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default LifeLabScreen;
