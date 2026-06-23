import * as THREE from 'three';

/** Base class for placed structures */
export abstract class StructureBase extends THREE.Object3D {
  health: number;
  constructor(health: number = 100) {
    super();
    this.health = health;
  }
  abstract takeDamage(amount: number): void;
}
