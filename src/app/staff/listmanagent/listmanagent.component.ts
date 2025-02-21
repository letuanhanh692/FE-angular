import { Component, OnInit } from '@angular/core';
import { AuthStaffService } from '../../../service/authstaff.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listmanagent',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,RouterModule,ReactiveFormsModule],
  templateUrl: './listmanagent.component.html',
  styleUrl: './listmanagent.component.css'
})
export class ListmanagentComponent implements OnInit {
  staffRoutes: any[] = [];
  errorMessage: string = '';
  expandedRouteId: number | null = null; 
  expandedScheduleId: number | null = null; 

  currentPage: number = 1;
  pageSize: number = 2; 
  constructor(private authstaffService: AuthStaffService, private router: Router) {}

  ngOnInit(): void {
    this.authstaffService.getStaffRoutes().subscribe(
      (response) => {
        if (response && response.staffRoutes) {
          this.staffRoutes = response.staffRoutes;
        }
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin chuyến xe. Vui lòng thử lại.';
        console.error('Error while retrieving trip data:', error);
      }
    );
  }

  get paginatedRoutes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.staffRoutes.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.staffRoutes.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToSchedules(routeId: number | undefined) {
    if (!routeId) {
      console.error('Error: invalid routeId', routeId);
      return;
    }
    this.router.navigate(['staff/schedules', routeId]);
  }
}
