import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { palette } from '@/theme/tokens';
import { useZoneLogic } from './hooks/useZoneLogic';
import { ZoneMessagePreview } from './components/ZoneMessagePreview';

const ZoneScreen: React.FC = () => {
  const { messages } = useZoneLogic();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Zone</Text>
      <Text style={styles.subheading}>Hang with your crew, share updates, and celebrate wins.</Text>
      {messages.length === 0
        ? [
            <ZoneMessagePreview key="welcome" author="System" body="Start a conversation with your crew." />
          ]
        : messages.map((message) => (
            <ZoneMessagePreview key={message.id} author={message.sender_id ?? 'Anon'} body={message.body} />
          ))}
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

export default ZoneScreen;
