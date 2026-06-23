import { ResourceType } from '@/entities/resources/ResourceTypes';

export const StructureBlueprint: Record<string, { name: string; cost: { type: ResourceType; count: number }[] }> = {
  wall: { name: 'Wall', cost: [{ type: ResourceType.Wood, count: 4 }] },
  floor: { name: 'Floor', cost: [{ type: ResourceType.Wood, count: 2 }] },
  roof: { name: 'Roof', cost: [{ type: ResourceType.Wood, count: 3 }] }
};
