import React, { useEffect, useState } from 'react';

interface DamageIndicatorProps {
  amount: number;
}

/** Floating damage number that fades out */
const DamageIndicator: React.FC<DamageIndicatorProps> = ({ amount }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div className="absolute text-red-500 font-bold animate-fade-up" aria-live="assertive">
      -{Math.round(amount)}
    </div>
  );
};

export default DamageIndicator;
