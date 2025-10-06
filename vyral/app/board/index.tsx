import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSupabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useThemeTokens } from "@/theme/ThemeProvider";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "doing", title: "Doing" },
  { key: "done", title: "Done" }
] as const;

type ColumnKey = (typeof columns)[number]["key"];

const BoardScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const [taskTitle, setTaskTitle] = useState("");
  const { moduleAccents } = useThemeTokens();

  const tasksQuery = useQuery({
    queryKey: ["tasks", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("tasks")
        .select("id, title, status, created_at")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const createTask = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("Not authenticated");
      if (!taskTitle.trim()) throw new Error("Give it a title");
      const { error } = await client
        .from("tasks")
        .insert({ user_id: session.user.id, title: taskTitle.trim(), status: "todo" });
      if (error) throw error;
    },
    onSuccess: async () => {
      setTaskTitle("");
      await queryClient.invalidateQueries({ queryKey: ["tasks", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to create", error.message)
  });

  const moveTask = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ColumnKey }) => {
      const { error } = await client.from("tasks").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", session?.user.id] });
    },
    onError: (error) => Alert.alert("Unable to move task", error.message)
  });

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to pilot your Board.
        </Text>
      </View>
    );
  }

  const tasksByColumn: Record<ColumnKey, typeof tasksQuery.data> = {
    todo: tasksQuery.data?.filter((task) => task.status === "todo") ?? [],
    doing: tasksQuery.data?.filter((task) => task.status === "doing") ?? [],
    done: tasksQuery.data?.filter((task) => task.status === "done") ?? []
  };

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 160 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Board your missions
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        Flow between lanes with swift neon transitions.
      </Text>
      <Card accentColor={moduleAccents.board} className="mt-6 p-4">
        <Text className="mb-3 text-sm uppercase text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
          Add task
        </Text>
        <Input label="Title" value={taskTitle} onChangeText={setTaskTitle} />
        <Button
          label={createTask.isPending ? "Adding..." : "Add to board"}
          onPress={() => createTask.mutate()}
          accentColor={moduleAccents.board}
        />
      </Card>
      <View className="mt-10 flex-row" style={{ marginHorizontal: -8 }}>
        {columns.map((column) => (
          <View key={column.key} style={{ flex: 1, marginHorizontal: 8 }}>
            <Text className="mb-3 text-center text-sm uppercase text-white/60" style={{ fontFamily: "Inter_600SemiBold" }}>
              {column.title}
            </Text>
            <View>
              {tasksByColumn[column.key].map((task) => (
                <Card key={task.id} accentColor={moduleAccents.board} className="mb-4 p-4">
                  <Text className="text-base text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                    {task.title}
                  </Text>
                  <Text className="mt-2 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
                    {new Date(task.created_at).toLocaleString()}
                  </Text>
                  <View className="mt-3 flex-row" style={{ marginHorizontal: -6 }}>
                    {columns
                      .filter((col) => col.key !== column.key)
                      .map((target) => (
                        <View key={target.key} style={{ flex: 1, marginHorizontal: 6 }}>
                          <Button
                            label={target.title}
                            onPress={() => moveTask.mutate({ id: task.id, status: target.key })}
                            accentColor={moduleAccents.board}
                            variant="secondary"
                          />
                        </View>
                      ))}
                  </View>
                </Card>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BoardScreen;
