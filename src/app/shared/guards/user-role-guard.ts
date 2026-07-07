import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IRoles } from '../interfaces/user';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRoles: IRoles[] | undefined = authService.user()?.roles;
  const hasPermission = userRoles?.some((r: IRoles) => r.role==="READER" && r.active )
  console.log('adminRoleGuard: userRoles', userRoles);
  console.log('adminRoleGuard: hasPermission', hasPermission);
  if (authService.user() && hasPermission) {
    return true;
  }
  return router.navigate(['/restricted-content']);
};