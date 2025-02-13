import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Thêm thuộc tính standalone: true
  imports: [ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  message: string = '';
  messageMail: string = '';

  constructor(private fb: FormBuilder, private router: Router) { 
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  // Kiểm tra email hợp lệ
  checkEmailValid(): void {
    const emailControl = this.form.get('email');
    if (emailControl && emailControl.invalid && emailControl.touched) {
      this.messageMail = "Invalid email. Please check again.";
    } else {
      this.messageMail = '';
    }
  }

  // Xử lý đăng nhập
  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      // Kiểm tra thông tin đăng nhập
      if (email === 'admin@gmail.com' && password === '123456') {
        localStorage.setItem('authToken', 'yourToken');
        this.form.reset();

        this.router.navigate(['./admin/dashboard']);  
       
      } else {
        this.message = 'Email or password is incorrect!';
      }
    } else {
      this.message = 'Please enter correct email and password!';
    }
  }

  ngOnChanges() {
    this.checkEmailValid();
  }
}
