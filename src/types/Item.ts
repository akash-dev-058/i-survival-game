import { ResourceType } from '@/entities/resources/ResourceTypes';

export interface Item {
  id: string; // unique identifier
  type: ResourceType;
  count: number;
}
