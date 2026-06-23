import { AnimationMixer, Object3D, LoopRepeat } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

/** Simple wrapper to play animations on a GLTF model */
export class AnimationController {
  private mixer: AnimationMixer;
  private actions: Map<string, any> = new Map();

  constructor(gltf: GLTF) {
    this.mixer = new AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    });
  }

  public play(name: string, loop: boolean = true): void {
    const action = this.actions.get(name);
    if (!action) return;
    action.reset();
    action.setLoop(loop ? LoopRepeat : LoopRepeat, Infinity);
    action.play();
  }

  public stop(name: string): void {
    const action = this.actions.get(name);
    if (action) action.stop();
  }

  public update(delta: number): void {
    this.mixer.update(delta);
  }
}
