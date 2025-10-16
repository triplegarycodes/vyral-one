import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { palette } from '@/theme/tokens';
import { KorChannelPreview } from './components/KorChannelPreview';
import { useKorLogic } from './hooks/useKorLogic';

const KorScreen: React.FC = () => {
  const { channels } = useKorLogic();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Kor</Text>
      <Text style={styles.subheading}>Coordinate squads, brainstorm in realtime, and sync wins.</Text>
      {channels.map((channel) => (
        <KorChannelPreview key={channel.id} channelName={channel.title} activeCount={channel.online_count} />
      ))}
      {channels.length === 0 ? (
        <KorChannelPreview channelName="#crew-hub" activeCount={3} />
      ) : null}
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

export default KorScreen;
