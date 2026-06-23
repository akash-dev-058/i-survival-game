import { ResourceType } from '@/entities/resources/ResourceTypes';

/**
 * Simple static recipe map.
 */
export const CraftingRecipe: Record<string, { requires: { id: string; count: number }[]; results: { type: ResourceType; count: number }[] }> = {
  axe: {
    requires: [
      { id: 'Wood-0', count: 2 },
      { id: 'Stone-0', count: 1 }
    ],
    results: [{ type: ResourceType.Wood, count: 1 }]
  },
  pickaxe: {
    requires: [
      { id: 'Wood-0', count: 2 },
      { id: 'Stone-0', count: 2 }
    ],
    results: [{ type: ResourceType.Stone, count: 1 }]
  }
};
