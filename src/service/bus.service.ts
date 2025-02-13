import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../app/admin/listbus/bus.model'; 

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = `https://localhost:44311/api/Buses`;  // URL API của bạn

  constructor(private http: HttpClient) {}

  getBuses(page: number, query: string): Observable<any> {
    const params = { page: page.toString(), query: query };
    return this.http.get<any>(this.apiUrl, { params });
  }

  getBus(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }

  postBus(bus: FormData): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  putBus(id: number, bus: FormData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, bus);
  }

  deleteBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchBuses(searchQuery: string): Observable<any> {
    const params = { searchQuery: searchQuery  };
    console.log('Searching with query:', searchQuery); 
    return this.http.get<any>(`https://localhost:44311/api/Buses/search`, { params });
  }
  
}
