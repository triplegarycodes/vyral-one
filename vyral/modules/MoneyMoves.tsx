import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.moneymoves;

const stats = [
  { label: 'Quest streak', value: '21 days', hint: 'Your best run yet' },
  { label: 'Collective stash', value: '$12.4k', hint: 'Crew savings goal at 83%' }
];

const questBoard = [
  { title: 'Mini-Invest Mission', reward: '+350 XP', detail: 'Sim trade 3 companies and journal the moves.' },
  { title: 'Budget Glow-Up', reward: '+240 XP', detail: 'Track spending in three categories for 7 days.' },
  { title: 'Side Hustle Sprint', reward: '+400 XP', detail: 'Pitch a micro-service and get 5 sign-ups.' }
];

const budgetSnapshots = [
  { label: 'Essentials', percent: 0.58 },
  { label: 'Dream stash', percent: 0.22 },
  { label: 'Glow fund', percent: 0.14 }
];

const workshops = [
  { time: 'Thu 5p', title: 'Creator Tax Basics', detail: 'Live Q&A with teen CPA mentors.' },
  { time: 'Fri 6:30p', title: 'Investing Playground', detail: 'Practice options in a no-risk sandbox.' },
  { time: 'Sat 11a', title: 'Crew Fund Setup', detail: 'Build a squad savings pot in 20 minutes.' }
];

const MoneyMovesScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Quest board" caption="Stack XP and badges with these weekly missions">
        <View style={styles.questStack}>
          {questBoard.map((quest) => (
            <View key={quest.title} style={styles.questCard}>
              <View style={styles.questHeader}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questReward}>{quest.reward}</Text>
              </View>
              <Text style={styles.questDetail}>{quest.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Budget snapshot" caption="Where your flow landed this month">
        <View style={styles.snapshotStack}>
          {budgetSnapshots.map((snap) => (
            <View key={snap.label} style={styles.snapshotRow}>
              <View style={styles.snapshotMeta}>
                <Text style={styles.snapshotLabel}>{snap.label}</Text>
                <Text style={styles.snapshotPercent}>{Math.round(snap.percent * 100)}%</Text>
              </View>
              <View style={styles.snapshotBar}>
                <View
                  style={[
                    styles.snapshotFill,
                    { width: `${Math.round(snap.percent * 100)}%`, backgroundColor: meta.accent }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Workshops" caption="Live labs to keep your money energy up">
        <View style={styles.workshopList}>
          {workshops.map((shop) => (
            <View key={shop.title} style={styles.workshopCard}>
              <Text style={styles.workshopTime}>{shop.time}</Text>
              <Text style={styles.workshopTitle}>{shop.title}</Text>
              <Text style={styles.workshopDetail}>{shop.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  questStack: {
    gap: 16
  },
  questCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    gap: 10
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  questReward: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: '700'
  },
  questDetail: {
    color: 'rgba(203, 213, 225, 0.85)',
    fontSize: 14,
    lineHeight: 20
  },
  snapshotStack: {
    gap: 16
  },
  snapshotRow: {
    gap: 10
  },
  snapshotMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  snapshotLabel: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600'
  },
  snapshotPercent: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: '600'
  },
  snapshotBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#0f172a'
  },
  snapshotFill: {
    height: '100%',
    borderRadius: 999
  },
  workshopList: {
    gap: 16
  },
  workshopCard: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    gap: 6
  },
  workshopTime: {
    color: 'rgba(74, 222, 128, 0.85)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  workshopTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  workshopDetail: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default MoneyMovesScreen;
