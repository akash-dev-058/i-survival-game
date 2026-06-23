import { expect, test } from 'vitest';
import { craft } from '@/systems/CraftingEngine';
import { useInventoryStore } from '@/systems/InventorySystem';
import { ResourceType } from '@/entities/resources/ResourceTypes';

test('crafting succeeds with sufficient resources', () => {
  const { addItem, clear } = useInventoryStore.getState();
  clear();
  addItem({ id: 'Wood-0', type: ResourceType.Wood, count: 5 });
  addItem({ id: 'Stone-0', type: ResourceType.Stone, count: 5 });
  const result = craft('axe');
  expect(result).toBe(true);
});

test('crafting fails without resources', () => {
  const { clear } = useInventoryStore.getState();
  clear();
  const result = craft('axe');
  expect(result).toBe(false);
});
