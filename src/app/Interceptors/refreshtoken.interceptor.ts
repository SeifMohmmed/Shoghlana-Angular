import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { IdentityService } from '../identity/identity.service';

export function refreshTokenInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const identityService = inject(IdentityService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return identityService.refreshToken().pipe(
          switchMap((newToken: any) => {
            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(newRequest);
          }),
          catchError((err) => {
            return throwError(err);
          })
        );
      }
      return throwError(error);
    })
  );
}
