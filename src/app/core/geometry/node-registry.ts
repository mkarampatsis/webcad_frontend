import { Point3D } from 'src/app/shared/interfaces/building/elements/point3d';
import { GeometryContext } from 'src/app/shared/interfaces/building/geomentry-context';

export class NodeRegistry {
  private nodeMap = new Map<string, number>();

  constructor(private context: GeometryContext) {}

  getOrCreate(point: Point3D): number {
    const key = `${point.x}_${point.y}_${point.z}`;
    const existing = this.nodeMap.get(key);

    if (existing !== undefined) {
      return existing;
    }

    const id = this.context!.nextNodeId++;

    this.context!.nodes[id] = {
      x: point.x,
      y: point.y,
      z: point.z,
    };

    this.nodeMap.set(key, id);
    return id;
  }
}
