// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IdentityService } from '../identity/identity.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(IdentityService);
  const router = inject(Router);

  // Check for token
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigateByUrl('/account/login');
  return false;
};
