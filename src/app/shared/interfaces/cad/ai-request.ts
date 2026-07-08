import { Building } from "./building";

export interface AIRequest {
  prompt: string;
  building: Building;
}