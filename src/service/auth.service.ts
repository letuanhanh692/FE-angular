import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Kiểm tra token trước khi decode để tránh lỗi
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      console.log("Không tìm thấy token!"); // 🔍 Debug
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Token decoded:", decodedToken); // 🔍 Kiểm tra token chứa gì
      return decodedToken?.userId || null;
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
