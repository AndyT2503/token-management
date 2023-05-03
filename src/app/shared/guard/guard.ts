import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';

//Check whether user is authenticated or not. If not redirect to login page
export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(UserInfoService);
  const isAuthenticated = authService.getLoginStatus() === 'auth';
  if (!isAuthenticated) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }
};

//Check whether user can access to login page. If user is authenticated, then redirect to home page
export const nonAuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(UserInfoService);
  const isAuthenticated = authService.getLoginStatus() === 'auth';
  if (isAuthenticated) {
    return router.createUrlTree(['/']);
  } else {
    return true;
  }
};
