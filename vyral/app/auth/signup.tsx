import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { GradientBackground } from '@/components/GradientBackground';
import { ModuleCard } from '@/components/ModuleCard';
import { palette } from '@/theme/tokens';

const SignupScreen: React.FC = () => {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      await signInWithMagicLink(email);
      Alert.alert('Verify email', 'Check your inbox to activate your account.');
    } catch (error: any) {
      Alert.alert('Signup failed', error.message ?? 'Unknown error');
    }
  };

  return (
    <GradientBackground>
      <ModuleCard
        title="Create account"
        description="Magic link onboarding keeps it simple"
        accent={palette.accents.vyra}
        locked={false}
        onPress={handleSignup}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="teen@vyra.world"
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

export default SignupScreen;
