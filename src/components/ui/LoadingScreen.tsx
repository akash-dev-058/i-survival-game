import React from 'react';

interface LoadingScreenProps {
  progress: number; // 0 - 100
}

/**
 * Full‑screen loading overlay with a progress bar.
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white" role="alert" aria-live="assertive">
      <svg className="animate-spin h-12 w-12 mb-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <div className="w-64 bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-indigo-500 h-full transition-width duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">Loading... {Math.round(progress)}%</p>
    </div>
  );
};

export default LoadingScreen;
