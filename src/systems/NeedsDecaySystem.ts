import { useGameStore } from '@/store/gameStore';

/**
 * Called each frame to decay player needs.
 */
export function updateNeeds(delta: number): void {
  const { stats } = useGameStore.getState();
  // Accumulate time and tick when a second passes
  stats.tick();
}
