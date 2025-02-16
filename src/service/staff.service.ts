import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('authToken');
    const roleId = localStorage.getItem('roleId');
    const email = localStorage.getItem('email');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = email && emailRegex.test(email);

    if (authToken && roleId === '2' && isEmailValid) {
      return true;
    } else {
  
      this.router.navigate(['/loginstaff']);
      return false;
    }
  }
}
