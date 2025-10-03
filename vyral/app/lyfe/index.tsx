import React, { useState } from "react";
import { View, Text, ScrollView, Modal, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FAB } from "@/components/FAB";
import { moduleAccents } from "@/theme/tokens";

const LyfeScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");

  const habitsQuery = useQuery({
    queryKey: ["habits", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("habits")
        .select("id, title, value, created_at")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const createHabit = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("Not authenticated");
      if (!title.trim()) throw new Error("Name your habit");
      const { error } = await client
        .from("habits")
        .insert({ user_id: session.user.id, title: title.trim(), value: 1 });
      if (error) throw error;
    },
    onSuccess: async () => {
      setTitle("");
      setModalVisible(false);
      await queryClient.invalidateQueries({ queryKey: ["habits", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to log", error.message)
  });

  const incrementHabit = useMutation({
    mutationFn: async (habitId: string) => {
      const habit = habitsQuery.data?.find((item) => item.id === habitId);
      const { error } = await client
        .from("habits")
        .update({ value: (habit?.value ?? 0) + 1 })
        .eq("id", habitId);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["habits", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to update", error.message)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to sync your Lyfe rituals.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 160 }}>
        <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
          Calibrate your Lyfe
        </Text>
        <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Track habits and moods in luminous cards.
        </Text>
        <View className="mt-8" style={{ rowGap: 16 }}>
          {habitsQuery.data?.map((habit) => (
            <Card key={habit.id} accentColor={moduleAccents.lyfe} className="p-4">
              <Text className="text-xl text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                {habit.title}
              </Text>
              <Text className="mt-2 text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
                Logged {habit.value ?? 0} times
              </Text>
              <Button
                label={incrementHabit.isPending ? "Logging..." : "Log again"}
                onPress={() => incrementHabit.mutate(habit.id)}
                accentColor={moduleAccents.lyfe}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
      <FAB label="New habit" onPress={() => setModalVisible(true)} accentColor={moduleAccents.lyfe} />
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/70 px-6">
          <Card accentColor={moduleAccents.lyfe} className="w-full p-6">
            <Text className="mb-4 text-lg text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              Create habit
            </Text>
            <Input label="Title" value={title} onChangeText={setTitle} />
            <Button
              label={createHabit.isPending ? "Saving..." : "Save"}
              onPress={() => createHabit.mutate()}
              accentColor={moduleAccents.lyfe}
            />
            <Button label="Cancel" onPress={() => setModalVisible(false)} variant="secondary" />
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default LyfeScreen;
