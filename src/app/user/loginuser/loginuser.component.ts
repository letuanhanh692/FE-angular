import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginuser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    console.log("Đang thực hiện đăng nhập...");
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.http.post<any>('https://localhost:44311/api/Auth/login', { email, password })
      .subscribe({
        next: (response) => {
          console.log("Phản hồi từ API:", response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/user/searchtrip']); // Chuyển hướng ngay, không cần hiển thị thông báo thành công
        },
        error: (err) => {
          console.error("Lỗi đăng nhập:", err);
          this.errorMessage = err.error?.message || 'Incorrect username or password !';
        }
      });
  }
}
