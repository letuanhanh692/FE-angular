import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthStaffService {

  private apiUrl = 'http://localhost:44311/api/Auth';   

  constructor(private http: HttpClient) {}


loginStaff(email: string, password: string): Observable<any> {
  return this.http.post<any>(`https://localhost:44311/api/Auth/login-staff`, { email, password });
}

getStaffRoutes(): Observable<any> {
  const userId = localStorage.getItem('userId');  // Lấy userId từ localStorage
  if (userId) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any>(`https://localhost:44311/api/Auth/get-staff-routes?userId=${userId}`);
  } else {
    return new Observable();  // Trả về observable rỗng nếu không có userId
  }
}
}


