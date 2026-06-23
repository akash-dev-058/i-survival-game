import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Item } from '@/types/Item';

interface InventoryState {
  items: Record<string, Item>;
  addItem: (item: Item) => void;
  removeItem: (id: string, count?: number) => void;
  clear: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  devtools(
    persist(
      (set, get) => ({
        items: {},
        addItem: (item) => {
          const existing = get().items[item.id];
          if (existing) {
            existing.count += item.count;
          } else {
            get().items[item.id] = { ...item };
          }
          set({ items: { ...get().items } });
        },
        removeItem: (id, count = 1) => {
          const existing = get().items[id];
          if (!existing) return;
          if (existing.count <= count) {
            const { [id]: _, ...rest } = get().items;
            set({ items: rest });
          } else {
            existing.count -= count;
            set({ items: { ...get().items } });
          }
        },
        clear: () => set({ items: {} })
      }),
      { name: 'survivalcore-inventory' }
    )
  )
);

/** Helper used by ResourceNode */
export function addItemToInventory(item: Item): void {
  useInventoryStore.getState().addItem(item);
}
