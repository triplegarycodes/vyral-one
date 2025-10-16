import { useGoals } from '@/hooks/useGoals';

export function useBoardLogic(userId?: string) {
  const { goals } = useGoals(userId);
  return { missions: goals };
}
