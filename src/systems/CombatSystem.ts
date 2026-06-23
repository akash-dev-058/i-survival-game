import { useGameStore } from '@/store/gameStore';
import { Constants } from '@/utils/Constants';

/** Apply damage to player when enemy hits */
export function applyDamage(amount: number): void {
  const { stats } = useGameStore.getState();
  stats.takeDamage(amount);
}
