import { db } from '@/storage/Database';
import { SaveData } from '@/types/SaveData';
import { useGameStore } from '@/store/gameStore';
import { useInventoryStore } from '@/systems/InventorySystem';

/** Handles serialization and persistence of game state */
export class SaveManager {
  /** Save current state to a new slot */
  public static async save(): Promise<number> {
    const { stats, camera } = useGameStore.getState();
    const { items } = useInventoryStore.getState();
    const save: SaveData = {
      timestamp: Date.now(),
      version: import.meta.env.VITE_GAME_VERSION,
      playerPosition: {
        x: camera?.position.x ?? 0,
        y: camera?.position.y ?? 0,
        z: camera?.position.z ?? 0
      },
      stats: {
        hunger: stats.hunger,
        thirst: stats.thirst,
        health: stats.health
      },
      inventory: Object.values(items)
    };
    const id = await db.saves.add(save);
    return id;
  }

  /** Load a saved slot by id */
  public static async load(id: number): Promise<void> {
    const saved = await db.saves.get(id);
    if (!saved) throw new Error('Save slot not found');
    const { setCamera } = useGameStore.getState();
    const { clear, addItem } = useInventoryStore.getState();
    // Restore camera position
    const { camera } = useGameStore.getState();
    if (camera) {
      camera.position.set(saved.playerPosition.x, saved.playerPosition.y, saved.playerPosition.z);
    }
    // Restore stats
    const { stats } = useGameStore.getState();
    stats.hunger = saved.stats.hunger;
    stats.thirst = saved.stats.thirst;
    stats.health = saved.stats.health;
    // Restore inventory
    clear();
    saved.inventory.forEach((item) => addItem(item));
  }
}
