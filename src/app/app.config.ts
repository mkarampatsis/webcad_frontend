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

import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleClientId } from './shared/config';

registerLocaleData(localeEl, 'el-GR');
const socialProviders = [];

 socialProviders.push({
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(GoogleClientId),
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgtRenderer(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: socialProviders,
        onError: (err: any) => {
          console.log(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: LOCALE_ID, useValue: 'el-GR' },

  ],
};
