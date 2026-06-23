import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';
import { Constants } from '@/utils/Constants';

/** Simple day/night cycle that rotates a directional light */
export class DayNightCycle {
  private elapsed: number = 0;
  private light: THREE.DirectionalLight;

  constructor() {
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    const { scene } = useGameStore.getState();
    scene?.add(this.light);
  }

  public update(delta: number): void {
    this.elapsed += delta;
    const angle = (this.elapsed / Constants.DAY_LENGTH_SECONDS) * Math.PI * 2;
    this.light.position.set(Math.cos(angle), Math.sin(angle), 0);
    this.light.intensity = Math.max(0.2, Math.sin(angle) * 0.8 + 0.2);
  }
}
