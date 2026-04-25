import { Component, computed, effect, inject, signal } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { SessionService } from 'src/app/shared/services/session.service ';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-than-cad',
  imports: [Sidebar],
  templateUrl: './than-cad.html',
  styleUrl: './than-cad.css',
})
export class ThanCad {
  private sanitizer = inject(DomSanitizer);
  sessionService = inject(SessionService);

  sessionUrl = this.sessionService.sessionUrl;

  // safeSessionUrl = computed(() => {
  //   const url = this.sessionUrl();  // string | null

  //   if (!url) return null; // <-- important
  //   console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // });

  safeSessionUrl = computed(() => {
    const url = this.sessionUrl();
    if (!url) return null;

    // queueMicrotask(() => {}); // forces change detection
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
