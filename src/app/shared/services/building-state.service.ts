import { Injectable } from '@angular/core';

import { Building } from '../interfaces/cad/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingStateService {

  building: Building = {
    floors: []
  };

}