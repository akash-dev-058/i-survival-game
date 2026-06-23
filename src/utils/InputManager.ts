import { PlayerInputs } from '@/entities/player/PlayerInputs';

/**
 * Handles keyboard and mouse input, exposing a PlayerInputs object.
 */
export class InputManager {
  private inputs: PlayerInputs = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    mouseDeltaX: 0,
    mouseDeltaY: 0
  };

  constructor() {
    this.bindEvents();
  }

  private bindEvents(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('pointerlockchange', this.onPointerLockChange);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    switch (e.code) {
      case 'KeyW':
        this.inputs.forward = true;
        break;
      case 'KeyS':
        this.inputs.backward = true;
        break;
      case 'KeyA':
        this.inputs.left = true;
        break;
      case 'KeyD':
        this.inputs.right = true;
        break;
      case 'Space':
        this.inputs.jump = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.inputs.sprint = true;
        break;
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    switch (e.code) {
      case 'KeyW':
        this.inputs.forward = false;
        break;
      case 'KeyS':
        this.inputs.backward = false;
        break;
      case 'KeyA':
        this.inputs.left = false;
        break;
      case 'KeyD':
        this.inputs.right = false;
        break;
      case 'Space':
        this.inputs.jump = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.inputs.sprint = false;
        break;
    }
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (document.pointerLockElement) {
      this.inputs.mouseDeltaX = e.movementX;
      this.inputs.mouseDeltaY = e.movementY;
    }
  };

  private onPointerLockChange = (): void => {
    if (!document.pointerLockElement) {
      // Reset mouse deltas when pointer lock is lost
      this.inputs.mouseDeltaX = 0;
      this.inputs.mouseDeltaY = 0;
    }
  };

  /** Get a copy of the current input state and reset mouse deltas */
  public poll(): PlayerInputs {
    const copy = { ...this.inputs };
    // Reset mouse deltas after each poll to avoid accumulation
    this.inputs.mouseDeltaX = 0;
    this.inputs.mouseDeltaY = 0;
    return copy;
  }

  /** Clean up listeners when disposing */
  public dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('pointerlockchange', this.onPointerLockChange);
  }
}
