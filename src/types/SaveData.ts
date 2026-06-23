import { SurvivalStats } from '@/entities/player/SurvivalStats';
import { Item } from '@/types/Item';
import * as THREE from 'three';

export interface SaveData {
  id?: number;
  timestamp: number;
  version: string;
  playerPosition: { x: number; y: number; z: number };
  stats: {
    hunger: number;
    thirst: number;
    health: number;
  };
  inventory: Item[];
  // Additional world state can be added here
}
