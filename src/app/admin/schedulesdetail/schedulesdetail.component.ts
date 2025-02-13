import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ScheduleService } from '../../../service/schedule.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedulesdetail',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './schedulesdetail.component.html',
  styleUrl: './schedulesdetail.component.css'
})
export class SchedulesdetailComponent  implements OnInit {
  schedule: any = {};
  buses: any[] = [];
  routes: any[] = [];
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,  
    private router: Router,                 
    private scheduleService: ScheduleService
  ) {}
 
  ngOnInit(): void {
    const scheduleId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    
    if (scheduleId) {
      this.getScheduleDetails(scheduleId);
    }
    
    this.getBuses();
    this.getRoutes();
  }

  getScheduleDetails(id: number): void {
    this.scheduleService.getScheduleDetails(id).subscribe(
      (data) => {
        this.schedule = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching schedule details';
      }
    );
  }

  getBuses(): void {
    this.scheduleService.getSchedules(1, '').subscribe(
      (data) => {
        this.buses = data.buses;  // Giả sử API trả về dữ liệu buses
      },
      (error) => {
        this.errorMessage = 'Error fetching bus list';
      }
    );
  }

  getRoutes(): void {
    this.scheduleService.getSchedules(1, '').subscribe(
      (data) => {
        this.routes = data.routes;  // Giả sử API trả về dữ liệu routes
      },
      (error) => {
        this.errorMessage = 'Error fetching route list';
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/schedules']);
  }
}