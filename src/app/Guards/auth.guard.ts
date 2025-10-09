// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check for token
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigateByUrl('/account/login');
  return false;
};
