import React, { useState } from 'react';
import { craft } from '@/systems/CraftingEngine';
import { CraftingRecipe } from '@/data/CraftingRecipes';
import { ResourceType } from '@/entities/resources/ResourceTypes';

/** UI for selecting a recipe and crafting */
const CraftingMenu: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const handleCraft = () => {
    if (selected) {
      const success = craft(selected);
      if (!success) alert('Not enough resources');
    }
  };
  return (
    <div className="p-4 bg-gray-800 rounded" aria-label="Crafting Menu">
      <h2 className="text-lg font-bold mb-2 text-white">Crafting</h2>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full mb-2 p-1 bg-gray-700 text-white rounded"
        aria-label="Select recipe"
      >
        <option value="">-- Choose --</option>
        {Object.entries(CraftingRecipe).map(([id, recipe]) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button
        onClick={handleCraft}
        disabled={!selected}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-1 rounded disabled:opacity-50"
      >
        Craft
      </button>
    </div>
  );
};

export default CraftingMenu;
