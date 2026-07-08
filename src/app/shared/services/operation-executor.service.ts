import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { BuildingStateService } from './building-state.service';
import { Operation } from '../interfaces/cad/operation';
import { OperationType } from '../interfaces/cad/operation-type';

@Injectable({
  providedIn: 'root',
})
export class OperationExecutorService {
  buildingState = inject(BuildingStateService);

  execute(operations: Operation[]) {
    operations.forEach((op) => {
      switch (op.type) {
        case OperationType.ADD_FLOOR:
          this.addFloor(op.parameters);
          break;
      }
    });
  }

  private addFloor(parameters: any) {
    console.log('Adding floor with parameters:', parameters); 
    this.buildingState.building.floors.push({
      id: crypto.randomUUID(),
      elevation: parameters.elevation,
      width: parameters.width,
      length: parameters.length,
    });
  }
}
