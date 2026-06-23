import React from 'react';
import StatBars from '@/components/ui/StatBars';
import { useGameStore } from '@/store/gameStore';

/** Heads‑up display showing health, hunger, and thirst */
const HUD: React.FC = () => {
  const { stats } = useGameStore();
  return (
    <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none" aria-label="Player HUD">
      <StatBars label="Health" value={stats.health} max={100} color="bg-red-600" />
      <StatBars label="Hunger" value={stats.hunger} max={100} color="bg-yellow-600" />
      <StatBars label="Thirst" value={stats.thirst} max={100} color="bg-blue-600" />
    </div>
  );
};

export default HUD;
