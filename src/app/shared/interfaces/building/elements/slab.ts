import { Point2D } from "./point2d";
import { StructuralElement } from "./structural";

export interface Slab extends StructuralElement {
  vertices: Point2D[];
  thickness: number;
}