import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

const lessons = [
  { title: 'Micro-investing 101', detail: 'Build a $50 starter portfolio with low-risk boosts.' },
  { title: 'Budget remix', detail: 'Auto-sort your income streams and set flex goals.' },
  { title: 'Credit power-ups', detail: 'Simulate choices that raise your future score.' }
];

const MoneyMovesScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Money Moves</Text>
      <Text style={styles.subheading}>
        Learn how to stack smarter with interactive lessons and challenge streaks.
      </Text>
      <View style={styles.lessonList}>
        {lessons.map((lesson) => (
          <View key={lesson.title} style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDetail}>{lesson.detail}</Text>
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
  lessonList: {
    gap: 16
  },
  lessonCard: {
    backgroundColor: 'rgba(16,185,129,0.12)',
    borderColor: 'rgba(16,185,129,0.28)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 18,
    gap: 8
  },
  lessonTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  lessonDetail: {
    color: 'rgba(203,213,225,0.85)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default MoneyMovesScreen;
