import React, { useState } from "react";
import { Alert, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useSupabase } from "@/lib/supabase";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    username: z.string().min(2, "Username required")
  })
  .refine((values) => !values.username.includes(" "), {
    path: ["username"],
    message: "No spaces allowed"
  });

type SignUpForm = z.infer<typeof signupSchema>;

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const { client } = useSupabase();
  const [form, setForm] = useState<SignUpForm>({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpForm, string>>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldError = result.error.issues[0];
      setErrors({ [fieldError.path[0] as keyof SignUpForm]: fieldError.message });
      return;
    }
    setErrors({});
    setLoading(true);
    const { data, error } = await client.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { username: form.username }
      }
    });
    setLoading(false);

    if (error) {
      Alert.alert("Sign up failed", error.message);
      return;
    }

    if (data.session) {
      const { error: profileError } = await client.from("users").upsert({
        id: data.user?.id,
        email: form.email,
        username: form.username
      });
      if (profileError) {
        Alert.alert("Profile error", profileError.message);
      }
      router.replace("/kor");
    } else {
      Alert.alert("Check your email", "Confirm your email address to continue.");
    }
  };

  return (
    <View className="flex-1 justify-center px-8">
      <Text className="mb-2 text-4xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Create your Kor
      </Text>
      <Text className="mb-8 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Assemble your Vyral identity.
      </Text>
      <Input
        label="Username"
        value={form.username}
        onChangeText={(username) => setForm((prev) => ({ ...prev, username }))}
        error={errors.username}
      />
      <Input
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
        error={errors.email}
      />
      <Input
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(password) => setForm((prev) => ({ ...prev, password }))}
        error={errors.password}
      />
      <Button label={loading ? "Creating..." : "Sign Up"} onPress={onSubmit} disabled={loading} />
      <Text
        className="mt-10 text-center text-sm text-white/60"
        onPress={() => router.push("/auth/login")}
        style={{ fontFamily: "Inter_400Regular" }}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
};

export default SignupScreen;
