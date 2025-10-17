import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.pulse;

const stats = [
  { label: 'Now streaming', value: '8 rooms', hint: 'Crew-sourced mixes live' },
  { label: 'Signal strength', value: '98%', hint: 'Low latency across the grid' }
];

const trendingDrops = [
  { title: 'After School Hack', host: '@technofox', watchers: 1280, vibe: 'glowwave' },
  { title: 'Neon Skate Night', host: '@ollieriot', watchers: 940, vibe: 'hyperpop' }
];

const crewLoops = [
  { title: 'Mood scanner', description: 'Auto-curate a live room from your crew\'s reactions.' },
  { title: 'Story sync', description: 'Launch a multi-speaker panel with guided prompts.' },
  { title: 'Drop vault', description: 'Collect highlights to remix later in Spotlight.' }
];

const signalTimeline = [
  { time: 'Now', title: 'Spotlight Showcase', detail: 'Top clips streaming to 5k viewers.' },
  { time: '19m', title: 'Crew Studio Session', detail: 'Collaborative beat lab from Studio module.' },
  { time: 'Tonight', title: 'Money Moves AMA', detail: 'Creators talk side hustles + saving stacks.' }
];

const PulseScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Trending drops" caption="Live rooms currently pushing the vibe">
        <View style={styles.cardStack}>
          {trendingDrops.map((drop) => (
            <View key={drop.title} style={styles.dropCard}>
              <View style={styles.dropHeader}>
                <Text style={styles.dropTitle}>{drop.title}</Text>
                <Text style={styles.dropVibe}>{drop.vibe}</Text>
              </View>
              <Text style={styles.dropHost}>Hosted by {drop.host}</Text>
              <Text style={styles.dropWatchers}>{drop.watchers.toLocaleString()} tuned in</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Crew loops" caption="Spin up a fresh broadcast in seconds">
        <View style={styles.loopGrid}>
          {crewLoops.map((loop) => (
            <View key={loop.title} style={styles.loopCard}>
              <Text style={styles.loopTitle}>{loop.title}</Text>
              <Text style={styles.loopDescription}>{loop.description}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Signal timeline" caption="What\'s about to hit your network">
        <View style={styles.timeline}>
          {signalTimeline.map((entry) => (
            <View key={entry.title} style={styles.timelineItem}>
              <View style={[styles.timelineDot, { borderColor: meta.accent }]}>
                <View style={[styles.timelineInnerDot, { backgroundColor: meta.accent }]} />
              </View>
              <View style={styles.timelineCopy}>
                <Text style={styles.timelineTime}>{entry.time}</Text>
                <Text style={styles.timelineTitle}>{entry.title}</Text>
                <Text style={styles.timelineDetail}>{entry.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  cardStack: {
    gap: 16
  },
  dropCard: {
    backgroundColor: 'rgba(14, 165, 233, 0.14)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.35)',
    gap: 10
  },
  dropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  dropVibe: {
    color: 'rgba(14, 165, 233, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  dropHost: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontSize: 14
  },
  dropWatchers: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '600'
  },
  loopGrid: {
    gap: 14
  },
  loopCard: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.2)',
    gap: 8
  },
  loopTitle: {
    color: '#e0f2fe',
    fontSize: 16,
    fontWeight: '700'
  },
  loopDescription: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    lineHeight: 20
  },
  timeline: {
    gap: 16
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: 'rgba(30, 64, 175, 0.3)'
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timelineInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 999
  },
  timelineCopy: {
    flex: 1,
    gap: 4
  },
  timelineTime: {
    color: 'rgba(148, 163, 184, 0.9)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  timelineTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  timelineDetail: {
    color: 'rgba(203, 213, 225, 0.82)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default PulseScreen;
