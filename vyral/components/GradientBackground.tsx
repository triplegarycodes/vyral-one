import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/tokens';
import { StarfieldBackground } from '@/components/StarfieldBackground';

export type GradientBackgroundProps = React.PropsWithChildren<{
  style?: object;
  parallaxOffset?: number;
}>;

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style, parallaxOffset = 0 }) => {
  return (
    <View style={styles.container}>
      <StarfieldBackground parallaxOffset={parallaxOffset} />
      <LinearGradient colors={palette.backgroundGradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      <LinearGradient
        colors={palette.backgroundSecondary}
        style={[StyleSheet.absoluteFill, styles.noiseLayer]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      <View style={[styles.content, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundGradient[0]
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 48
  },
  noiseLayer: {
    opacity: 0.6
  }
});
