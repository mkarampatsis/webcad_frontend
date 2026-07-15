import { Elements } from "./elements";
import { Level } from "./levels";
import { Load } from "./loads";
import { Material } from "./material";
import { Project } from "./project";
import { Section } from "./serctions";
import { BuildingSettings } from "./settings";
import { Support } from "./supports";

export interface Building {
  project: Project;
  materials: Material[];
  sections: Section[];
  levels: Level[];
  elements: Elements;
  loads: Load[];
  supports: Support[];
  settings: BuildingSettings;
}