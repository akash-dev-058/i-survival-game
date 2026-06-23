import { expect, test } from 'vitest';
import { SurvivalStats } from '@/entities/player/SurvivalStats';

test('stats decay over time', () => {
  const stats = new SurvivalStats();
  const initialHunger = stats.hunger;
  // Simulate 10 seconds
  for (let i = 0; i < 10; i++) {
    stats.tick();
  }
  expect(stats.hunger).toBeLessThan(initialHunger);
});

test('health regenerates when not starving', () => {
  const stats = new SurvivalStats();
  stats.health = 50;
  // Ensure hunger and thirst are full
  stats.hunger = 100;
  stats.thirst = 100;
  for (let i = 0; i < 20; i++) {
    stats.tick();
  }
  expect(stats.health).toBeGreaterThan(50);
});
