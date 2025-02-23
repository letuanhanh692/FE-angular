import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Thêm dòng này

import { BookingDTO } from '../app/admin/listbooking/bookingdto.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:44311/api/Bookings';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getBookings(page: number = 1, pageSize: number = 4): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params, headers: this.getAuthHeaders() });
  }

  getBookingById(bookingId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookingId}`, { headers: this.getAuthHeaders() });
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingData, { headers: this.getAuthHeaders() });
  }

  updateBooking(bookingId: number, bookingData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookingId}`, bookingData, { headers: this.getAuthHeaders() });
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookingId}`, { headers: this.getAuthHeaders() });
  }

  searchBookings(searchQuery: string, page: number , pageSize: number ): Observable<any> {
    let params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`https://localhost:44311/api/Bookings/search`, { params, headers: this.getAuthHeaders() });
  }
  getBookingsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
