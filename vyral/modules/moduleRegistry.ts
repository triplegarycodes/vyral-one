import { palette } from '@/theme/tokens';

export type ModuleKey = 'pulse' | 'studio' | 'spotlight' | 'moneymoves' | 'lifelab' | 'board';

export type ModuleMeta = {
  key: ModuleKey;
  title: string;
  tagline: string;
  blurb: string;
  accent: string;
  route: `/(modules)/${string}`;
  quickAction?: {
    title: string;
    emoji: string;
  };
  learningTracks?: Array<{
    key: string;
    title: string;
    progress: number;
  }>;
  liveSignals?: Array<{
    key: string;
    title: string;
    time: string;
  }>;
};

const accent = palette.accents;

export const MODULES: ModuleMeta[] = [
  {
    key: 'pulse',
    title: 'Pulse',
    tagline: 'Live social radar that keeps your crew locked in.',
    blurb: 'Catch the latest drops',
    accent: accent.pulse,
    route: '/(modules)/pulse',
    quickAction: { title: 'Start a vibe check', emoji: '🌀' },
    liveSignals: [
      { key: 'spotlight-showcase', title: 'Spotlight Showcase', time: 'Live now' },
      { key: 'sync-room', title: 'Sync Room: Neon District', time: 'In 12m' }
    ]
  },
  {
    key: 'studio',
    title: 'Studio',
    tagline: 'Creative workspaces loaded with collab-ready tools.',
    blurb: 'Create audio + visuals',
    accent: accent.studio,
    route: '/(modules)/studio',
    quickAction: { title: 'Drop new art', emoji: '🎨' },
    liveSignals: [
      { key: 'beat-cypher', title: 'Beat Cypher: Hyperpop', time: 'Starts in 35m' }
    ]
  },
  {
    key: 'spotlight',
    title: 'Spotlight',
    tagline: 'Share big wins, highlight reels, and crew shout-outs.',
    blurb: 'Flex your best moments',
    accent: accent.spotlight,
    route: '/(modules)/spotlight',
    liveSignals: [
      { key: 'feature-wave', title: 'Feature Wave: Motion Stories', time: 'Live now' }
    ]
  },
  {
    key: 'moneymoves',
    title: 'Money Moves',
    tagline: 'Financial flex lab with quests, trackers, and rewards.',
    blurb: 'Cash quests & mini missions',
    accent: accent.moneymoves,
    route: '/(modules)/moneymoves',
    quickAction: { title: 'Claim XP boost', emoji: '⚡️' },
    learningTracks: [
      { key: 'money-myths', title: 'Money Myth Busters', progress: 0.42 },
      { key: 'budget-boss', title: 'Budget Boss Sprint', progress: 0.68 }
    ],
    liveSignals: [
      { key: 'finance-sprint', title: 'Finance Sprint', time: 'Starts in 25m' }
    ]
  },
  {
    key: 'lifelab',
    title: 'Life Lab',
    tagline: 'Micro-habit lab for mindset, wellness, and everyday wins.',
    blurb: 'Glow up your life hacks',
    accent: accent.lifelab,
    route: '/(modules)/lifelab',
    learningTracks: [
      { key: 'micro-habits', title: 'Micro-habit Stack', progress: 0.72 },
      { key: 'mindset-glow', title: 'Mindset Glow Up', progress: 0.56 }
    ],
    liveSignals: [
      { key: 'sunrise-reset', title: 'Sunrise Reset', time: 'Tomorrow 7:30a' }
    ]
  },
  {
    key: 'board',
    title: 'Board',
    tagline: 'Mission control for your crew goals, streaks, and progress.',
    blurb: 'Squad goals dashboard',
    accent: accent.board,
    route: '/(modules)/board'
  }
];

export const MODULE_MAP: Record<ModuleKey, ModuleMeta> = MODULES.reduce(
  (acc, meta) => ({ ...acc, [meta.key]: meta }),
  {} as Record<ModuleKey, ModuleMeta>
);

export const FEATURED_MODULES = MODULES.map(({ key, title, blurb, accent, route }) => ({
  key,
  title,
  blurb,
  accent,
  route
}));

export const QUICK_ACTIONS = MODULES.filter((meta) => meta.quickAction).map((meta) => ({
  key: meta.key,
  accent: meta.accent,
  route: meta.route,
  title: meta.quickAction!.title,
  emoji: meta.quickAction!.emoji
}));

export const LEARNING_TRACKS = MODULES.flatMap((meta) =>
  (meta.learningTracks ?? []).map((track) => ({
    key: `${meta.key}-${track.key}`,
    accent: meta.accent,
    title: track.title,
    progress: track.progress
  }))
);

export const LIVE_SIGNALS = MODULES.flatMap((meta) =>
  (meta.liveSignals ?? []).map((signal) => ({
    key: `${meta.key}-${signal.key}`,
    accent: meta.accent,
    title: signal.title,
    time: signal.time
  }))
);
