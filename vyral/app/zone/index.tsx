import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { ProgressRing } from "@/components/Progress";
import { useThemeTokens } from "@/theme/ThemeProvider";
import { moduleAccents } from "@/theme/tokens";
import { useSupabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";
import { awardXp, calculateFocusSessionXp } from "@/lib/xp";
const focusDurations = [15, 25, 45];

type FocusSession = {
  id: string;
  duration_seconds: number;
  earned_xp: number;
  was_cancelled: boolean;
  completed_at: string;
};

const ZoneScreen: React.FC = () => {
  const { client, session } = useSupabase();
  const queryClient = useQueryClient();
  const profile = useUserStore((state) => state.profile);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(selectedDuration * 60);
  const [active, setActive] = useState(false);
  const { moduleAccents } = useThemeTokens();
  const plannedSecondsRef = useRef(selectedDuration * 60);

  const { data: recentSessions, isLoading: sessionsLoading } = useQuery<FocusSession[]>({
    queryKey: ["focus_sessions", session?.user.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("focus_sessions")
        .select("id, duration_seconds, earned_xp, was_cancelled, completed_at")
        .eq("user_id", session!.user.id)
        .order("completed_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: Boolean(session)
  });

  const logSessionMutation = useMutation({
    mutationFn: async ({ durationSeconds, cancelled }: { durationSeconds: number; cancelled: boolean }) => {
      if (!session) throw new Error("Not authenticated");

      const earnedXp = calculateFocusSessionXp(durationSeconds);
      const { data, error } = await client
        .from("focus_sessions")
        .insert({
          user_id: session.user.id,
          duration_seconds: durationSeconds,
          earned_xp: earnedXp,
          was_cancelled: cancelled
        })
        .select("id, duration_seconds, earned_xp, was_cancelled, completed_at")
        .single();

      if (error) throw error;

      if (earnedXp > 0) {
        await awardXp(client, session.user.id, earnedXp);
      }

      return data as FocusSession;
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["focus_sessions", session?.user.id] });

      if (!data) return;

      const durationText =
        data.duration_seconds >= 60
          ? `${Math.round(data.duration_seconds / 60)} minute${
              Math.round(data.duration_seconds / 60) === 1 ? "" : "s"
            }`
          : `${data.duration_seconds} second${data.duration_seconds === 1 ? "" : "s"}`;
      const xpMessage = data.earned_xp > 0 ? ` • +${data.earned_xp} XP` : "";

      if (variables.cancelled) {
        Alert.alert("Session saved", `Logged ${durationText}${xpMessage}.`);
      } else {
        Alert.alert("Focus complete", `Logged ${durationText}${xpMessage}.`);
      }
    },
    onError: (error) => {
      Alert.alert("Session not saved", error.message);
    }
  });

  const finalizeSession = useCallback(
    (elapsedSeconds: number, cancelled: boolean) => {
      if (!session) return;

      const sanitizedSeconds = Math.max(0, Math.round(elapsedSeconds));
      if (sanitizedSeconds === 0) return;

      logSessionMutation.mutate({ durationSeconds: sanitizedSeconds, cancelled });
    },
    [logSessionMutation, session]
  );

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active || secondsLeft > 0) {
      return;
    }

    finalizeSession(plannedSecondsRef.current, false);
    setActive(false);
    plannedSecondsRef.current = selectedDuration * 60;
    setSecondsLeft(selectedDuration * 60);
  }, [secondsLeft, active, finalizeSession, selectedDuration]);

  const progress = useMemo(() => secondsLeft / (selectedDuration * 60), [secondsLeft, selectedDuration]);

  const toggleTimer = () => {
    if (active) {
      setActive(false);
      return;
    }

    if (secondsLeft === 0) {
      setSecondsLeft(selectedDuration * 60);
      plannedSecondsRef.current = selectedDuration * 60;
    } else if (secondsLeft === selectedDuration * 60) {
      plannedSecondsRef.current = selectedDuration * 60;
    }
    setActive(true);
  };

  const resetTimer = () => {
    if (session && (active || secondsLeft < plannedSecondsRef.current)) {
      const elapsedSeconds = plannedSecondsRef.current - secondsLeft;
      finalizeSession(elapsedSeconds, true);
    }
    setActive(false);
    setSecondsLeft(selectedDuration * 60);
    plannedSecondsRef.current = selectedDuration * 60;
  };

  const onSelect = (minutes: number) => {
    setSelectedDuration(minutes);
    setSecondsLeft(minutes * 60);
    setActive(false);
    plannedSecondsRef.current = minutes * 60;
  };

  const formatSessionTimestamp = useCallback((iso: string) => {
    const date = new Date(iso);
    try {
      const dateText = date.toLocaleDateString();
      const timeText = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `${dateText} • ${timeText}`;
    } catch (error) {
      return date.toISOString().replace("T", " ").slice(0, 16);
    }
  }, []);

  const totalMinutes = useMemo(() => {
    if (!recentSessions?.length) return 0;
    return Math.round(recentSessions.reduce((acc, session) => acc + session.duration_seconds, 0) / 60);
  }, [recentSessions]);

  const totalXp = useMemo(() => {
    if (!recentSessions?.length) return 0;
    return recentSessions.reduce((acc, session) => acc + session.earned_xp, 0);
  }, [recentSessions]);

  const streakCount = useMemo(() => {
    if (!recentSessions?.length) return 0;

    const uniqueDays = Array.from(
      new Set(
        recentSessions.map((session) => new Date(session.completed_at).toISOString().slice(0, 10))
      )
    ).sort((a, b) => (a > b ? -1 : 1));

    let streak = 0;
    let expectedTime = (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.getTime();
    })();

    for (const dayKey of uniqueDays) {
      const dayDate = new Date(dayKey);
      dayDate.setHours(0, 0, 0, 0);
      const dayTime = dayDate.getTime();
      const diffDays = Math.round((expectedTime - dayTime) / 86400000);

      if (diffDays === 0) {
        streak += 1;
        expectedTime = dayTime - 86400000;
      } else if (diffDays === 1 && streak === 0) {
        streak += 1;
        expectedTime = dayTime - 86400000;
      } else {
        break;
      }
    }

    return streak;
  }, [recentSessions]);

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-center text-lg text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to log focus sessions and earn XP.
        </Text>
      </View>
    );
  }

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(secondsLeft % 60)
    .toString()
    .padStart(2, "0");

  return (
    <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 120 }}>
      <Text className="text-3xl text-white" style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
        Enter the Zone
      </Text>
      <Text className="mt-2 text-base text-white/70" style={{ fontFamily: "Inter_400Regular" }}>
        {profile?.username
          ? `${profile.username}, your neon sanctuary is ready.`
          : "Pulse into deep focus with neon ambience."}
      </Text>
      <View className="mt-10 items-center">
        <ProgressRing progress={progress} label={`${minutes}:${seconds}`} accentColor={moduleAccents.zone} />
      </View>
      <View className="mt-12 flex-row justify-between" style={{ marginHorizontal: -6 }}>
        {focusDurations.map((duration) => (
          <View key={duration} style={{ flex: 1, marginHorizontal: 6 }}>
            <Button
              label={`${duration}m`}
              onPress={() => onSelect(duration)}
              accentColor={duration === selectedDuration ? moduleAccents.zone : undefined}
              variant={duration === selectedDuration ? "primary" : "secondary"}
            />
          </View>
        ))}
      </View>
      <View className="mt-12">
        <View style={{ marginBottom: 16 }}>
          <Button
            label={active ? "Pause" : "Start"}
            onPress={toggleTimer}
            accentColor={moduleAccents.zone}
          />
        </View>
        <Button label="Reset" onPress={resetTimer} variant="secondary" />
        {logSessionMutation.isPending && (
          <Text className="mt-4 text-center text-xs text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
            Saving your focus run...
          </Text>
        )}
      </View>
      <View className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5">
        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
          Focus stats (last 10 sessions)
        </Text>
        <View className="mt-4" style={{ rowGap: 12 }}>
          <View className="flex-row justify-between">
            <Text className="text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
              Current streak
            </Text>
            <Text className="text-sm text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
              {streakCount} day{streakCount === 1 ? "" : "s"}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
              Minutes logged
            </Text>
            <Text className="text-sm text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
              {totalMinutes}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
              XP captured
            </Text>
            <Text className="text-sm text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
              {totalXp}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-10">
        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
          Recent sessions
        </Text>
        {sessionsLoading ? (
          <Text className="mt-3 text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
            Loading your focus history...
          </Text>
        ) : recentSessions?.length ? (
          <View className="mt-4" style={{ rowGap: 12 }}>
            {recentSessions.map((sessionItem) => {
              const durationLabel =
                sessionItem.duration_seconds >= 60
                  ? `${Math.round(sessionItem.duration_seconds / 60)} minute${
                      Math.round(sessionItem.duration_seconds / 60) === 1 ? "" : "s"
                    }`
                  : `${sessionItem.duration_seconds} second${
                      sessionItem.duration_seconds === 1 ? "" : "s"
                    }`;
              return (
                <View
                  key={sessionItem.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <Text className="text-base text-white" style={{ fontFamily: "Inter_600SemiBold" }}>
                    {durationLabel} • +{sessionItem.earned_xp} XP
                  </Text>
                  <Text className="mt-1 text-xs text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
                    {formatSessionTimestamp(sessionItem.completed_at)}
                  </Text>
                  {sessionItem.was_cancelled && (
                    <Text className="mt-1 text-xs text-white/50" style={{ fontFamily: "Inter_400Regular" }}>
                      Saved early
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <Text className="mt-3 text-sm text-white/60" style={{ fontFamily: "Inter_400Regular" }}>
            Start a focus block to build your streak and earn XP.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ZoneScreen;
