import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import * as THREE from 'three';
import { AssetManager } from '@/utils/AssetManager';
import { SurvivalStats } from '@/entities/player/SurvivalStats';

export interface GameState {
  // Core Three.js objects
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  // Asset manager
  assetManager: AssetManager | null;
  // Player stats
  stats: SurvivalStats;
  // UI state
  isInitialized: boolean;
  // Actions
  setRenderer: (renderer: THREE.WebGLRenderer) => void;
  setScene: (scene: THREE.Scene) => void;
  setCamera: (camera: THREE.PerspectiveCamera) => void;
  initGame: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        renderer: null,
        scene: null,
        camera: null,
        assetManager: null,
        stats: new SurvivalStats(),
        isInitialized: false,
        setRenderer: (renderer) => set({ renderer }),
        setScene: (scene) => set({ scene }),
        setCamera: (camera) => set({ camera }),
        initGame: () => {
          const manager = new AssetManager();
          manager.loadAll().then(() => {
            set({ assetManager: manager, isInitialized: true });
          }).catch((err) => {
            console.error('Asset loading failed', err);
          });
        }
      }),
      { name: 'survivalcore3d-store' }
    ),
    { name: 'GameStore' }
  )
);
