import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken'); 
    
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/loginadmin']);
      return false;
    }
  }
}
