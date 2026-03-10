import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRoles: String[] | undefined = authService.user()?.roles;
  const hasPermission = userRoles?.some((r: String) => r==="user" )

  if (authService.user() && hasPermission) {
    return true;
  }
  return router.navigate(['/restricted-content']);
};
