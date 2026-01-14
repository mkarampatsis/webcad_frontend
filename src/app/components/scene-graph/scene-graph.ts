import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  viewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { extend, beforeRender } from 'angular-three';
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

@Component({
  selector: 'app-scene-graph',
  templateUrl: './scene-graph.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
  private meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

  constructor() {
    extend({ Mesh, BoxGeometry, MeshBasicMaterial });

    beforeRender(({ delta }) => {
      const mesh = this.meshRef().nativeElement;
      mesh.rotation.x += delta;
      mesh.rotation.y += delta;
    });
  }
}