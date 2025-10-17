import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/tokens';

export type ModuleStat = {
  label: string;
  value: string;
  hint?: string;
};

type ModuleLayoutProps = {
  title: string;
  subtitle: string;
  accent: string;
  stats?: ModuleStat[];
  children: ReactNode;
};

export type ModuleSectionProps = {
  title: string;
  caption?: string;
  children: ReactNode;
};

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  title,
  subtitle,
  accent,
  stats,
  children
}) => {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[accent, `${accent}55`, '#020617']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroHeader}>
          <Text style={styles.heroEyebrow}>Vyral Modules</Text>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.heroSubtitle}>{subtitle}</Text>
        </View>
        {stats && stats.length > 0 ? (
          <View style={styles.statRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                {stat.hint ? <Text style={styles.statHint}>{stat.hint}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </LinearGradient>
      <View style={styles.sections}>{children}</View>
    </ScrollView>
  );
};

export const ModuleSection: React.FC<ModuleSectionProps> = ({ title, caption, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617'
  },
  container: {
    padding: 24,
    paddingBottom: 64,
    gap: 28
  },
  hero: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 20
  },
  heroHeader: {
    gap: 10
  },
  heroEyebrow: {
    color: '#e0f2fe',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  heroTitle: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '700'
  },
  heroSubtitle: {
    color: 'rgba(226, 232, 240, 0.85)',
    fontSize: 15,
    lineHeight: 20
  },
  statRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14
  },
  statCard: {
    flexBasis: '47%',
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)'
  },
  statLabel: {
    color: 'rgba(148, 163, 184, 0.85)',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  statValue: {
    color: palette.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8
  },
  statHint: {
    color: 'rgba(203, 213, 225, 0.75)',
    marginTop: 6,
    fontSize: 12
  },
  sections: {
    gap: 32
  },
  section: {
    gap: 18
  },
  sectionHeader: {
    gap: 8
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 22,
    fontWeight: '700'
  },
  sectionCaption: {
    color: 'rgba(148, 163, 184, 0.9)',
    fontSize: 14,
    lineHeight: 20
  }
});

export default ModuleLayout;
