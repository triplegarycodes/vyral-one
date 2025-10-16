import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useBoardLogic } from './hooks/useBoardLogic';
import { BoardOverview } from './components/BoardOverview';
import { palette } from '@/theme/tokens';

const BoardScreen: React.FC = () => {
  const { user } = useAuth();
  const { missions } = useBoardLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Board</Text>
      <Text style={styles.subheading}>Plan quests, goals, and missions with realtime sync.</Text>
      <BoardOverview missionCount={missions.length} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#020617'
  },
  heading: {
    color: palette.textPrimary,
    fontSize: 32,
    fontWeight: '700'
  },
  subheading: {
    color: palette.textSecondary,
    fontSize: 16
  }
});

export default BoardScreen;
