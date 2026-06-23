import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';
import { ResourceNode } from '@/entities/resources/ResourceNode';

/**
 * Cast a ray from the camera forward to detect interactable resources.
 */
export function performInteraction(): void {
  const { camera, scene } = useGameStore.getState();
  if (!camera || !scene) return;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  for (const intersect of intersects) {
    const obj = intersect.object;
    if ((obj.userData as any).resourceNode instanceof ResourceNode) {
      const node = (obj.userData as any).resourceNode as ResourceNode;
      node.harvest();
      break;
    }
  }
}
