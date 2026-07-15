import { Point3D } from "./point3d";
import { StructuralElement } from "./structural";

export interface Column extends StructuralElement {
  base: Point3D;
  top: Point3D;
  sectionId: string;
}