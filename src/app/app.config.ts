import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEl from '@angular/common/locales/el';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgtRenderer } from 'angular-three/dom';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptorService } from './shared/services/auth-interceptor';

registerLocaleData(localeEl, 'el-GR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgtRenderer(),
    provideHttpClient(withInterceptorsFromDi()),
    // Added the interceptor in last step for jwt
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'el-GR' },

  ],
};
