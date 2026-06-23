import * as THREE from 'three';

/** Simple pool to reuse audio objects */
export class SoundPool {
  private listener: THREE.AudioListener;
  private pool: Map<string, THREE.PositionalAudio[]> = new Map();

  constructor(listener: THREE.AudioListener) {
    this.listener = listener;
  }

  public async play(name: string, url: string): Promise<void> {
    const audio = this.getAudio(name);
    const loader = new THREE.AudioLoader();
    const buffer = await new Promise<THREE.AudioBuffer>((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
    audio.setBuffer(buffer);
    audio.setVolume(1);
    audio.play();
  }

  private getAudio(name: string): THREE.PositionalAudio {
    const list = this.pool.get(name) ?? [];
    if (list.length > 0) {
      return list.pop()!;
    }
    const audio = new THREE.PositionalAudio(this.listener);
    return audio;
  }
}
