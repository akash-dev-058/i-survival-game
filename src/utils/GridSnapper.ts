import * as THREE from 'three';

/** Snap a vector to a 1‑unit grid */
export function snapToGrid(position: THREE.Vector3, gridSize: number = 1): THREE.Vector3 {
  const snapped = position.clone();
  snapped.x = Math.round(snapped.x / gridSize) * gridSize;
  snapped.y = Math.round(snapped.y / gridSize) * gridSize;
  snapped.z = Math.round(snapped.z / gridSize) * gridSize;
  return snapped;
}
