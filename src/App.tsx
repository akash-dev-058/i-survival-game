import React, { Suspense, useEffect } from 'react';
import { GameCanvas } from '@/game/core/SceneSetup';
import { useGameStore } from '@/store/gameStore';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HUD from '@/components/ui/HUD';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const App: React.FC = () => {
  const { initGame, isInitialized } = useGameStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {isInitialized ? (
          <Suspense fallback={<LoadingScreen progress={0} />}> 
            <GameCanvas />
          </Suspense>
        ) : (
          <LoadingScreen progress={0} />
        )}
        <HUD />
      </div>
    </ErrorBoundary>
  );
};

export default App;
