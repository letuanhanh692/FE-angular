import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


   export interface Cancellation {
    id:number;
    bookingId :number;
    cancellationId?: number;  
  startingPlace: string;
  destinationPlace: string;
  cancellationDate: string;
  refundAmount: number;
  name: string;
  age: number;
  email: string;
  seatNumber: number;
  bookingDate: string;
  totalAmount: number;
  status: string;
  busType: string;
  departTime: string;
  arrivalTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class CancellationService {
  private apiUrl = 'https://localhost:44311/api/Cancellations';

  constructor(private http: HttpClient) {}

  getAllCancellations(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<any>(this.apiUrl, { params });
  }

  getCancellationDetails(id: string): Observable<Cancellation> {
    return this.http.get<Cancellation>(`${this.apiUrl}/${id}`);
  }
  getCancellationById(id: number): Observable<Cancellation> {
    return this.http.get<Cancellation>(`${this.apiUrl}/${id}`);
  }
  addCancellation(cancellation: Cancellation): Observable<Cancellation> {
    return this.http.post<Cancellation>(this.apiUrl, cancellation);
  }

  updateCancellation(id: number, cancellation: Cancellation): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, cancellation, { headers });
  }
  
  

  deleteCancellation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
