import { Injectable, signal, TemplateRef, Type } from '@angular/core';

export interface Toast {
  template?: TemplateRef<any>; // for template-based toasts
  component?: Type<any>; // for component-based toasts
  inputs?: Record<string, any>; // inputs for the component
  classname?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
	readonly toasts = this._toasts.asReadonly();

	show(toast: Toast) {
		this._toasts.update((toasts) => [...toasts, toast]);
	}

	remove(toast: Toast) {
		this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
	}

	clear() {
		this._toasts.set([]);
	}  
}
