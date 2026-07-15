import { Injectable } from '@angular/core';
// import { Building } from '../interfaces/cad/building';
import { Building } from 'src/app/shared/interfaces/building/building';
import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { ColumnBuilder } from 'src/app/core/geometry/builders/column-builder';
import { BeamBuilder } from 'src/app/core/geometry/builders/beam-builder';
import { GeometryContext } from 'src/app/shared/interfaces/building/geomentry-context';

@Injectable({
  providedIn: 'root',
})
export class SkyCivBuilderService {
  
  build(building: Building): any {
    const context: GeometryContext = {
      nextNodeId: 1,
      nextMemberId: 1,
      nextPlateId: 1,
      nodes: {},
      members: {},
      plates: {}
    };

    const nodeRegistry = new NodeRegistry(context);
    const memberRegistry = new MemberRegistry(context);
    const columnBuilder = new ColumnBuilder(nodeRegistry, memberRegistry);
    const beamBuilder = new BeamBuilder(nodeRegistry, memberRegistry);

    for (const column of building.elements.columns) {
      columnBuilder.build(column);
    }

    for (const beam of building.elements.beams) {
      beamBuilder.build(beam);
    }

    return {
      nodes: context.nodes,
      members: context.members,
      sections: {},
    };
  }
}
