import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.authStatus).pipe(
    filter(status => status !== 'checking'),
    take(1),
    map(status => {
      const user = authService.user();
      console.log('RoleGuard status:', status);
      console.log('RoleGuard user:', user);
      console.log('RoleGuard user roles:', user?.roles);
      if (status === 'authenticated') {
        if (user && user.roles.includes('admin')) {
          console.log('RoleGuard: Access granted');
          return true;
        }
      }
      
      console.log('RoleGuard: Access denied, redirecting to /');
      router.navigateByUrl('/');
      return false;
    })
  );
};
