import { Point2D } from "./point2d";
import { StructuralElement } from "./structural";

export interface Wall extends StructuralElement {
  vertices: Point2D[];
  height: number;
  thickness: number;
}