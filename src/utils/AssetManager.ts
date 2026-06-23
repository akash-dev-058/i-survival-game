import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { resolveAssetPath } from '@/utils/PathResolver';

/**
 * Centralised asset loading with progress tracking.
 */
export class AssetManager {
  private loadingManager: THREE.LoadingManager;
  private gltfLoader: GLTFLoader;
  private textures: Map<string, THREE.Texture> = new Map();
  private models: Map<string, THREE.Group> = new Map();

  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.gltfLoader.setDRACOLoader(dracoLoader);
  }

  /** Load all essential assets before the game starts */
  public async loadAll(): Promise<void> {
    const assets = [
      this.loadModel('player'),
      this.loadModel('tree'),
      this.loadTexture('ground_diffuse')
    ];
    await Promise.all(assets);
  }

  private async loadModel(name: string): Promise<void> {
    const url = resolveAssetPath(`models/${name}.glb`);
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => {
          this.models.set(name, gltf.scene);
          resolve();
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  private async loadTexture(name: string): Promise<void> {
    const url = resolveAssetPath(`textures/${name}.jpg`);
    const loader = new THREE.TextureLoader(this.loadingManager);
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture) => {
          this.textures.set(name, texture);
          resolve();
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  public getModel(name: string): THREE.Group | undefined {
    return this.models.get(name);
  }

  public getTexture(name: string): THREE.Texture | undefined {
    return this.textures.get(name);
  }
}
