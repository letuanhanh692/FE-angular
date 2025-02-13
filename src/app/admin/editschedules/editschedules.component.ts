import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../service/schedule.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bus, Route } from '../schedules/schedules.model';

@Component({
  selector: 'app-editschedules',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './editschedules.component.html',
  styleUrl: './editschedules.component.css'
})
export class EditschedulesComponent implements OnInit {
  
  schedule = { id :0, busId: 0, routeId: 0, departureTime: '', arrivalTime: '', date: '' };
  buses: Bus[] = [];
  routes: Route[] = [];
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private scheduleService: ScheduleService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    const scheduleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (scheduleId) {
      this.loadSchedule(Number(scheduleId)); // Chuyển đổi id thành kiểu number
    }

    // Lấy danh sách buses
    this.http.get<any>('https://localhost:44311/api/Buses').subscribe(
      (response) => {
        console.log('Buses:', response.buses);  // Kiểm tra dữ liệu trả về
        this.buses = response.buses;  // Lấy mảng buses từ response
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách buses';
      }
    );

    // Lấy danh sách routes
    this.http.get<any>('https://localhost:44311/api/Routes').subscribe(
      (response) => {
        console.log('Routes:', response);  // Kiểm tra dữ liệu trả về
        this.routes = response;  // Giả sử Routes trả về là mảng
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách routes';
      }
    );
  }

  loadSchedule(id: number) {
    this.http.get<any>(`https://localhost:44311/api/Schedules/${id}`).subscribe(
      (response) => {
        this.schedule = response; 
      },
      (error) => {
        this.errorMessage = 'Không thể tải dữ liệu lịch trình';
      }
    );
  }

  onSubmit(): void {
    this.http.put<any>(`https://localhost:44311/api/Schedules/${this.schedule.id}`, this.schedule).subscribe(
      (response) => {
        alert('Lịch trình đã được cập nhật thành công!');
        this.router.navigate(['/schedules']);
      },
      (error) => {
        this.errorMessage = 'Có lỗi xảy ra khi cập nhật lịch trình';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/schedules']);
  }
}