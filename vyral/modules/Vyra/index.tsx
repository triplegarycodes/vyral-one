import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/tokens';
import { useVyraLogic } from './hooks/useVyraLogic';
import { VyraProfileCard } from './components/VyraProfileCard';

const VyraScreen: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useVyraLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Vyra</Text>
      <Text style={styles.subheading}>Securely store your identity, preferences, and creations.</Text>
      <VyraProfileCard username={profile.username} bio={profile.bio} />
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

export default VyraScreen;
