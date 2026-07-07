import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SkyCivModelNormalizerService {

  normalize(model: any): any {
    if (!model) return model;

    // Renderer-format passthrough
    const hasOnlyRendererKeys =
      model.nodes &&
      model.members &&
      model.sections &&
      Object.keys(model).every(k =>
        ['nodes', 'members', 'sections'].includes(k)
      );

    if (hasOnlyRendererKeys) return model;

    // S3D → Renderer
    const normalized: any = {
      nodes: model.nodes ?? {},
      members: {},
      sections: {},
      materials: model.materials ?? {},
      settings: {
        ...model.settings,
        vertical_axis: "Z"   // force renderer axis
      }
    };

    // MEMBERS
    for (const id of Object.keys(model.members ?? {})) {
      const m = model.members[id];

      normalized.members[id] = {
        node_i: m.node_i ?? m.node_A,
        node_j: m.node_j ?? m.node_B,
        section_id: m.section_id ?? 1,
        type: m.type ?? "normal"
      };
    }

    // SECTIONS (CHS + fallback)
    for (const id of Object.keys(model.sections ?? {})) {
      const s = model.sections[id];

      if (s.load_section && Array.isArray(s.load_section)) {
        const name = s.load_section[3];

        if (name.includes("CHS")) {
          const [diamStr, thickStr] = name.replace(" CHS", "").split("x");

          normalized.sections[id] = {
            type: "circ",
            D: parseFloat(diamStr) / 1000,
            t: parseFloat(thickStr) / 1000
          };

          continue;
        }
      }

      normalized.sections[id] = {
        type: s.type ?? "rect",
        d: s.d ?? 0.2,
        b: s.b ?? 0.1
      };
    }

    return normalized;
  }

  // /** Normalize ANY SkyCiv model into renderer‑compatible format */
  // normalize(model: any): any {
  //   if (!model) return model;

  //   const normalized = { ...model };

  //   this.normalizeMembers(normalized);
  //   this.normalizeSections(normalized);
  //   this.normalizeMaterials(normalized);
  //   this.normalizeSupports(normalized);
  //   this.normalizeLoads(normalized);

  //   return normalized;
  // }

  // /** Convert node_A/node_B → node_i/node_j */
  // private normalizeMembers(model: any) {
  //   if (!model.members) return;

  //   for (const id of Object.keys(model.members)) {
  //     const m = model.members[id];

  //     if (m.node_A !== undefined) {
  //       m.node_i = m.node_A;
  //       delete m.node_A;
  //     }

  //     if (m.node_B !== undefined) {
  //       m.node_j = m.node_B;
  //       delete m.node_B;
  //     }

  //     // SkyCiv solver uses "type", renderer expects "type" or nothing
  //     if (!m.type) {
  //       m.type = 'normal';
  //     }
  //   }
  // }

  // /** Ensure sections are renderer‑compatible */
  // private normalizeSections(model: any) {
  //   if (!model.sections) return;

  //   for (const id of Object.keys(model.sections)) {
  //     const s = model.sections[id];

  //     // Convert load_section → type + dimensions (renderer requires geometry)
  //     if (s.load_section && Array.isArray(s.load_section)) {
  //       s.type = 'rect';
  //       s.d = 0.2;
  //       s.b = 0.1;
  //     }

  //     // Ensure section_id exists in members
  //     for (const mid of Object.keys(model.members || {})) {
  //       const m = model.members[mid];
  //       if (!m.section_id) m.section_id = Number(id);
  //     }
  //   }
  // }

  // /** Ensure materials exist and are valid */
  // private normalizeMaterials(model: any) {
  //   if (!model.materials) return;

  //   for (const id of Object.keys(model.materials)) {
  //     const mat = model.materials[id];

  //     // Renderer expects density, elasticity_modulus, etc.
  //     mat.elasticity_modulus ??= 200000;
  //     mat.poissons_ratio ??= 0.3;
  //     mat.yield_strength ??= 250;
  //   }
  // }

  // /** Convert supports to renderer format */
  // private normalizeSupports(model: any) {
  //   if (!model.supports) return;

  //   for (const id of Object.keys(model.supports)) {
  //     const s = model.supports[id];

  //     // Convert restraint_code → fixity
  //     if (s.restraint_code) {
  //       s.fixity = s.restraint_code;
  //     }

  //     // Renderer expects node index
  //     if (s.node !== undefined) {
  //       s.node = Number(s.node);
  //     }
  //   }
  // }

  // /** Normalize loads (point, distributed, etc.) */
  // private normalizeLoads(model: any) {
  //   if (model.point_loads) {
  //     for (const id of Object.keys(model.point_loads)) {
  //       const pl = model.point_loads[id];
  //       pl.x_mag ??= 0;
  //       pl.y_mag ??= 0;
  //       pl.z_mag ??= 0;
  //     }
  //   }

  //   if (model.distributed_loads) {
  //     for (const id of Object.keys(model.distributed_loads)) {
  //       const dl = model.distributed_loads[id];
  //       dl.axes ??= 'global';
  //     }
  //   }
  // }
}
