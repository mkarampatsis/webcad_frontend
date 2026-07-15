import { Point3D } from "./point3d";
import { StructuralElement } from "./structural";

export interface Beam extends StructuralElement {
  start: Point3D;
  end: Point3D;
  sectionId: string;
}