import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../app/admin/listuser/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44311/api/UserDTO';

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, limit: number = 4): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string, page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?query=${query}&page=${page}&limit=${limit}`);
  }

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.apiUrl, user);
  }

  updateUser(id: number, user: UserDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCurrentUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/current`);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${email}`);
  }

}
