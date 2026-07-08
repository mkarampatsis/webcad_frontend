import { Component, inject, AfterViewInit } from '@angular/core';
import { SkycivRendererService } from '../../shared/services/skyciv-renderer.service';
import { SkyCivInitializationService } from '../../shared/services/skyciv-initialization.service';
import { SkyCivModelNormalizerService } from '../../shared/services/skyciv-model-normalizer.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../../shared/services/agent.service';
import { BuildingStateService } from 'src/app/shared/services/building-state.service';
import { OperationExecutorService } from 'src/app/shared/services/operation-executor.service';
import { AIRequest } from 'src/app/shared/interfaces/cad/ai-request';

@Component({
  selector: 'app-skyciv-renderer',
  imports: [ReactiveFormsModule],
  templateUrl: './skyciv-renderer.html',
  styleUrl: './skyciv-renderer.css',
})
export class SkycivRenderer implements AfterViewInit {
  skycivRendererService = inject(SkycivRendererService);
  skyCivInitializationService = inject(SkyCivInitializationService);
  skyCivModelNormalizerService = inject(SkyCivModelNormalizerService);
  agentService = inject(AgentService);
  buildingStateService = inject(BuildingStateService);
  executorService = inject(OperationExecutorService);

  private viewer: any;
  private prompt: string = '';

  form = new FormGroup({
    chatAI: new FormControl(null),
  });

  async ngAfterViewInit(): Promise<void> {
    this.viewer = await this.skyCivInitializationService.createViewer({
      container: '#renderer-container',
      autoRender: false,
    });

    const rawModel = this.createModel();
    const normalized = this.skyCivModelNormalizerService.normalize(rawModel);

    this.skycivRendererService.setModel(this.viewer, normalized);
    this.skycivRendererService.render(this.viewer);
  }

  createModel() {
    const s3d_model = {
      nodes: {
        1: { x: 0, y: 0, z: 0 },
        2: { x: 0, y: 0, z: 3 },
        3: { x: 2, y: 0, z: 3 },
      },
      members: {
        1: { node_i: 1, node_j: 2, section_id: 1 },
        2: { node_i: 2, node_j: 3, section_id: 1 },
      },
      sections: {
        1: { type: 'rect', d: 0.2, b: 0.1 },
      },
    };

    return s3d_model;
  }

  onRender() {
    this.skycivRendererService.render(this.viewer);
  }

  onFitView() {
    this.skycivRendererService.fitView(this.viewer);
  }

  onResetCamera() {
    this.skycivRendererService.resetCamera(this.viewer);
  }

  onToggleWireframe() {
    const current = this.viewer.settings.render_wireframe;
    this.viewer.settings.render_wireframe = !current;
    this.skycivRendererService.render(this.viewer);
  }

  onRebuild() {
    this.skycivRendererService.rebuildStructure(this.viewer);
  }

  onSave() {
    this.skycivRendererService.saveModel(this.viewer);
  }

  onLoad(event: any) {
    if (!this.viewer) {
      console.error('Viewer not initialized yet');
      return;
    }

    const file = event.target.files[0];
    console.log('Selected file:', file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result as string;
      const rawModel = JSON.parse(json);

      const normalized = this.skyCivModelNormalizerService.normalize(rawModel);

      this.skycivRendererService.clearModel(this.viewer);
      // this.skycivRendererService.setModel(this.viewer, normalized);
      this.skycivRendererService.setModel(this.viewer, rawModel);
      this.skycivRendererService.render(this.viewer);
    };

    reader.readAsText(file);
  }

  send() {
    const request: AIRequest = {
      prompt: this.prompt,
      building: this.buildingStateService.building,
    };

    this.agentService.execute(request).subscribe({
      next: (response) => {
        this.executorService.execute(response.operations);

        console.log(this.buildingStateService.building);

        // Next step:
        // const model = this.skyCivBuilder.build(this.buildingState.building);
        // this.skyCivRenderer.loadModel(model);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
