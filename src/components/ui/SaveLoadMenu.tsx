import React, { useEffect, useState } from 'react';
import { db } from '@/storage/Database';
import { SaveManager } from '@/storage/SaveManager';

/** UI for saving and loading game slots */
const SaveLoadMenu: React.FC = () => {
  const [saves, setSaves] = useState<Array<{ id: number; timestamp: number }>>([]);

  const refresh = async () => {
    const all = await db.saves.toArray();
    setSaves(all.map((s) => ({ id: s.id!, timestamp: s.timestamp })));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSave = async () => {
    await SaveManager.save();
    await refresh();
  };

  const handleLoad = async (id: number) => {
    await SaveManager.load(id);
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded" aria-label="Save/Load Menu">
      <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded mr-2">
        Save
      </button>
      <div className="mt-2">
        {saves.map((s) => (
          <div key={s.id} className="flex items-center mb-1">
            <span className="text-sm text-white mr-2">Slot {s.id}</span>
            <button
              onClick={() => handleLoad(s.id)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaveLoadMenu;
