import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('userId');  // Hoặc sử dụng sessionStorage tùy vào cách lưu trữ của bạn

    if (token) {
      return true;
    } else {
      this.router.navigate(['/loginstaff']);
      return false;
    }
  }
}
