import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

export const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={palette.accents.kor} />
      <Text style={styles.text}>Preparing your Vyral world...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  text: {
    color: palette.textSecondary,
    fontSize: 16
  }
});
