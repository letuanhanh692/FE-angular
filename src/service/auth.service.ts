import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable để theo dõi trạng thái đăng nhập

  constructor(private http: HttpClient, private router: Router) {}

  /** 🟢 Kiểm tra token có tồn tại không */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /** 🟢 Gửi yêu cầu đăng nhập */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.isLoggedInSubject.next(true); // ✅ Cập nhật trạng thái đăng nhập
      })
    );
  }


  /** 🟢 Lưu token vào localStorage */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /** 🟢 Lấy token từ localStorage */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** 🟢 Lấy `userId` từ token */
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      console.log("Không tìm thấy token!");
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Token decoded:", decodedToken);
      return decodedToken?.userId || null;
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  }

  /** 🟢 Kiểm tra trạng thái đăng nhập */
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  /** 🟢 Đăng xuất */
  logout(): void {
    localStorage.removeItem('token');

    // 🔹 Cập nhật trạng thái đăng xuất
    this.isLoggedInSubject.next(false);

    // 🔹 Điều hướng về trang đăng nhập
    this.router.navigate(['/src/app/user/searchtrip']);
  }
}
