import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]], // Chỉ chấp nhận số, tối thiểu 10 ký tự
      dateOfBirth: ['', [Validators.required]] // Thêm ngày sinh vào form
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Vui lòng điền đầy đủ và đúng thông tin!';
      return;
    }

    const url = 'https://localhost:44311/api/Auth/register';
    this.http.post(url, this.registerForm.value).subscribe({
      next: () => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/user/loginuser']);
      },
      error: (error: any) => {
        alert('Có lỗi xảy ra khi đăng ký!');
        console.error('Error:', error);
      }
    });
  }
}
