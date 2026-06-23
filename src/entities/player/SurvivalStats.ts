import { Constants } from '@/utils/Constants';

/**
 * Tracks hunger, thirst, and health. Provides decay and regeneration logic.
 */
export class SurvivalStats {
  hunger: number;
  thirst: number;
  health: number;
  private lastUpdate: number;

  constructor() {
    this.hunger = Constants.MAX_HUNGER;
    this.thirst = Constants.MAX_THIRST;
    this.health = Constants.MAX_HEALTH;
    this.lastUpdate = performance.now();
  }

  /** Update stats based on elapsed time */
  public tick(): void {
    const now = performance.now();
    const deltaSec = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;
    // Decay hunger and thirst
    this.hunger = Math.max(0, this.hunger - Constants.HUNGER_DECAY_RATE * deltaSec);
    this.thirst = Math.max(0, this.thirst - Constants.THIRST_DECAY_RATE * deltaSec);
    // Health effects
    if (this.hunger === 0 || this.thirst === 0) {
      this.health = Math.max(0, this.health - 0.2 * deltaSec);
    } else if (this.health < Constants.MAX_HEALTH) {
      this.health = Math.min(Constants.MAX_HEALTH, this.health + Constants.HEALTH_REGEN_RATE * deltaSec);
    }
  }

  /** Apply food or water */
  public restoreHunger(amount: number): void {
    this.hunger = Math.min(Constants.MAX_HUNGER, this.hunger + amount);
  }

  public restoreThirst(amount: number): void {
    this.thirst = Math.min(Constants.MAX_THIRST, this.thirst + amount);
  }

  /** Apply damage */
  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  public isAlive(): boolean {
    return this.health > 0;
  }
}
