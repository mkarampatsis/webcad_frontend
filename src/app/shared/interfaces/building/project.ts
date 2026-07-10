export interface Project {
  id: string;
  name: string;
  description?: string;
  units: "m" | "mm";
}