import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const notAuthActivateGuardTsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return toObservable(authService.authStatus).pipe(
    filter(status => status !== 'checking'),
    take(1),
    map(status => {
      if (status === 'authenticated') {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  );
};
