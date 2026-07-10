export interface Load {
  id: string;
  name: string;
  type:
    | "Point"
    | "Line"
    | "Area"
    | "Dead"
    | "Live"
    | "Wind"
    | "Snow"
    | "Seismic";
  magnitude: number;
}