import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useGameStore } from '@/store/gameStore';

/** Sets up post‑processing effects */
export class PostProcessingStack {
  private composer: EffectComposer;
  constructor() {
    const { renderer, scene, camera } = useGameStore.getState();
    if (!renderer || !scene || !camera) throw new Error('Renderer, scene, or camera missing');
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85);
    this.composer.addPass(bloom);
  }

  public render(delta: number): void {
    this.composer.render(delta);
  }
}
