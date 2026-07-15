import { Point2D } from "./point2d";
import { StructuralElement } from "./structural";

export interface Roof extends StructuralElement {
  type:
    | "Flat"
    | "Gable"
    | "Hip"
    | "Shed"
    | "Custom";
  vertices: Point2D[];
  height: number;
}