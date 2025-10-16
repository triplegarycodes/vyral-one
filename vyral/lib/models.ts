export type VyralUserProfile = {
  id: string;
  username: string;
  avatarUrl?: string | null;
  xp: number;
  streak: number;
};

export type VyralGoal = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  status: 'pending' | 'active' | 'complete';
  progress: number;
  rewardPoints: number;
};

export type VyralReward = {
  id: string;
  itemKey: string;
  quantity: number;
};
