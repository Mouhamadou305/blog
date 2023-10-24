import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let token = authService.getToken();
  if(token) {
    router.navigate(['/articles']);
    return false;
  }else{
    return true;
  }
};