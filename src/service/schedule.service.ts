import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'https://localhost:44311/api/Schedules'; 

  constructor(private http: HttpClient) {}

  getSchedules(page: number, query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&query=${query}`);
  }

  getScheduleDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createSchedule(scheduleData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, scheduleData);
  }

  updateSchedule(id: number, scheduleData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, scheduleData);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchSchedules(searchQuery: string, page: number , pageSize: number ): Observable<any> {
    const params = new HttpParams()
      .set('searchQuery', searchQuery)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>('https://localhost:44311/api/Schedules/searchadmin', { params });
  }
  
  getSchedulesForToday(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/today`);
  }
}
