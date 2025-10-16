import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/tokens';
import { useStrykeLogic } from './hooks/useStrykeLogic';
import { StrykeScenarioCard } from './components/StrykeScenarioCard';

const StrykeScreen: React.FC = () => {
  const { user } = useAuth();
  const { scenario } = useStrykeLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Stryke</Text>
      <Text style={styles.subheading}>Make choices, discover branches, and evolve your path.</Text>
      <StrykeScenarioCard scenario={scenario} />
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

export default StrykeScreen;
