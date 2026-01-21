import { Injectable, signal } from '@angular/core';

export type CadFile =
  | { type: 'dxf'; file: File }
  | { type: 'glb'; url: string }
  | { type: 'stl'; url: string }
  | { type: 'obj'; url: string }
  | null;

@Injectable({
  providedIn: 'root',
})

export class ImportFileService {
  cadFileSignal = signal<CadFile>(null);
}
