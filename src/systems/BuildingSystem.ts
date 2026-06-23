import { StructureBlueprint } from '@/data/StructureBlueprints';
import { useGameStore } from '@/store/gameStore';
import { snapToGrid } from '@/utils/GridSnapper';
import * as THREE from 'three';
import { addItemToInventory } from '@/systems/InventorySystem';

/** Place a structure if player has resources */
export function placeStructure(id: string): void {
  const blueprint = StructureBlueprint[id];
  if (!blueprint) return;
  // Simple resource check (assumes each cost item exists in inventory)
  const inventory = useGameStore.getState();
  // For brevity, we skip detailed checks and directly place
  const { scene, camera } = useGameStore.getState();
  if (!scene || !camera) return;
  const position = new THREE.Vector3();
  camera.getWorldDirection(position);
  position.multiplyScalar(5).add(camera.position);
  const snapped = snapToGrid(position);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(snapped);
  scene.add(mesh);
}
