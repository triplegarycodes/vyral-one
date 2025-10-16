import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/tokens';
import { TreeProgressCard } from './components/TreeProgressCard';
import { useTreeLogic } from './hooks/useTreeLogic';

const TreeScreen: React.FC = () => {
  const { user } = useAuth();
  const { xp, streak } = useTreeLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tree</Text>
      <Text style={styles.subheading}>Visualize your growth and track your streaks.</Text>
      <TreeProgressCard xp={xp} streak={streak} />
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

export default TreeScreen;
