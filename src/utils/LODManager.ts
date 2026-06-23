import * as THREE from 'three';

/** Simple LOD manager that switches geometry based on distance */
export class LODManager {
  private camera: THREE.Camera;
  private objects: Array<{ mesh: THREE.Mesh; distances: number[]; geometries: THREE.BufferGeometry[] }> = [];

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  public add(mesh: THREE.Mesh, geometries: THREE.BufferGeometry[], distances: number[]): void {
    this.objects.push({ mesh, geometries, distances });
  }

  public update(): void {
    const camPos = new THREE.Vector3();
    this.camera.getWorldPosition(camPos);
    for (const obj of this.objects) {
      const dist = camPos.distanceTo(obj.mesh.position);
      let level = 0;
      for (let i = 0; i < obj.distances.length; i++) {
        if (dist > obj.distances[i]) level = i + 1;
      }
      const geometry = obj.geometries[Math.min(level, obj.geometries.length - 1)];
      obj.mesh.geometry = geometry;
    }
  }
}
