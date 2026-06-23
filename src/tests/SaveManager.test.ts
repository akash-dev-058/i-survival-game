import { expect, test, beforeAll } from 'vitest';
import { SaveManager } from '@/storage/SaveManager';
import { db } from '@/storage/Database';

beforeAll(async () => {
  await db.delete();
  await db.open();
});

test('save creates a new slot', async () => {
  const id = await SaveManager.save();
  const saved = await db.saves.get(id);
  expect(saved).toBeDefined();
});

test('load throws on missing id', async () => {
  await expect(SaveManager.load(9999)).rejects.toThrow('Save slot not found');
});
