import { Point3D } from "./elements/point3d";

export interface Support {
  id: string;
  location: Point3D;
  fixX: boolean;
  fixY: boolean;
  fixZ: boolean;
  fixRX: boolean;
  fixRY: boolean;
  fixRZ: boolean;
}