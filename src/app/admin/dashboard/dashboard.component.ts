import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersList: any[] = [];
  schedulesList: any[] = [];
  busesList: any[] = [];
  errorMessage: string = '';
  
  totalUsers: number = 0;
  totalSchedules: number = 0;
  totalBuses : number = 0;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:44311/api/UserDTO?page=0&limit=0').subscribe(
      (response) => {
        this.totalUsers = response.length; 
        this.usersList = response;  
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );

    this.http.get<any>('https://localhost:44311/api/Schedules?page=0&pageSize=0').subscribe(
      (response) => {
        this.totalSchedules = response.totalSchedules; 
        this.schedulesList = response.schedules;  
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách lịch trình';
      }
    );

    this.http.get<any>('https://localhost:44311/api/Buses?page=0&pageSize=0').subscribe(
      (response) => {
        this.totalBuses = response.buses.length;  // Lấy số lượng xe từ mảng buses
    this.busesList = response.buses;  // Lưu danh sách xe vào busesList
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );
    
  }
}
