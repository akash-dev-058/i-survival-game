import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

/** Simple settings UI for toggling debug physics */
const SettingsMenu: React.FC = () => {
  const [debug, setDebug] = useState(import.meta.env.VITE_ENABLE_DEBUG_PHYSICS === 'true');
  const toggleDebug = () => {
    setDebug(!debug);
    // In a real app we would toggle physics helper visibility here
  };
  return (
    <div className="fixed top-4 right-4 bg-gray-800 p-3 rounded" aria-label="Settings Menu">
      <h2 className="text-sm font-bold text-white mb-2">Settings</h2>
      <label className="flex items-center text-white">
        <input type="checkbox" checked={debug} onChange={toggleDebug} className="mr-2" />
        Debug Physics
      </label>
    </div>
  );
};

export default SettingsMenu;
