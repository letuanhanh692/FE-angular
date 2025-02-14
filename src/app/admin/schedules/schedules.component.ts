import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../service/schedule.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Schedule } from './schedules.model';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,RouterModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit {
  
  schedules: Schedule[] = [];  
  loading: boolean = false;
  errorMessage: string = '';
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    this.loading = true;
    this.scheduleService.getSchedules(this.currentPage, this.searchQuery)
      .subscribe(
        (response: any) => {
          this.schedules = response.schedules;
          this.totalPages = response.totalPages; 
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'An error occurred while loading data.';
          this.loading = false;
        }
      );
  }

  searchSchedules(): void {
    this.currentPage = 1;  
    this.scheduleService.searchSchedules(this.searchQuery, this.currentPage)
      .subscribe(
        (response: any) => {
          this.schedules = response.schedules; 
          this.totalPages = response.totalPages; 
        },
        (error) => {
          this.errorMessage = 'An error occurred while searching.';  
        }
      );
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadSchedules();
  }

  detailSchedule(id: number) {
    this.router.navigate([`/admin/schedulesdetail/${id}`]);
  }

  updateSchedule(id: number) {
    this.router.navigate([`/admin/editschedules/${id}`]);
  }

  deleteSchedule(id: number) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.scheduleService.deleteSchedule(id)
        .subscribe(
          () => {
            this.loadSchedules(); 
          },
          (error) => {
            this.errorMessage = 'An error occurred while deleting the schedule.';
          }
        );
    }
  }
}