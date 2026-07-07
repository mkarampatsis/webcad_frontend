import { Injectable } from '@angular/core';

declare var SKYCIV: any;

@Injectable({ providedIn: 'root' })
export class SkyCivInitializationService {

  private ready = false;
  private readyPromise: Promise<void> | null = null;

  /** Ensures SKYCIV global script is loaded before use */
  waitUntilReady(): Promise<void> {
    if (this.ready) return Promise.resolve();

    if (!this.readyPromise) {
      this.readyPromise = new Promise(resolve => {
        const interval = setInterval(() => {
          if (typeof SKYCIV !== 'undefined') {
            clearInterval(interval);
            this.ready = true;
            resolve();
          }
        }, 50);
      });
    }

    return this.readyPromise;
  }


  /** Creates a viewer only when SKYCIV is ready */
  async createViewer(options: { container: string; autoRender?: boolean }): Promise<any> {
    await this.waitUntilReady();

    const viewer = new SKYCIV.renderer({
      container_selector: options.container,
    });

    if (options.autoRender) viewer.render();

    return viewer;
  }
}
