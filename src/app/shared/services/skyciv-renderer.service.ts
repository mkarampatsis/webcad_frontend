import { Injectable } from '@angular/core';

export interface SkycivViewerOptions {
  container: string;          // CSS selector
  autoRender?: boolean;       // optional auto-render
}

@Injectable({ providedIn: 'root' })
export class SkycivRendererService {

  setModel(viewer: any, model: any) {
    viewer.model.set(model);
    viewer.model.buildStructure();
  }

  clearModel(viewer: any) {
    viewer.model.set({ nodes: {}, members: {}, sections: {} });
    viewer.model.buildStructure();
    viewer.render();
  }

  render(viewer: any) {
    viewer.render();
  }

  resize(viewer: any) {
    if (viewer?.renderer) {
      viewer.renderer.resize();
    }
  }

  fitView(viewer: any) {
    viewer.camera.fit();
  }

  resetCamera(viewer: any) {
    viewer.camera.reset();
  }

  toggleWireframe(viewer: any) {
    viewer.settings.render_wireframe = !viewer.settings.render_wireframe;
    viewer.render();
  }

  rebuildStructure(viewer: any) {
    viewer.model.buildStructure();
    viewer.render();
  }

  // -------------------------------------------------------
  // SAVE MODEL → JSON FILE
  // -------------------------------------------------------
  saveModel(viewer: any) {
    const model = viewer.model.get();
    const json = JSON.stringify(model, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'skyciv-model.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  // -------------------------------------------------------
  // LOAD MODEL FROM JSON STRING
  // -------------------------------------------------------
  loadModel(viewer: any, jsonString: string) {
    if (!viewer) {
      console.error('SkyCiv viewer is not initialized');
      return;
    }

    try {
      const model = JSON.parse(jsonString);
      
      viewer.model.set(model);
      viewer.model.buildStructure();
      viewer.render();

    } catch (err) {
      console.error('Invalid JSON model:', err);
    }
  }

}