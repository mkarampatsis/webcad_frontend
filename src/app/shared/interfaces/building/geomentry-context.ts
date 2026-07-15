export interface GeometryContext {
  nextNodeId: number;
  nextMemberId: number;
  nextPlateId: number;
  nodes: Record<number, any>;
  members: Record<number, any>;
  plates: Record<number, any>;
}