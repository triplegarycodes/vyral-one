import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/tokens';
import { useSkrybeLogic } from './hooks/useSkrybeLogic';
import { SkrybePromptCard } from './components/SkrybePromptCard';

const SkrybeScreen: React.FC = () => {
  const { user } = useAuth();
  const { prompt } = useSkrybeLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Skrybe</Text>
      <Text style={styles.subheading}>Write, remix, and publish your stories.</Text>
      <SkrybePromptCard prompt={prompt} />
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

export default SkrybeScreen;
