import React, { useMemo } from 'react';
import { ExpoRoot } from 'expo-router';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAppBoot } from '@/hooks/useAppBoot';

export default function App() {
  const { ready } = useAppBoot();
  const context = useMemo(() => require.context('./app'), []);

  if (!ready) {
    return <LoadingScreen />;
  }

  return <ExpoRoot context={context} />;
}
