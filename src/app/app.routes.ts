import { Routes } from '@angular/router';
import { adminRoleGuard } from './shared/guards/user-role-guard';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'cad-scene',
    loadChildren: () => import('./components/cad-scene/cad-scene.routes').then((m) => m.CadSceneRoutes),
  },
  {
    path: 'than-cad',
    loadChildren: () => import('./components/than-cad/than-cad.routes').then((m) => m.ThanCadRoutes),
    canActivate: [authGuard, adminRoleGuard],
  },
  {
    path: 'three-cad',
    loadChildren: () => import('./components/three-cad/three-cad.routes').then((m) => m.ThreeCadRoutes),
  },
  {
    path: 'landing',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
   {
    path: 'login',
    loadChildren: () => import('./components/login/login.routes').then((m) => m.LoginRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
  {
    path: 'restricted-content',
    loadChildren: () => import('./shared/components/restricted-content/restricted-content').then((m) => m.RestrictedContent),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
