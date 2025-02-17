import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RouteDTO {
  id: number;
  startingPlace: string;
  destinationPlace: string;
  distance: number;
  priceRoute: number;
  staffId: number;
  staffName: string;
  staffEmail: string;
}

interface User {
  id: number;
  name: string;
  roleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'https://localhost:44311/api/Route'; 

  constructor(private http: HttpClient) {}

  // Hàm lấy danh sách route có phân trang
  getRoutes(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });  
  }

  searchRoutes(searchQuery: string, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchQuery', searchQuery);

    return this.http.get<any>(`https://localhost:44311/api/Route/search`, { params });  
  }

  getRoute(id: number): Observable<RouteDTO> {
    return this.http.get<RouteDTO>(`${this.apiUrl}/${id}`);
  }
  
  createRoute(route: RouteDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, route);
  }

  updateRoute(id: number, route: RouteDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, route);
  }

  // Hàm xoá route theo id
  deleteRoute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
