import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { ProgressRing } from "@/components/Progress";
import { moduleAccents } from "@/theme/tokens";

const focusDurations = [15, 25, 45];

const ZoneScreen: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(selectedDuration * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (secondsLeft === 0 && active) {
      setActive(false);
    }
  }, [secondsLeft, active]);

  const progress = useMemo(() => secondsLeft / (selectedDuration * 60), [secondsLeft, selectedDuration]);

  const toggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(selectedDuration * 60);
    }
    setActive((prev) => !prev);
  };

  const resetTimer = () => {
    setActive(false);
    setSecondsLeft(selectedDuration * 60);
  };

  const onSelect = (minutes: number) => {
    setSelectedDuration(minutes);
    setSecondsLeft(minutes * 60);
    setActive(false);
  };

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
        Pulse into deep focus with neon ambience.
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
              accentColor={duration === selectedDuration ? moduleAccents.zone : "rgba(255,255,255,0.3)"}
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
      </View>
    </ScrollView>
  );
};

export default ZoneScreen;
