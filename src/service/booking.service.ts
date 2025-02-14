import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDTO } from '../app/admin/listbooking/bookingdto.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:44311/api/Bookings';

  constructor(private http: HttpClient) {}

  getBookings(page: number = 1, pageSize: number = 4): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  getBookingById(bookingId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookingId}`);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingData);
  }

  updateBooking(bookingId: number, bookingData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookingId}`, bookingData);
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookingId}`);
  }

  searchBookings(searchQuery: string, page: number = 1, pageSize: number = 4): Observable<any> {
    let params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`https://localhost:44311/api/Bookings/search`, { params });
  }
}
