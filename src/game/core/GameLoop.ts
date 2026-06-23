import { Clock } from 'three';
import { useGameStore } from '@/store/gameStore';
import { stepPhysics } from '@/physics/PhysicsWorld';
import { syncPhysics } from '@/physics/SyncSystem';

/**
 * Manages the main game loop using requestAnimationFrame.
 * It updates physics, runs registered update callbacks, and renders the scene.
 */
export class GameLoop {
  private static instance: GameLoop | null = null;
  private clock: Clock;
  private rafId: number | null = null;
  private isRunning: boolean = false;

  private constructor() {
    this.clock = new Clock();
  }

  public static getInstance(): GameLoop {
    if (!GameLoop.instance) {
      GameLoop.instance = new GameLoop();
    }
    return GameLoop.instance;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    this.loop();
  }

  public stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.clock.stop();
  }

  private loop = (): void => {
    if (!this.isRunning) return;
    const delta = this.clock.getDelta();
    // Fixed time step for physics (60Hz)
    const fixedDelta = 1 / 60;
    let accumulator = delta;
    while (accumulator >= fixedDelta) {
      stepPhysics(fixedDelta);
      accumulator -= fixedDelta;
    }
    syncPhysics();
    // Render via store's renderer reference
    const { renderer, scene, camera } = useGameStore.getState();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    this.rafId = requestAnimationFrame(this.loop);
  };
}
