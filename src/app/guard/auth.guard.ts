import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router=inject(Router)
  const isAuthenticate=inject(AuthService).isLoggedIn;
  console.log(isAuthenticate);
  if(!isAuthenticate) router.navigate(['/login']);
  return isAuthenticate;

  
};
