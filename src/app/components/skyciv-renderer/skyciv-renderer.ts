import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-skyciv-renderer',
  imports: [],
  templateUrl: './skyciv-renderer.html',
  styleUrl: './skyciv-renderer.css',
})
export class SkycivRenderer implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    this.loadSkyCivScript();
  }
  
  loadSkyCivScript() {
    const script = document.createElement('script');
    script.src = 'https://skyciv.com'; // Base renderer path
    script.onload = () => this.initializeRenderer();
    document.body.appendChild(script);
  }

  initializeRenderer() {
    // Define your structural geometry, nodes, and members here
    const modelData = {
      nodes: {
        1: { x: 0, y: 0, z: 0 },
        2: { x: 10, y: 0, z: 0 },
      },
      members: {
        1: { n1: 1, n2: 2, section: 'W12x26' },
      },
    };

    // Render the structure to the canvas
    const canvas = document.getElementById('skyciv-canvas') as HTMLCanvasElement;
    if (window.SKYCIV && canvas) {
      // Assuming rendering integration
      window.SKYCIV.renderer.renderModel(modelData, canvas);
    }
  }
}
