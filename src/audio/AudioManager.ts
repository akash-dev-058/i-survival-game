import * as THREE from 'three';
import { SoundPool } from '@/audio/SoundPool';

/** Central audio manager handling background music and SFX */
export class AudioManager {
  private listener: THREE.AudioListener;
  private music: THREE.Audio;
  private sfxPool: SoundPool;

  constructor(camera: THREE.Camera) {
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);
    this.music = new THREE.Audio(this.listener);
    this.sfxPool = new SoundPool(this.listener);
  }

  public async loadMusic(url: string): Promise<void> {
    const loader = new THREE.AudioLoader();
    const buffer = await new Promise<THREE.AudioBuffer>((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
    this.music.setBuffer(buffer);
    this.music.setLoop(true);
    this.music.setVolume(0.5);
    this.music.play();
  }

  public playSFX(name: string, url: string): void {
    this.sfxPool.play(name, url);
  }
}
