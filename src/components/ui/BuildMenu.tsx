import React, { useState } from 'react';
import { StructureBlueprint } from '@/data/StructureBlueprints';
import { placeStructure } from '@/systems/BuildingSystem';

/** UI for selecting a structure to build */
const BuildMenu: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const handlePlace = () => {
    if (selected) {
      placeStructure(selected);
    }
  };
  return (
    <div className="p-4 bg-gray-800 rounded" aria-label="Build Menu">
      <h2 className="text-lg font-bold mb-2 text-white">Build</h2>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full mb-2 p-1 bg-gray-700 text-white rounded"
        aria-label="Select structure"
      >
        <option value="">-- Choose --</option>
        {Object.entries(StructureBlueprint).map(([id, blueprint]) => (
          <option key={id} value={id}>
            {blueprint.name}
          </option>
        ))}
      </select>
      <button
        onClick={handlePlace}
        disabled={!selected}
        className="w-full bg-green-600 hover:bg-green-500 text-white py-1 rounded disabled:opacity-50"
      >
        Place
      </button>
    </div>
  );
};

export default BuildMenu;
