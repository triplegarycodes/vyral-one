import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.spotlight;

const stats = [
  { label: 'Weekly highlights', value: '42', hint: 'Curated by the crew council' },
  { label: 'Shout-outs sent', value: '318', hint: 'Last 24 hours' }
];

const highlightReels = [
  { title: 'Glow City Rooftops', creator: '@lexi', score: '🔥 4.9k', tag: '#citywave' },
  { title: 'Skatepark Neon Rush', creator: '@rome', score: '✨ 3.6k', tag: '#nightshift' }
];

const remixChallenges = [
  {
    title: 'Loop Flip',
    detail: 'Take a Pulse recording and flip it into a 15s visual explosion.'
  },
  {
    title: 'Sticker Pack Drop',
    detail: 'Design animated sticker loops for crew chats and leaderboards.'
  }
];

const shoutOuts = [
  { name: 'Crew Nova', reason: 'Daily streak reset for 12 members' },
  { name: 'Money Moves Squad', reason: 'Hit 10k community savings milestone' },
  { name: 'Studio Synth Kids', reason: 'Dropped a collaborative hyperpop pack' }
];

const SpotlightScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Highlight reels" caption="Most boosted drops from the last 24 hours">
        <View style={styles.reelStack}>
          {highlightReels.map((reel) => (
            <View key={reel.title} style={styles.reelCard}>
              <View style={styles.reelHeader}>
                <Text style={styles.reelTitle}>{reel.title}</Text>
                <Text style={styles.reelScore}>{reel.score}</Text>
              </View>
              <Text style={styles.reelCreator}>{reel.creator}</Text>
              <Text style={styles.reelTag}>{reel.tag}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Remix challenges" caption="Flex your skills and collect boost points">
        <View style={styles.challengeStack}>
          {remixChallenges.map((challenge) => (
            <View key={challenge.title} style={styles.challengeCard}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDetail}>{challenge.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Shout-outs" caption="Crew moments getting loud love">
        <View style={styles.shoutList}>
          {shoutOuts.map((shout) => (
            <View key={shout.name} style={styles.shoutRow}>
              <View style={[styles.shoutBadge, { borderColor: meta.accent }]}>🎉</View>
              <View style={styles.shoutCopy}>
                <Text style={styles.shoutName}>{shout.name}</Text>
                <Text style={styles.shoutReason}>{shout.reason}</Text>
              </View>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  reelStack: {
    gap: 16
  },
  reelCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.14)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    gap: 10
  },
  reelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reelTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  reelScore: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '700'
  },
  reelCreator: {
    color: 'rgba(226, 232, 240, 0.85)',
    fontSize: 14
  },
  reelTag: {
    color: '#fde68a',
    fontSize: 13,
    fontWeight: '600'
  },
  challengeStack: {
    gap: 16
  },
  challengeCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 8
  },
  challengeTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  challengeDetail: {
    color: 'rgba(203, 213, 225, 0.82)',
    fontSize: 14,
    lineHeight: 20
  },
  shoutList: {
    gap: 14
  },
  shoutRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)'
  },
  shoutBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shoutCopy: {
    flex: 1,
    gap: 4
  },
  shoutName: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  shoutReason: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default SpotlightScreen;
