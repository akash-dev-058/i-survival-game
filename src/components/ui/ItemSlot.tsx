import React from 'react';
import { Item } from '@/types/Item';
import { ResourceType } from '@/entities/resources/ResourceTypes';

interface ItemSlotProps {
  item: Item;
}

/** Single inventory slot showing item icon and count */
const ItemSlot: React.FC<ItemSlotProps> = ({ item }) => {
  const getIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.Wood:
        return '🌲';
      case ResourceType.Stone:
        return '🪨';
      case ResourceType.Iron:
        return '⛏️';
      default:
        return '❓';
    }
  };
  return (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded" aria-label={`${item.type} x${item.count}`}>
      <span className="text-xl">{getIcon(item.type)}</span>
      <span className="absolute bottom-0 right-0 text-xs bg-black bg-opacity-75 rounded px-0.5">{item.count}</span>
    </div>
  );
};

export default ItemSlot;
