import { ResourceType } from '@/entities/resources/ResourceTypes';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';
import { addItemToInventory } from '@/systems/InventorySystem';

/**
 * Represents a harvestable resource in the world.
 */
export class ResourceNode {
  type: ResourceType;
  mesh: THREE.Mesh;
  health: number;

  constructor(type: ResourceType, mesh: THREE.Mesh) {
    this.type = type;
    this.mesh = mesh;
    this.health = 3; // hits required
    // Attach reference for interaction system
    (mesh as any).userData.resourceNode = this;
  }

  /** Called when player interacts (e.g., chops) */
  public harvest(): void {
    this.health -= 1;
    if (this.health <= 0) {
      this.dropItem();
      this.dispose();
    }
  }

  private dropItem(): void {
    addItemToInventory({ id: `${this.type}-${Date.now()}`, type: this.type, count: 1 });
  }

  private dispose(): void {
    const { scene } = useGameStore.getState();
    if (scene) {
      scene.remove(this.mesh);
    }
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach((m) => m.dispose());
    } else {
      this.mesh.material.dispose();
    }
  }
}
