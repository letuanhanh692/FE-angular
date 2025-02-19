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

  constructor(private authstaffService: AuthStaffService,private router :Router) {}

  
  ngOnInit(): void {
    this.authstaffService.getStaffRoutes().subscribe(
      (response) => {
        if (response && response.staffRoutes) {
          this.staffRoutes = response.staffRoutes;
        }
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin chuyến xe. Vui lòng thử lại.';
        console.error('Lỗi khi lấy dữ liệu chuyến xe:', error);
      }
    );
  }
}