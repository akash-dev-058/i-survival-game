import { World, Body, Box, Vec3, Material, ContactMaterial } from 'cannon-es';
import { useGameStore } from '@/store/gameStore';

let world: World | null = null;

/** Initialize the physics world with default gravity */
export function initPhysics(): void {
  if (world) return;
  world = new World({ gravity: new Vec3(0, -9.81, 0) });
  const defaultMaterial = new Material('default');
  const contactMaterial = new ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.4,
    restitution: 0.3
  });
  world.defaultContactMaterial = contactMaterial;
  // Store reference for debugging if needed
  useGameStore.getState().setPhysicsWorld?.(world);
}

/** Step the physics simulation */
export function stepPhysics(delta: number): void {
  if (!world) return;
  world.step(delta);
}

/** Create a static ground body */
export function createGround(size: Vec3 = new Vec3(100, 1, 100)): Body {
  if (!world) throw new Error('Physics world not initialized');
  const shape = new Box(new Vec3(size.x / 2, size.y / 2, size.z / 2));
  const body = new Body({ mass: 0, shape, position: new Vec3(0, -size.y / 2, 0) });
  world.addBody(body);
  return body;
}

/** Export the world for external use */
export function getWorld(): World | null {
  return world;
}
