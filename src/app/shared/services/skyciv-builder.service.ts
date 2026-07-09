import { Injectable } from '@angular/core';
import { Building } from '../interfaces/cad/building';

@Injectable({
  providedIn: 'root',
})
export class SkyCivBuilderService {
  build(building: Building): any {
    const model ={
      "settings": {
        "units": {
          "length": "m",
          "force": "kN",
          "moment": "kNm",
          "stress": "MPa",
          "density": "kg/m3"
        }
      },
      "nodes": {
        "1": {"x": 0, "y": 3, "z": 0},
        "2": {"x": 5, "y": 3, "z": 0},
        "3": {"x": 5, "y": 3, "z": 5},
        "4": {"x": 0, "y": 3, "z": 5}
      },
      "members": {
        "1": {"node_A": 1, "node_B": 2, "section_id": 1, "fixity_A": "FFFFFF", "fixity_B": "FFFFFF"},
        "2": {"node_A": 2, "node_B": 3, "section_id": 1, "fixity_A": "FFFFFF", "fixity_B": "FFFFFF"},
        "3": {"node_A": 3, "node_B": 4, "section_id": 1, "fixity_A": "FFFFFF", "fixity_B": "FFFFFF"},
        "4": {"node_A": 4, "node_B": 1, "section_id": 1, "fixity_A": "FFFFFF", "fixity_B": "FFFFFF"}
      },
      "plates": {
        "1": {
          "node_A": 1,
          "node_B": 2,
          "node_C": 3,
          "node_D": 4,
          "material_id": 1,
          "thickness": 200,
          "rotZ": 0,
          "type": "plate"
        }
      },
      "materials": {
        "1": {
          "name": "Concrete",
          "E": 30000,
          "poisson": 0.2,
          "density": 2500,
          "class": "concrete"
        }
      },
      "sections": {
        "1": {
          "name": "Concrete Beam",
          "area": 0.12,
          "iz": 0.0016,
          "iy": 0.0009,
          "j": 0.002,
          "material_id": 1
        }
      }
    }


    // We'll generate nodes and members here.
    return model;
  }
}
