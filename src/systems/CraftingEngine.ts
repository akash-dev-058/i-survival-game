import { CraftingRecipe } from '@/data/CraftingRecipes';
import { useInventoryStore } from '@/systems/InventorySystem';

/**
 * Attempt to craft an item based on a recipe.
 * Returns true if crafting succeeded.
 */
export function craft(recipeId: string): boolean {
  const recipe = CraftingRecipe[recipeId];
  if (!recipe) return false;
  const inventory = useInventoryStore.getState();
  // Verify required items
  for (const req of recipe.requires) {
    const item = inventory.items[req.id];
    if (!item || item.count < req.count) return false;
  }
  // Consume required items
  for (const req of recipe.requires) {
    inventory.removeItem(req.id, req.count);
  }
  // Add result items
  for (const result of recipe.results) {
    inventory.addItem({ id: `${result.type}-${Date.now()}`, type: result.type, count: result.count });
  }
  return true;
}
