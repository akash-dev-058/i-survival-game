import * as THREE from 'three';
import { Body, Vec3, Box } from 'cannon-es';
import { InputManager, InputState } from '@/utils/InputManager';
import { useGameStore } from '@/store/gameStore';
import { initPhysics, createWorld } from '@/physics/PhysicsWorld';
import { Constants } from '@/utils/Constants';

/**
 * Handles player movement and camera rotation.
 *
 * The controller creates a physics body (a simple box approximating the
 * player's capsule) and a hierarchy of Three.js objects that the camera is
 * attached to. Input is polled each frame via {@link InputManager}. The class
 * also manages pointer‑lock acquisition and clean‑up of event listeners.
 */
export class PlayerController {
  /** Physics body representing the player. */
  private readonly body: Body;
  /** Invisible mesh used as a pivot for the camera. */
  private readonly mesh: THREE.Object3D;
  /** Input manager that abstracts keyboard/mouse state. */
  private readonly inputManager: InputManager;
  /** Yaw rotation object (horizontal). */
  private readonly yawObject: THREE.Object3D;
  /** Pitch rotation object (vertical). */
  private readonly pitchObject: THREE.Object3D;

  constructor() {
    // Initialise the physics world (creates a singleton if not already present).
    initPhysics();

    // Create a simple box shape for the player. A true capsule would require a
    // custom shape; a box is sufficient for most ground‑based movement.
    const halfExtents = new Vec3(Constants.PLAYER_WIDTH / 2, Constants.PLAYER_HEIGHT / 2, Constants.PLAYER_WIDTH / 2);
    const shape = new Box(halfExtents);
    this.body = new Body({
      mass: Constants.PLAYER_MASS,
      shape,
      position: new Vec3(0, Constants.PLAYER_HEIGHT, 0),
    });

    // Register the body with the physics world.
    const world = createWorld();
    world.addBody(this.body);

    // Three.js hierarchy – the mesh itself is invisible and only used for
    // positioning the camera.
    this.mesh = new THREE.Object3D();
    this.mesh.position.set(0, Constants.PLAYER_HEIGHT, 0);

    this.yawObject = new THREE.Object3D();
    this.pitchObject = new THREE.Object3D();
    this.yawObject.add(this.pitchObject);
    this.pitchObject.add(this.mesh);

    // Attach the game's camera (if it exists) to the hierarchy.
    const { camera } = useGameStore.getState();
    if (camera) {
      this.yawObject.add(camera);
    } else {
      // In production we still want a graceful fallback.
      console.warn('PlayerController: No camera found in game store.');
    }

    // Store a reference to the visual mesh on the physics body for the sync
    // system to copy positions each frame.
    (this.body as any).userData = { mesh: this.mesh };

    this.inputManager = new InputManager();

    // Request pointer lock on the first user interaction.
    window.addEventListener('click', this.requestPointerLock);
  }

  /**
   * Requests pointer lock on the canvas element when the user clicks.
   */
  private requestPointerLock = (): void => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.warn('PlayerController: No canvas element found for pointer lock.');
      return;
    }
    if (document.pointerLockElement !== canvas) {
      canvas.requestPointerLock().catch((err) => {
        console.error('Failed to acquire pointer lock:', err);
      });
    }
  };

  /**
   * Called every render frame.
   *
   * @param delta Time elapsed since the previous frame (in seconds).
   */
  public update(delta: number): void {
    const inputs: InputState = this.inputManager.poll();

    // ----- Rotation (mouse look) -----
    const yawDelta = Constants.MOUSE_SENSITIVITY * inputs.mouseDeltaX;
    const pitchDelta = Constants.MOUSE_SENSITIVITY * inputs.mouseDeltaY;
    this.yawObject.rotation.y -= yawDelta;
    // Clamp pitch to avoid flipping the camera.
    const maxPitch = Math.PI / 2 - 0.01;
    const minPitch = -maxPitch;
    this.pitchObject.rotation.x = Math.max(minPitch, Math.min(maxPitch, this.pitchObject.rotation.x - pitchDelta));

    // ----- Movement (WASD) -----
    const direction = new Vec3(0, 0, 0);
    if (inputs.forward) direction.z -= 1;
    if (inputs.backward) direction.z += 1;
    if (inputs.left) direction.x -= 1;
    if (inputs.right) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
      // Transform direction from local (camera) space to world space using yaw.
      const yaw = this.yawObject.rotation.y;
      const forward = new Vec3(-Math.sin(yaw), 0, -Math.cos(yaw));
      const right = new Vec3(Math.cos(yaw), 0, -Math.sin(yaw));
      const move = forward.scale(direction.z).vadd(right.scale(direction.x));

      const speed = inputs.sprint ? Constants.PLAYER_SPRINT_SPEED : Constants.PLAYER_WALK_SPEED;
      move.scale(speed, move);

      // Apply velocity directly – cannon-es will handle integration.
      this.body.velocity.x = move.x;
      this.body.velocity.z = move.z;
    } else {
      // Apply gentle damping when no input is present.
      this.body.velocity.x *= 0.85;
      this.body.velocity.z *= 0.85;
    }

    // ----- Jump -----
    const onGround = Math.abs(this.body.velocity.y) < 0.05; // simplistic ground check
    if (inputs.jump && onGround) {
      this.body.velocity.y = Constants.PLAYER_JUMP_SPEED;
    }

    // Note: The SyncSystem (outside this class) copies the physics body's
    // position to `this.mesh.position` each frame.
  }

  /**
   * Clean up event listeners and input resources when the controller is no
   * longer needed (e.g., on scene change).
   */
  public dispose(): void {
    this.inputManager.dispose();
    window.removeEventListener('click', this.requestPointerLock);
  }
}
