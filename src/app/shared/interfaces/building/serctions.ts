export interface Section {
  id: string;
  name: string;
  shape:
    | "Rectangular"
    | "Circular"
    | "I"
    | "H"
    | "Tube"
    | "Custom";
  width?: number;
  height?: number;
  diameter?: number;
}