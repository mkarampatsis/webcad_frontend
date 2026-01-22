import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject, effect, computed, signal, } from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

import { ImportFileService } from '../../../shared/services/import-file.service';
import { STLLoader, OBJLoader } from 'three-stdlib';
import { loaderResource } from "angular-three";

import DxfParser from 'dxf-parser';
import type { ILineEntity, ILwpolylineEntity  } from 'dxf-parser';

// import { Cube } from "../cube/cube";
import { NgtsCameraControls } from "angular-three-soba/controls";
import { gltfResource } from "angular-three-soba/loaders";
import { NgtsCenter, NgtsEnvironment } from "angular-three-soba/staging";
import { NgtsGrid } from 'angular-three-soba/abstractions';

// import snowyVillage from "../../../../assets/files/Snowy-Village.glb" with { loader: "file" };

extend(THREE);

@Component({
  selector: 'app-scene-graph',
  imports: [NgtArgs, NgtsCameraControls, NgtsEnvironment, NgtsCenter, NgtsGrid],
  templateUrl: './scene-graph.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
  
  importFileService = inject(ImportFileService);

  dxfGroup = signal<THREE.Group | null>(null);
  protected planeWidth = signal(10.5);
  protected planeHeight = signal(10.5);
  protected cellSize = signal(0.6);
  protected cellThickness = signal(1);
  protected cellColor = signal('#6f6f6f');
  protected sectionSize = signal(3.3);
  protected sectionThickness = signal(1.5);
  protected sectionColor = signal('#9d4b4b');
  protected fadeDistance = signal(25);
  protected fadeStrength = signal(1);
  protected followCamera = signal(false);
  protected infiniteGrid = signal(true);

  // GLB URL signal
  glbUrl = computed(() => {
    const cad = this.importFileService.cadFileSignal();
    return cad?.type === 'glb' ? cad.url : null;
  });

  // STL URL signal
  stlUrl = loaderResource(
    () => STLLoader,
    () => {
      const cad = this.importFileService.cadFileSignal();
      return cad?.type === 'stl'? cad.url : '';
    }
  );

  // OBJ URL signal
  objUrl = loaderResource(
    () => OBJLoader,
    () => {
      const cad = this.importFileService.cadFileSignal();
      return cad?.type === 'obj'? cad.url : ''
    }
  );
    
  // protected readonly Math = Math;
  protected gltf2 = gltfResource(() => 'assets/files/Snowy-Village.glb');
  gltf = gltfResource(() => this.glbUrl() || '');

  object: THREE.Object3D | null = null;

  constructor() {
    effect(async () => {
      const cadFile = this.importFileService.cadFileSignal();

      if (!cadFile) return;

      if (cadFile.type === 'dxf') {
        // this.object = await this.dxfLoader.loadDxf(cadFile.file);
        this.loadDxf(cadFile.file);
      }

      if (cadFile.type === 'glb' || cadFile.type ==='stl' || cadFile.type ==='obj') {
        console.log("file", cadFile.url)
        this.object = null;
      }
    });
  }

  private async loadDxf(file: File) {
    const text = await file.text();
    const parser = new DxfParser();
    const dxf = parser.parseSync(text);

    if (!dxf?.entities?.length) {
      console.warn('Invalid or empty DXF');
      this.dxfGroup.set(null);
      return;
    }

    const group = new THREE.Group();

    for (const entity of dxf.entities) {

      switch (entity.type) {

        case 'LINE': {
          const line = entity as ILineEntity;
          if (line.vertices?.length >= 2) {
            group.add(this.createLine(line));
          }
          break;
        }

        case 'LWPOLYLINE': {
          const poly = entity as ILwpolylineEntity;

          // 🔑 CLOSED → WALL or SLAB
          if (poly.shape) {
            const kind = this.classifyPolyline(poly);

            const obj =
              kind === 'wall'
                ? this.createWallFromPolyline(poly)
                : this.createSlabFromPolyline(poly);

            if (obj) group.add(obj);
          }
          // 🔹 OPEN → fallback to wireframe
          else {
            group.add(this.createPolyline(poly));
          }
          break;
        }
      }
    }

    // 🔑 Center + scale once, after everything is added
    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 10 / maxDim || 1;

    group.scale.setScalar(scale);
    box.getCenter(group.position).multiplyScalar(-1);

    this.dxfGroup.set(group);
  }


  private createLine(entity: ILineEntity): THREE.Line {
    const points = entity.vertices.map((v: any) =>
      new THREE.Vector3(v.x, v.y, v.z ?? 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x111111 })
    );
  }

  private createPolyline(entity: ILwpolylineEntity): THREE.Line {
    const points = entity.vertices.map(v =>
      new THREE.Vector3(v.x, v.y, v.z ?? 0)
    );

    // Check if polyline is closed
    const isClosed = !!entity.shape; // <-- important fix
    if (isClosed && points.length > 2) {
      points.push(points[0].clone());
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x2563eb })
    );
  }

  private polylineToShape(entity: ILwpolylineEntity): THREE.Shape | null {
    if (!entity.vertices || entity.vertices.length < 3) return null;

    if (!entity.shape) return null; // must be closed

    const shape = new THREE.Shape();

    entity.vertices.forEach((v, i) => {
      const x = v.x;
      const y = v.y;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });

    shape.closePath();
    return shape;
  }

  private createWallFromPolyline(
    entity: ILwpolylineEntity
  ): THREE.Mesh | null {

    const shape = this.polylineToShape(entity);
    if (!shape) return null;

    const wallHeight = 3;      // meters
    const wallThickness = 0.2;

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: wallHeight,
      bevelEnabled: false,
    });

    geometry.rotateX(Math.PI / 2); // DXF → Three.js

    const material = new THREE.MeshStandardMaterial({
      color: 0xbababa,
    });

    const wall = new THREE.Mesh(geometry, material);
    wall.userData = {
      type: 'wall',
      source: 'LWPOLYLINE',
    };

    return wall;
  }

  private createSlabFromPolyline(
    entity: ILwpolylineEntity
  ): THREE.Mesh | null {

    const shape = this.polylineToShape(entity);
    if (!shape) return null;

    const slabThickness = 0.25;

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: slabThickness,
      bevelEnabled: false,
    });

    geometry.rotateX(Math.PI / 2);

    const slab = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: 0x999999 })
    );

    slab.userData = {
      type: 'slab',
    };

    return slab;
  }

  private classifyPolyline(entity: ILwpolylineEntity): 'wall' | 'slab' {
    const elevation = entity.elevation ?? 0;
    return elevation < 0.5 ? 'slab' : 'wall';
  }

}