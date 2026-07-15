export interface Material {
  id: string;
  name: string;
  type: "Steel" | "Concrete" | "Wood" | "Aluminum" | "Custom";
  elasticModulus?: number;
  poissonRatio?: number;
  density?: number;
  yieldStrength?: number;
}