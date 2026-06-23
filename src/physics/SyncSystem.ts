import { getWorld } from '@/physics/PhysicsWorld';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

/**
 * Sync all physics bodies to their corresponding Three.js meshes.
 * Assumes each mesh has a userData.body reference.
 */
export function syncPhysics(): void {
  const world = getWorld();
  if (!world) return;
  world.bodies.forEach((body) => {
    const mesh = (body as any).userData?.mesh as THREE.Object3D | undefined;
    if (mesh) {
      mesh.position.set(body.position.x, body.position.y, body.position.z);
      mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
    }
  });
}
