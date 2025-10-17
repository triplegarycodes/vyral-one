import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.studio;

const stats = [
  { label: 'Active projects', value: '24', hint: 'Shared with your crew' },
  { label: 'Render queue', value: '3 exports', hint: 'Avg time 2m 12s' }
];

const workspaces = [
  {
    title: 'Beat Lab',
    description: 'Layer loops, bass drops, and autotune overlays with squad presets.'
  },
  {
    title: 'Canvas Club',
    description: 'Storyboarding suite with AI brushes and live emoji critique mode.'
  },
  {
    title: 'Story Forge',
    description: 'Co-write mini-series with voiceover booths and caption scripts.'
  }
];

const featuredTools = [
  { title: 'Moodboard sync', detail: 'Pull inspo from Spotlight sets + trending hashtags.' },
  { title: 'Auto stem splitter', detail: 'Isolate vocals or drums with one tap and share to crew.' },
  { title: 'Collab heatmap', detail: 'See who edited what in real-time with gradient trails.' }
];

const releaseTimeline = [
  { time: 'Today', title: 'Glowwave EP draft', detail: 'Waiting for vocals from @aaliyah' },
  { time: 'Tomorrow', title: 'Motion pack v2', detail: 'Queue for Spotlight release at 7pm' },
  { time: 'Weekend', title: 'Community jam', detail: 'Merge Pulse recordings into one drop' }
];

const StudioScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Workspaces" caption="Pick a vibe and drop straight into a toolset">
        <View style={styles.workspaceGrid}>
          {workspaces.map((space) => (
            <View key={space.title} style={styles.workspaceCard}>
              <Text style={styles.workspaceTitle}>{space.title}</Text>
              <Text style={styles.workspaceDescription}>{space.description}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Featured tools" caption="Upgraded automations added this week">
        <View style={styles.toolList}>
          {featuredTools.map((tool) => (
            <View key={tool.title} style={styles.toolItem}>
              <View style={[styles.toolDot, { backgroundColor: meta.accent }]} />
              <View style={styles.toolCopy}>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDetail}>{tool.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Release queue" caption="Everything lined up to publish">
        <View style={styles.timeline}>
          {releaseTimeline.map((entry) => (
            <View key={entry.title} style={styles.timelineCard}>
              <Text style={styles.timelineTime}>{entry.time}</Text>
              <Text style={styles.timelineTitle}>{entry.title}</Text>
              <Text style={styles.timelineDetail}>{entry.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  workspaceGrid: {
    gap: 16
  },
  workspaceCard: {
    backgroundColor: 'rgba(232, 121, 249, 0.12)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(232, 121, 249, 0.35)',
    gap: 10
  },
  workspaceTitle: {
    color: '#f9a8ff',
    fontSize: 18,
    fontWeight: '700'
  },
  workspaceDescription: {
    color: 'rgba(244, 235, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20
  },
  toolList: {
    gap: 16
  },
  toolItem: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)'
  },
  toolDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 6
  },
  toolCopy: {
    flex: 1,
    gap: 6
  },
  toolTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  toolDetail: {
    color: 'rgba(203, 213, 225, 0.85)',
    fontSize: 14,
    lineHeight: 20
  },
  timeline: {
    gap: 14
  },
  timelineCard: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.45)',
    gap: 6
  },
  timelineTime: {
    color: 'rgba(165, 180, 252, 0.85)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6
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

export default StudioScreen;
