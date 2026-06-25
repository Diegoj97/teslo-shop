import { Routes } from '@angular/router';
import { notAuthActivateGuardTsGuard } from './auth/guards/not-auth-activate-guard.ts-guard';
import { roleGuard } from './auth/guards/not-admin-activate-guard/role.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canActivate: [notAuthActivateGuardTsGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin.routes'),
        canActivate: [roleGuard]
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front-routes')
    }
];
