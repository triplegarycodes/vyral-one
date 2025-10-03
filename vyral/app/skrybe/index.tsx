import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { moduleAccents } from "@/theme/tokens";

const SkrybeScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const entriesQuery = useQuery({
    queryKey: ["entries", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("entries")
        .select("id, content, created_at")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const createEntry = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("Not authenticated");
      if (!content.trim()) {
        throw new Error("Write something first");
      }
      const { error } = await client
        .from("entries")
        .insert({ user_id: session.user.id, content: content.trim() });
      if (error) throw error;
    },
    onSuccess: async () => {
      setContent("");
      await queryClient.invalidateQueries({ queryKey: ["entries", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to save", error.message)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to start chronicling your Skrybe.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 160 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Skrybe your flow
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Capture thoughts, ideas, and future AI prompts.
      </Text>
      <Card accentColor={moduleAccents.skrybe} className="mt-6 p-4">
        <Text className="mb-3 text-sm uppercase text-white/50" style={{ fontFamily: "Inter_600SemiBold" }}>
          New entry
        </Text>
        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="Stream your consciousness..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          style={{
            minHeight: 150,
            fontFamily: "Inter_400Regular",
            color: "#fff",
            textAlignVertical: "top"
          }}
        />
        <Button
          label={createEntry.isPending ? "Saving..." : "Save entry"}
          onPress={() => createEntry.mutate()}
          accentColor={moduleAccents.skrybe}
          disabled={createEntry.isPending}
        />
        <Text className="mt-4 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
          AI synthesis arriving soon.
        </Text>
      </Card>
      <View className="mt-10" style={{ rowGap: 16 }}>
        {entriesQuery.data?.map((entry) => (
          <Card key={entry.id} accentColor={moduleAccents.skrybe} className="p-4">
            <Text className="text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
              {new Date(entry.created_at).toLocaleString()}
            </Text>
            <Text className="mt-2 text-base text-white" style={{ fontFamily: "Inter_400Regular" }}>
              {entry.content}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default SkrybeScreen;
