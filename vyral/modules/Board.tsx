import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModuleLayout, ModuleSection } from './ModuleLayout';
import { MODULE_MAP } from './moduleRegistry';

const meta = MODULE_MAP.board;

const stats = [
  { label: 'Crew aligned', value: '12 members', hint: 'All check-ins submitted' },
  { label: 'Mission velocity', value: '92%', hint: 'Projected streak finish in 3 days' }
];

const missions = [
  { title: 'Launch zine microsite', progress: 0.64, owner: '@nova', due: 'Due Fri' },
  { title: 'Fundraise community drive', progress: 0.48, owner: '@kai', due: 'Due Sat' },
  { title: 'Drop Pulse highlight reel', progress: 0.82, owner: '@aria', due: 'Due Sun' }
];

const habits = [
  { label: 'Daily vibe log', streak: '21 day streak', health: 'glowing' },
  { label: 'Money Moves check-in', streak: '14 day streak', health: 'steady' },
  { label: 'Studio uploads', streak: '8 week streak', health: 'charging' }
];

const checkIns = [
  { time: 'Today 4p', title: 'Crew retro sync', detail: 'Pulse + Studio teams share highlights.' },
  { time: 'Tomorrow 7:30a', title: 'Life Lab sunrise standup', detail: 'Check hydration + focus missions.' }
];

const BoardScreen: React.FC = () => {
  return (
    <ModuleLayout title={meta.title} subtitle={meta.tagline} accent={meta.accent} stats={stats}>
      <ModuleSection title="Active missions" caption="Keep your squad aligned with priority stacks">
        <View style={styles.missionStack}>
          {missions.map((mission) => (
            <View key={mission.title} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDue}>{mission.due}</Text>
              </View>
              <Text style={styles.missionOwner}>Lead: {mission.owner}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.round(mission.progress * 100)}%`, backgroundColor: meta.accent }
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>{Math.round(mission.progress * 100)}% synced</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Crew habits" caption="Shared streaks powering your goals">
        <View style={styles.habitList}>
          {habits.map((habit) => (
            <View key={habit.label} style={styles.habitRow}>
              <View style={styles.habitMeta}>
                <Text style={styles.habitLabel}>{habit.label}</Text>
                <Text style={styles.habitStreak}>{habit.streak}</Text>
              </View>
              <Text style={styles.habitHealth}>{habit.health}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>

      <ModuleSection title="Next check-ins" caption="Stay ahead of syncs and celebrations">
        <View style={styles.checkList}>
          {checkIns.map((check) => (
            <View key={check.title} style={styles.checkCard}>
              <Text style={styles.checkTime}>{check.time}</Text>
              <Text style={styles.checkTitle}>{check.title}</Text>
              <Text style={styles.checkDetail}>{check.detail}</Text>
            </View>
          ))}
        </View>
      </ModuleSection>
    </ModuleLayout>
  );
};

const styles = StyleSheet.create({
  missionStack: {
    gap: 16
  },
  missionCard: {
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.35)',
    gap: 10
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  missionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700'
  },
  missionDue: {
    color: '#bfdbfe',
    fontSize: 13,
    fontWeight: '600'
  },
  missionOwner: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontSize: 14
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#0f172a'
  },
  progressFill: {
    height: '100%',
    borderRadius: 999
  },
  progressLabel: {
    color: '#bfdbfe',
    fontSize: 13,
    fontWeight: '600'
  },
  habitList: {
    gap: 16
  },
  habitRow: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
    gap: 8
  },
  habitMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  habitLabel: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  habitStreak: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '600'
  },
  habitHealth: {
    color: 'rgba(203, 213, 225, 0.82)',
    fontSize: 14
  },
  checkList: {
    gap: 16
  },
  checkCard: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
    gap: 6
  },
  checkTime: {
    color: 'rgba(147, 197, 253, 0.85)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  checkTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  checkDetail: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default BoardScreen;
