import { Component, signal } from '@angular/core';
import { NgtCanvas } from "angular-three/dom";
import { SceneGraph } from './components/scene-graph/scene-graph';

@Component({
  selector: 'app-root',
  imports: [NgtCanvas, SceneGraph],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-cad-v.1');
}
