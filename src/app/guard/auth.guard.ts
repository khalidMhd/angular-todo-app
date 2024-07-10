import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const obj = authService.getLoginUser();
  const length = Object.keys(obj).length;
  if (length > 0) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
