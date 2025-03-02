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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]],
      dateOfBirth: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],  // ✅ Thêm trường địa chỉ
    });

  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in complete and correct information!';
      return;
    }

    console.log("Dữ liệu gửi đi:", JSON.stringify(this.registerForm.value));

    const url = 'https://localhost:44311/api/Auth/register';
    this.http.post(url, this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/user/loginuser']);
      },
      error: (error: any) => {
        console.error('Lỗi phản hồi:', error);
        if (error.error && error.error.errors) {
          console.error('Lỗi validation:', error.error.errors);
        }
        alert('An error occurred while registering! Check the console for details.');
      }
    });
  }


}
