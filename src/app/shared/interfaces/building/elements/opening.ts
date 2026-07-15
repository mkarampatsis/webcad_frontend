import { Point2D } from "./point2d";
import { StructuralElement } from "./structural";

export interface Opening extends StructuralElement {
  wallId: string;
  position: Point2D;
  width: number;
  height: number;
}