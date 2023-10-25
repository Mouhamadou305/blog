import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router); 

  if(authService.user){
    if(authService.user.role == "editor"){
      return true;
    }
  }
  
  router.navigate(["/articles"]);
  return false;
};
