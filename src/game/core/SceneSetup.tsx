import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';
import { GameLoop } from '@/game/core/GameLoop';
import { initAssetManager } from '@/utils/AssetManager';

/**
 * Sets up Three.js scene, camera, renderer and attaches the canvas to the DOM.
 * Exposes scene, camera, and renderer via the global game store.
 */
export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setRenderer, setScene, setCamera } = useGameStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);
    // Store references globally
    setRenderer(renderer);
    setScene(scene);
    setCamera(camera);
    // Initialize asset manager (preload essential assets)
    initAssetManager();
    // Start the game loop
    const loop = GameLoop.getInstance();
    loop.start();
    // Resize handling
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    return () => {
      loop.stop();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [setRenderer, setScene, setCamera]);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-label="Game canvas" />;
};
