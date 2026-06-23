import * as THREE from 'three';

/** Very naive straight‑line pathfinder for demo purposes */
export class Pathfinder {
  public static findPath(start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3[] {
    // Return an array with start and end for direct movement
    return [start.clone(), end.clone()];
  }
}
