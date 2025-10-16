import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useLyfeLogic } from './hooks/useLyfeLogic';
import { LyfeQuestList } from './components/LyfeQuestList';
import { palette } from '@/theme/tokens';

const LyfeScreen: React.FC = () => {
  const { user } = useAuth();
  const { quests } = useLyfeLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Lyfe</Text>
      <Text style={styles.subheading}>Complete quests to boost your financial IQ.</Text>
      <LyfeQuestList quests={quests.length ? quests : [{ id: 'sample', title: 'Draft a starter budget' }]} />
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

export default LyfeScreen;
