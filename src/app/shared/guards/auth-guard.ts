import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user() && !authService.isTokenExpired()) {
    // console.log('AuthGuard: User is authenticated, access granted');
    return true;
  }

  // console.log('AuthGuard: User is not authenticated, access denied');
  return router.navigate(['/login']);
};