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
    path: 'skyciv-renderer',
    loadChildren: () => import('./components/skyciv-renderer/skyciv-renderer.routes').then((m) => m.SkycivRendererRoutes),
    // canActivate: [authGuard, adminRoleGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.routes').then((m) => m.LoginRoutes),
  },
  { path: 'about', 
    loadComponent: () => import('./components/about/about').then((m) => m.About),
  },
  {
    path: 'restricted-content',
    loadComponent: () => import('./shared/components/restricted-content/restricted-content').then((m) => m.RestrictedContent),
  },
  {
    path: 'landing',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
