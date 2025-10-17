import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.lifelab;

const stats = [
  { label: 'Active habits', value: '9', hint: 'Across health, focus, and vibe' },
  { label: 'Crew accountability', value: '87%', hint: 'Check-ins submitted this week' }
];

const dailyBoosts = [
  {
    title: 'Sunrise Reset',
    detail: '5 minute breathwork + hydration stack to prime the day.',
    points: '+120 XP'
  },
  {
    title: 'Focus Sprint',
    detail: '45 minute deep work block with built-in stretch prompts.',
    points: '+200 XP'
  },
  {
    title: 'Nightly Wrap',
    detail: 'Gratitude micro-journal + tomorrow intention setting.',
    points: '+150 XP'
  }
];

const habitTracks = [
  { label: 'Mindset Glow Up', description: 'Mindful journaling, check-ins, and sleep wins.', progress: 0.56 },
  { label: 'Move Daily', description: 'Mix cardio, dance, and stretch loops.', progress: 0.73 }
];

const experiments = [
  { title: 'Digital Detox Duel', detail: 'Go 3 hours offline with a friend, log the vibe shift.' },
  { title: 'Hydration Relay', detail: 'Tag team water goals across your crew during school hours.' }
];

const LifeLabScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Daily boosts" caption="Micro missions you can finish before homeroom">
        <View style={styles.boostStack}>
          {dailyBoosts.map((boost) => (
            <View key={boost.title} style={styles.boostCard}>
              <View style={styles.boostHeader}>
                <Text style={styles.boostTitle}>{boost.title}</Text>
                <Text style={styles.boostPoints}>{boost.points}</Text>
              </View>
              <Text style={styles.boostDetail}>{boost.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Focus tracks" caption="Stack streaks and unlock new rewards">
        <View style={styles.trackStack}>
          {habitTracks.map((track) => (
            <View key={track.label} style={styles.trackCard}>
              <Text style={styles.trackLabel}>{track.label}</Text>
              <Text style={styles.trackDescription}>{track.description}</Text>
              <View style={styles.trackBar}>
                <View
                  style={[
                    styles.trackFill,
                    { width: `${Math.round(track.progress * 100)}%`, backgroundColor: meta.accent }
                  ]}
                />
              </View>
              <Text style={styles.trackProgress}>{Math.round(track.progress * 100)}% synced</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Crew experiments" caption="Try it for a week and report back to your circle">
        <View style={styles.experimentList}>
          {experiments.map((experiment) => (
            <View key={experiment.title} style={styles.experimentCard}>
              <Text style={styles.experimentTitle}>{experiment.title}</Text>
              <Text style={styles.experimentDetail}>{experiment.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  boostStack: {
    gap: 16
  },
  boostCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.38)',
    gap: 10
  },
  boostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boostTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  boostPoints: {
    color: '#c7d2fe',
    fontSize: 14,
    fontWeight: '700'
  },
  boostDetail: {
    color: 'rgba(203, 213, 225, 0.82)',
    fontSize: 14,
    lineHeight: 20
  },
  trackStack: {
    gap: 16
  },
  trackCard: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
    gap: 10
  },
  trackLabel: {
    color: '#e0e7ff',
    fontSize: 16,
    fontWeight: '700'
  },
  trackDescription: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    lineHeight: 20
  },
  trackBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#111b2f'
  },
  trackFill: {
    height: '100%',
    borderRadius: 999
  },
  trackProgress: {
    color: '#c7d2fe',
    fontSize: 13,
    fontWeight: '600'
  },
  experimentList: {
    gap: 16
  },
  experimentCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 8
  },
  experimentTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  experimentDetail: {
    color: 'rgba(203, 213, 225, 0.82)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default LifeLabScreen;
