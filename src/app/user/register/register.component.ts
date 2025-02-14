import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const url = 'https://localhost:44311/api/Auth/register'; // Thay đổi URL API của bạn
    this.http.post(url, this.model)
      .subscribe({
        next: (response: any) => {
          alert('Đăng ký thành công!');
          this.router.navigate(['/user/loginuser']); // Chuyển hướng sang trang đăng nhập
        },
        error: (error: any) => {
          alert('Có lỗi xảy ra khi đăng ký!');
          console.error('Error:', error);
        }
      });
  }
}
