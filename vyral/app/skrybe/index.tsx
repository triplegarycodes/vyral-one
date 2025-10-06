import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { moduleAccents } from "@/theme/tokens";
import { invokeSummarizeEntry, SummarizeEntryError } from "@/lib/summaries";

type Entry = {
  id: string;
  content: string;
  created_at: string;
  summary: string | null;
};
=======
import { useThemeTokens } from "@/theme/ThemeProvider";

const SkrybeScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  const { moduleAccents, colors } = useThemeTokens();
  const entriesQuery = useQuery({
    queryKey: ["entries", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("entries")
        .select("id, content, created_at, summary")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const summarizeEntryMutation = useMutation({
    mutationFn: async (entryId: string) => {
      setActiveEntryId(entryId);
      return await invokeSummarizeEntry(client, entryId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries", session?.user.id] });
    },
    onError: (error) => {
      if (error instanceof SummarizeEntryError || error instanceof Error) {
        Alert.alert("Unable to summarize", error.message);
      } else {
        Alert.alert("Unable to summarize", "Please try again later.");
      }
    },
    onSettled: () => setActiveEntryId(null)
  });

  const summarizeEntryState = useMemo(() => {
    return {
      isLoading: summarizeEntryMutation.isPending,
      activeId: activeEntryId,
      lastVariables: summarizeEntryMutation.variables,
      error: summarizeEntryMutation.error
    };
  }, [summarizeEntryMutation.error, summarizeEntryMutation.isPending, summarizeEntryMutation.variables, activeEntryId]);

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
          placeholderTextColor={colors.text.secondary}
          style={{
            minHeight: 150,
            fontFamily: "Inter_400Regular",
            color: colors.text.primary,
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
          Use the AI summary below each entry to quickly recap your thoughts.
        </Text>
      </Card>
      <View className="mt-10" style={{ rowGap: 16 }}>
        {(entriesQuery.data as Entry[] | undefined)?.map((entry) => (
          <Card key={entry.id} accentColor={moduleAccents.skrybe} className="p-4" style={{ rowGap: 12 }}>
            <Text className="text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
              {new Date(entry.created_at).toLocaleString()}
            </Text>
            <Text className="mt-2 text-base text-white" style={{ fontFamily: "Inter_400Regular" }}>
              {entry.content}
            </Text>
            <View style={{ rowGap: 8 }}>
              <Button
                label={
                  summarizeEntryState.isLoading && summarizeEntryState.activeId === entry.id
                    ? "Summarizing..."
                    : entry.summary
                      ? "Refresh summary"
                      : "Generate summary"
                }
                onPress={() => summarizeEntryMutation.mutate(entry.id)}
                accentColor={moduleAccents.skrybe}
                disabled={summarizeEntryState.isLoading && summarizeEntryState.activeId === entry.id}
              />
              <View className="rounded-md bg-white/5 p-3">
                {summarizeEntryState.isLoading && summarizeEntryState.activeId === entry.id ? (
                  <Text className="text-sm text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
                    Crafting your recap...
                  </Text>
                ) : summarizeEntryMutation.isError && summarizeEntryState.lastVariables === entry.id ? (
                  <Text className="text-sm text-red-300" style={{ fontFamily: "Inter_400Regular" }}>
                    {summarizeEntryMutation.error instanceof Error
                      ? summarizeEntryMutation.error.message
                      : "Something went wrong."}
                  </Text>
                ) : entry.summary ? (
                  <Text className="text-sm text-white" style={{ fontFamily: "Inter_400Regular" }}>
                    {entry.summary}
                  </Text>
                ) : (
                  <Text className="text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
                    No summary yet. Generate one to see the highlights.
                  </Text>
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default SkrybeScreen;
