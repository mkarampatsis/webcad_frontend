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

import { 
    GoogleLoginProvider, 
    SocialAuthServiceConfig,
    SOCIAL_AUTH_CONFIG,
    SocialLoginModule
  } from '@abacritt/angularx-social-login';
import { GoogleClientId } from './shared/config';

registerLocaleData(localeEl, 'el-GR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgtRenderer(),
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GoogleClientId),
          }
        ],
        onError: (err: any) => {
          console.log(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: LOCALE_ID, useValue: 'el-GR' },

  ],
};
