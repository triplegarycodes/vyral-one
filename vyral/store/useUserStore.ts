import { create } from "zustand";

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string | null;
  xp?: number;
};

type State = {
  profile: UserProfile | null;
};

type Actions = {
  setProfile: (profile: UserProfile | null) => void;
  updateXP: (xp: number) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateXP: (xp) =>
    set((state) =>
      state.profile ? { profile: { ...state.profile, xp } } : { profile: state.profile }
    )
}));
