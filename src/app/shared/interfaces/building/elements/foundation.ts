import { Point2D } from "./point2d";
import { StructuralElement } from "./structural";

export interface Foundation extends StructuralElement {
  type:
    | "Strip"
    | "Pad"
    | "Raft";
  vertices: Point2D[];
  thickness: number;
}