import * as THREE from 'three';
import { StateMachine } from '@/ai/StateMachine';
import { Pathfinder } from '@/ai/Pathfinder';
import { useGameStore } from '@/store/gameStore';
import { Constants } from '@/utils/Constants';

/** Simple enemy that chases the player */
export class EnemyAgent {
  mesh: THREE.Mesh;
  stateMachine: StateMachine;
  constructor() {
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.stateMachine = new StateMachine('idle');
    this.stateMachine.addState('idle', this.idle.bind(this));
    this.stateMachine.addState('chase', this.chase.bind(this));
    this.stateMachine.addState('attack', this.attack.bind(this));
    // Add to scene
    const { scene } = useGameStore.getState();
    scene?.add(this.mesh);
  }

  private idle(delta: number): void {
    const { player } = useGameStore.getState();
    if (!player) return;
    const distance = this.mesh.position.distanceTo(player.position);
    if (distance < 10) this.stateMachine.transition('chase');
  }

  private chase(delta: number): void {
    const { player } = useGameStore.getState();
    if (!player) return;
    const direction = new THREE.Vector3().subVectors(player.position, this.mesh.position).normalize();
    this.mesh.position.addScaledVector(direction, Constants.PLAYER_WALK_SPEED * delta);
    const distance = this.mesh.position.distanceTo(player.position);
    if (distance < 1.5) this.stateMachine.transition('attack');
    else if (distance > 12) this.stateMachine.transition('idle');
  }

  private attack(delta: number): void {
    const { stats } = useGameStore.getState();
    stats.takeDamage(10 * delta);
    // After attack, go back to chase
    this.stateMachine.transition('chase');
  }
}
