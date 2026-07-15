import { Beam } from "./elements/beam";
import { Column } from "./elements/column";
import { Foundation } from "./elements/foundation";
import { Opening } from "./elements/opening";
import { Roof } from "./elements/roof";
import { Slab } from "./elements/slab";
import { Stair } from "./elements/stair";
import { Wall } from "./elements/wall";

export interface Elements {
  columns: Column[];
  beams: Beam[];
  walls: Wall[];
  slabs: Slab[];
  roofs: Roof[];
  foundations: Foundation[];
  openings: Opening[];
  stairs: Stair[];
}