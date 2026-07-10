import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { Beam } from 'src/app/shared/interfaces/building/elements/beam';

export class BeamBuilder {
  constructor(
    private nodeRegistry: NodeRegistry,
    private memberRegistry: MemberRegistry
  ) {}

  build(beam: Beam) {
    const nodeI = this.nodeRegistry.getOrCreate(beam.start);
    const nodeJ = this.nodeRegistry.getOrCreate(beam.end);

    this.memberRegistry.create(
      nodeI,
      nodeJ,
      1,
    );
  }
}
