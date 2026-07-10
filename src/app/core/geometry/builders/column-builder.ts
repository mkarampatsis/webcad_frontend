import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { Column } from 'src/app/shared/interfaces/building/elements/column';

export class ColumnBuilder {
   
  constructor(
    private nodeRegistry: NodeRegistry,
    private memberRegistry: MemberRegistry
  ) {}

  build(column: Column) {
    const nodeI = this.nodeRegistry.getOrCreate(column.base);
    const nodeJ = this.nodeRegistry.getOrCreate(column.top);

    this.memberRegistry.create(
      nodeI,
      nodeJ,
      1,
    );
  }
}
