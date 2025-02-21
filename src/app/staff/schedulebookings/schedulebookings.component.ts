import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthStaffService } from '../../../service/authstaff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedulebookings',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './schedulebookings.component.html',
  styleUrl: './schedulebookings.component.css'
})
export class SchedulebookingsComponent implements OnInit {
  scheduleId: number | null = null;
  bookings: any[] = [];
  paginatedBookings: any[] = [];
  errorMessage: string = '';

  currentPage: number = 1;
  pageSize: number = 2;

  constructor(
    private route: ActivatedRoute,
    private authStaffService: AuthStaffService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.scheduleId = Number(params.get('scheduleId'));
      if (this.scheduleId) {
        this.loadBookings();
      } else {
        this.errorMessage = 'No valid scheduleId found.';
      }
    });
  }

  loadBookings(): void {
    this.authStaffService.getStaffRoutes().subscribe(
      (response) => {
        if (response && response.staffRoutes) {
          response.staffRoutes.forEach((route: any) => {
            route.schedules.forEach((schedule: any) => {
              if (schedule.scheduleId === this.scheduleId) {
                this.bookings = schedule.bookings;
              }
            });
          });

          if (this.bookings.length === 0) {
            this.errorMessage = 'There are no guests booked on this itinerary.';
          } else {
            this.updatePaginatedBookings();
          }
        }
      },
      (error) => {
        this.errorMessage = 'Error loading booking list.';
        console.error('Error retrieving booking data:', error);
      }
    );
  }

  updatePaginatedBookings(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedBookings = this.bookings.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBookings();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.bookings.length) {
      this.currentPage++;
      this.updatePaginatedBookings();
    }
  }
  goBack() {
    window.history.back();
  }
  
}
