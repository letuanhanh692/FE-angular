import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [ReactiveFormsModule,FormsModule,CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  message: string = '';
  messageMail: string = '';

  private apiUrl = 'https://localhost:44311/api/Auth/login-admin';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient
  ) { 
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)   
      ])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  checkEmailValid(): void {
    const emailControl = this.form.get('email');
    if (emailControl && emailControl.invalid && emailControl.touched) {
      this.messageMail = "Invalid email. Please check again.";
    } else {
      this.messageMail = '';
    }
  }
  

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(this.apiUrl, { email, password }, { headers }).subscribe(
        (res: any) => {
          if (res.token) {
            localStorage.setItem('authToken', res.token);
            this.form.reset();
            this.router.navigate(['./admin/dashboard']);
          } else {
            this.message = 'Login failed!';
          }
        },
        (err) => {
          this.message = 'Incorrect email or password!';
        }
      );
    } else {
      this.message = 'Please enter correct email and password!';
    }

    
  }
}
