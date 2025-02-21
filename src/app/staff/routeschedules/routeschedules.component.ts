import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthStaffService } from '../../../service/authstaff.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routeschedules',
  standalone: true,
  imports: [HttpClientModule,FormsModule,RouterModule,CommonModule],
  templateUrl: './routeschedules.component.html',
  styleUrl: './routeschedules.component.css'
})
export class RouteschedulesComponent implements OnInit {
  routeId!: number;
  schedules: any[] = [];
  errorMessage: string = '';

  currentPage: number = 1;
  pageSize: number = 2;

  constructor(
    private route: ActivatedRoute,
    private authstaffService: AuthStaffService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeId = Number(params.get('routeId'));
      if (this.routeId) {
        this.loadSchedules();
      } else {
        this.errorMessage = 'Không tìm thấy routeId hợp lệ.';
      }
    });
  }

  loadSchedules(): void {
    this.authstaffService.getStaffRoutes().subscribe(
      (response) => {
        if (response && response.staffRoutes) {
          const route = response.staffRoutes.find((r: any) => r.routeId === this.routeId);
          if (route) {
            this.schedules = route.schedules;
          } else {
            this.errorMessage = 'Không tìm thấy lịch trình cho chuyến xe này.';
          }
        }
      },
      (error) => {
        this.errorMessage = 'Lỗi khi tải lịch trình.';
        console.error('Lỗi khi lấy dữ liệu lịch trình:', error);
      }
    );
  }
  
  goToBookings(scheduleId: number): void {
    this.router.navigate(['staff/schedules/bookings', scheduleId]);
  }

  get paginatedSchedules() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.schedules.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.schedules.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  goBack() {
    this.router.navigate(['staff/listmanagent', ]);
  }
  
}

