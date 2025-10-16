import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { palette } from '@/theme/tokens';

type GradientBackgroundProps = React.PropsWithChildren<{ style?: object }>;

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style }) => {
  return (
    <LinearGradient colors={palette.backgroundGradient} style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 48
  }
});
