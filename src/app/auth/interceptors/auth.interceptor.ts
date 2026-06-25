import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.services';
import { inject } from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log('Auth Interceptor:', req.url);
    const authService = inject(AuthService);
    if (authService.token()) {
        console.log('Token encontrado, clonando request...');
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authService.token()}`
            }
        });
        return next(authReq);
    } else {
        return next(req);
    }
}