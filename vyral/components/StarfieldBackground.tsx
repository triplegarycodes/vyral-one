import React, { useEffect, useMemo } from 'react';
import { useWindowDimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

const STAR_COUNT = 70;
const LINK_COUNT = 30;

type Star = {
  x: number;
  y: number;
  size: number;
  drift: number;
  phase: number;
};

type Link = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
};

type StarfieldBackgroundProps = {
  parallaxOffset?: number;
};

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({ parallaxOffset = 0 }) => {
  const { width, height } = useWindowDimensions();
  const progress = useSharedValue(0);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 16000 }), -1);
    shimmer.value = withRepeat(withTiming(1, { duration: 4200 }), -1, true);
  }, [progress, shimmer]);

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.6 + 0.6,
      drift: Math.random() * 28 + 12,
      phase: Math.random()
    }));
  }, [width, height]);

  const links = useMemo<Link[]>(() => {
    return Array.from({ length: LINK_COUNT }).map(() => ({
      x1: Math.random() * width,
      y1: Math.random() * height,
      x2: Math.random() * width,
      y2: Math.random() * height,
      delay: Math.random()
    }));
  }, [width, height]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((star, index) => (
        <StarSprite key={`star-${index}`} star={star} progress={progress} shimmer={shimmer} parallaxOffset={parallaxOffset} />
      ))}
      {links.map((link, index) => (
        <LinkSprite key={`link-${index}`} link={link} progress={progress} />
      ))}
    </View>
  );
};

type StarSpriteProps = {
  star: Star;
  progress: Animated.SharedValue<number>;
  shimmer: Animated.SharedValue<number>;
  parallaxOffset: number;
};

const StarSprite: React.FC<StarSpriteProps> = ({ star, progress, shimmer, parallaxOffset }) => {
  const style = useAnimatedStyle(() => {
    const loop = (progress.value + star.phase) % 1;
    const offset = Math.sin(loop * Math.PI * 2) * star.drift;
    const shimmerValue = Math.sin(((shimmer.value + star.phase) % 1) * Math.PI * 2);
    return {
      position: 'absolute',
      top: star.y + parallaxOffset * 0.1,
      left: star.x + offset,
      width: star.size,
      height: star.size,
      borderRadius: star.size / 2,
      opacity: interpolate(Math.abs(shimmerValue), [0, 1], [0.3, 0.9]),
      backgroundColor: interpolateColor(loop, [0, 0.5, 1], ['#10132F', '#6D5BFE', '#D946EF'])
    };
  }, [star, parallaxOffset]);

  return <Animated.View style={style} />;
};

type LinkSpriteProps = {
  link: Link;
  progress: Animated.SharedValue<number>;
};

const LinkSprite: React.FC<LinkSpriteProps> = ({ link, progress }) => {
  const style = useAnimatedStyle(() => {
    const loop = (progress.value + link.delay) % 1;
    const opacity = interpolate(loop, [0, 0.4, 0.8, 1], [0, 0.6, 0.6, 0], Extrapolation.CLAMP);
    const scale = interpolate(loop, [0, 0.5, 1], [0.8, 1, 0.8], Extrapolation.CLAMP);
    const centerX = (link.x1 + link.x2) / 2;
    const centerY = (link.y1 + link.y2) / 2;
    const width = Math.hypot(link.x2 - link.x1, link.y2 - link.y1);
    const angle = (Math.atan2(link.y2 - link.y1, link.x2 - link.x1) * 180) / Math.PI;
    return {
      position: 'absolute',
      width,
      height: 1.4,
      opacity,
      backgroundColor: '#2D45B8',
      transform: [
        { translateX: centerX },
        { translateY: centerY },
        { rotate: `${angle}deg` },
        { translateX: -width / 2 },
        { scaleX: scale }
      ]
    };
  }, [link]);

  return <Animated.View style={style} />;
};
