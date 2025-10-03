import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useSupabase } from "@/lib/supabase";
import { z } from "zod";
import { colors } from "@/theme/tokens";
import { FontAwesome } from "@expo/vector-icons";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters")
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { client } = useSupabase();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: signInError } = await client.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });
    setLoading(false);
    if (signInError) {
      Alert.alert("Login failed", signInError.message);
    } else {
      router.replace("/kor");
    }
  };

  const signInWithProvider = async (provider: "google" | "apple") => {
    const { error: authError } = await client.auth.signInWithOAuth({ provider });
    if (authError) {
      Alert.alert("OAuth Error", authError.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-8">
      <Text className="mb-2 text-4xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Welcome back
      </Text>
      <Text className="mb-8 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Log in to sync your Vyral Kor.
      </Text>
      <Input
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
      />
      <Input
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(password) => setForm((prev) => ({ ...prev, password }))}
        error={error ?? undefined}
      />
      <Button label={loading ? "Signing in..." : "Login"} onPress={onSubmit} disabled={loading} />
      <Text className="my-6 text-center text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
        or continue with
      </Text>
      <View className="flex-row justify-center">
        <View style={{ marginHorizontal: 8 }}>
          <Button
            label="Google"
            onPress={() => signInWithProvider("google")}
            accentColor={colors.neon.blue}
            icon={<FontAwesome name="google" size={18} color="#0a0f1e" />}
          />
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <Button
            label="Apple"
            onPress={() => signInWithProvider("apple")}
            accentColor={colors.neon.purple}
            icon={<FontAwesome name="apple" size={18} color="#0a0f1e" />}
          />
        </View>
      </View>
      <Text
        className="mt-10 text-center text-sm text-white/60"
        onPress={() => router.push("/auth/signup")}
        style={{ fontFamily: "Inter_400Regular" }}
      >
        Need an account? Sign up
      </Text>
    </View>
  );
};

export default LoginScreen;
