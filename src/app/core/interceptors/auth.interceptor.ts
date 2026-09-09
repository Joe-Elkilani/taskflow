import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth/auth';
import { catchError, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/me');

      if (error.status === 401 && !isAuthEndpoint) {
        auth.handleUnauthorized();
      }

      return throwError(() => error);
    }),
  );
};
