import { Beam } from "./beam";
import { Frame } from "./frame";
import { Wall } from "./wall";

export interface Floor {
  id: string;
  elevation: number;
  // frame: Frame[];
  // beams: Beam[];
  // walls: Wall[];
  width: number;
  length: number;
}