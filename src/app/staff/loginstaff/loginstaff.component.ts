import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStaffService } from '../../../service/authstaff.service';

@Component({
  selector: 'app-loginstaff',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,RouterModule,ReactiveFormsModule],
  templateUrl: './loginstaff.component.html',
  styleUrl: './loginstaff.component.css'
})
export class LoginstaffComponent {
  email: string = '';
  password: string = '';
  errorMessage:   { email?: string, password?: string, general?: string } = {};

  constructor(private authstaffService: AuthStaffService, private router: Router) {}
 checkEmailValid() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!this.email.match(emailPattern)) {
    this.errorMessage.email = 'Invalid email address.';
  } else {
    this.errorMessage.email = '';
  }
}

login() {
  this.errorMessage = {};  

  if (!this.email || !this.password) {
    this.errorMessage.general = 'Please enter complete information.';
    return;
  }

  this.authstaffService.loginStaff(this.email, this.password).subscribe(
    (response) => {
      if (response && response.userId) {
        localStorage.setItem('userId', response.userId);
        
        this.authstaffService.getStaffRoutes().subscribe(
          (routes) => {
            console.log('Dữ liệu chuyến xe:', routes);
            this.router.navigate(['staff/listmanagent']);
          },
          (error) => {
            console.error('Error when retrieving trip information:', error);
            this.errorMessage.general = 'Không thể tải thông tin chuyến xe. Vui lòng thử lại.';
          }
        );
      } else {
        this.errorMessage.general = 'Login failed. Please check again..';
      }
    },
    (error) => {
      console.error('Lỗi đăng nhập:', error);
      this.errorMessage.general = 'Invalid login information. Please try again.';
    }
  );
}
}