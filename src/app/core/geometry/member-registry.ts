import { GeometryContext } from 'src/app/shared/interfaces/building/geomentry-context';

export class MemberRegistry {
  
  constructor(
    private context: GeometryContext
  ) {}

  create(nodeI: number, nodeJ: number, sectionId: number) {
    const id = this.context!.nextMemberId++;

    this.context!.members[id] = {
      node_i: nodeI,
      node_j: nodeJ,
      section_id: sectionId,
    };
    return id;
  }
}
