import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { GradientBackground } from '@/components/GradientBackground';
import { ModuleCard } from '@/components/ModuleCard';
import { palette } from '@/theme/tokens';

const LoginScreen: React.FC = () => {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithMagicLink(email);
      Alert.alert('Check your inbox', 'Use the magic link to finish signing in.');
    } catch (error: any) {
      Alert.alert('Login failed', error.message ?? 'Unknown error');
    }
  };

  return (
    <GradientBackground>
      <ModuleCard
        title="Login"
        description="Receive a magic link to continue"
        accent={palette.accents.kor}
        locked={false}
        onPress={handleLogin}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@email.com"
        placeholderTextColor={palette.textSecondary}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 24,
    backgroundColor: palette.surface,
    color: palette.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14
  }
});

export default LoginScreen;
