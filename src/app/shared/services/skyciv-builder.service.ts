import { Injectable } from '@angular/core';
import { Building } from '../interfaces/cad/building';

@Injectable({
  providedIn: 'root'
})
export class SkyCivBuilderService {

  build(building: Building): any {
    const skyciv = {
      nodes: {},
      members: {}
    };

    // We'll generate nodes and members here.
    return skyciv;
  }
}