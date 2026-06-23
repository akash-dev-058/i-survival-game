import React from 'react';
import { useInventoryStore } from '@/systems/InventorySystem';
import ItemSlot from '@/components/ui/ItemSlot';

/** Grid UI showing inventory items */
const InventoryGrid: React.FC = () => {
  const { items } = useInventoryStore();
  const itemArray = Object.values(items);
  return (
    <div className="grid grid-cols-5 gap-2 p-2 bg-gray-800 rounded" aria-label="Inventory Grid">
      {itemArray.map((item) => (
        <ItemSlot key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryGrid;
