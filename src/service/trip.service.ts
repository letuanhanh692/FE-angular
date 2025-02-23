import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://localhost:44311/api/Schedules';  // URL của API

  constructor(private http: HttpClient) {}

  searchTrips(searchData: any): Observable<any> {
    let params = new HttpParams()
      .set('startingPlace', searchData.startingPlace)
      .set('destinationPlace', searchData.destinationPlace);

    if (searchData.departureDateTime) {
      params = params.set('departureDateTime', searchData.departureDateTime);
    }

    return this.http.get<any>('https://localhost:44311/api/Schedules/search', { params });
  }
  getTripDetails(id: number) {
    return this.http.get(`https://localhost:44311/api/Schedules/${id}`);  
  }
  getTripForToday(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/today`);
  }
}
