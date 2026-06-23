import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

/** Simple particle system using Points */
export class ParticleSpawner {
  private particles: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private maxParticles: number = 1000;
  private positions: Float32Array;
  private lifetimes: Float32Array;
  private age: Float32Array;

  constructor() {
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.maxParticles * 3);
    this.lifetimes = new Float32Array(this.maxParticles);
    this.age = new Float32Array(this.maxParticles);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.8 });
    this.particles = new THREE.Points(this.geometry, this.material);
    const { scene } = useGameStore.getState();
    scene?.add(this.particles);
  }

  /** Emit a burst at a world position */
  public emit(position: THREE.Vector3, count: number = 20): void {
    let emitted = 0;
    for (let i = 0; i < this.maxParticles && emitted < count; i++) {
      if (this.age[i] >= this.lifetimes[i]) {
        this.positions[i * 3] = position.x;
        this.positions[i * 3 + 1] = position.y;
        this.positions[i * 3 + 2] = position.z;
        this.lifetimes[i] = 1 + Math.random();
        this.age[i] = 0;
        emitted++;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  /** Update particle ages and fade out */
  public update(delta: number): void {
    for (let i = 0; i < this.maxParticles; i++) {
      if (this.age[i] < this.lifetimes[i]) {
        this.age[i] += delta;
        const t = this.age[i] / this.lifetimes[i];
        // Simple upward motion
        this.positions[i * 3 + 1] += delta * 0.5;
        // Fade out
        this.material.opacity = 1 - t;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}
