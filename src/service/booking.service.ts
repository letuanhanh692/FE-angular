import { BookingDTO } from '../app/admin/listbooking/bookingdto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {  
  private apiUrl  = 'https://localhost:44311/api/Bookings'; 

  constructor(private http: HttpClient) {}

  createBooking(bookingId: number, bookingData: any): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/create/${bookingId}`, bookingData);
  }

 // Trong service
getBookings(pageNumber: number, searchQuery: string): Observable<BookingDTO[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('searchQuery', searchQuery);
  
    return this.http.get<BookingDTO[]>(this.apiUrl, { params });
  }
  
  getBookingById(bookingId: number): Observable<BookingDTO> {  
    return this.http.get<BookingDTO>(`${this.apiUrl}/${bookingId}`);
  }

  updateBooking(bookingId: number, status: string): Observable<any> {  
    return this.http.put<any>(`${this.apiUrl}/${bookingId}/status`, { status });
  }

  deleteBooking(bookingId: number): Observable<any> { 
    return this.http.delete<any>(`${this.apiUrl}/${bookingId}`);
  }

  // Tìm kiếm booking
  searchBookings(searchQuery: string, pageNumber: number = 1, pageSize: number = 4): Observable<any> {
    let params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }
}
