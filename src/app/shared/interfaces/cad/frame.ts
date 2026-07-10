import { Beam } from "./beam";
import { Column } from "./column";

export interface Frame {
  id: string;
  columns: Column[];
  beams: Beam[];
}