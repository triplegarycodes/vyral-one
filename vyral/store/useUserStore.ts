import { create } from "zustand";
import { ThemeId, defaultThemeId } from "@/theme/tokens";

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string | null;
  xp?: number;
  points?: number | null;
  theme?: ThemeId | null;
};

type State = {
  profile: UserProfile | null;
  theme: ThemeId;
};

type Actions = {
  setProfile: (profile: UserProfile | null) => void;
  updateXP: (xp: number) => void;
  updatePoints: (points: number) => void;
  updateAvatar: (avatarUrl: string | null) => void;
  setTheme: (theme: ThemeId) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  profile: null,
  theme: defaultThemeId,
  setProfile: (profile) =>
    set((state) => ({
      profile,
      theme: profile ? state.theme : defaultThemeId
    })),
  updateXP: (xp) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, xp } }
        : { profile: state.profile }
    ),
  updatePoints: (points) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, points } }
        : { profile: state.profile }
    ),
  updateAvatar: (avatarUrl) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, avatar_url: avatarUrl } }
        : { profile: state.profile }
    ),
  setTheme: (theme) =>
    set((state) => ({
      theme,
      profile: state.profile ? { ...state.profile, theme } : state.profile
    }))
}));
