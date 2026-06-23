import React from 'react';

interface StatBarsProps {
  label: string;
  value: number;
  max: number;
  color: string; // Tailwind bg color class
}

/** Single stat bar with label */
const StatBars: React.FC<StatBarsProps> = ({ label, value, max, color }) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-48">
      <div className="text-xs font-medium text-white mb-1" aria-label={`${label}: ${Math.round(value)}/${max}`}>{label}</div>
      <div className="bg-gray-800 rounded h-2 overflow-hidden">
        <div className={`h-full ${color} transition-width duration-200 ease-out`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default StatBars;
