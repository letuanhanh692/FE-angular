import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';  // Import dịch vụ UserService

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService // Thêm service UserService vào constructor
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Thêm kiểm tra định dạng email
      password: ['', [Validators.required, Validators.minLength(6)]], // Đặt tối thiểu 6 ký tự
    });
  }

  onLogin() {
    console.log("Đang thực hiện đăng nhập...");

    // Nếu form không hợp lệ thì dừng lại và hiển thị lỗi
    if (this.loginForm.invalid) {
      this.errorMessage = "Vui lòng nhập đúng email và mật khẩu.";
      return;
    }

    const { email, password } = this.loginForm.value;

    this.http.post<any>('https://localhost:44311/api/Auth/login', { email, password })
      .subscribe({
        next: (response) => {
          console.log("Phản hồi từ API:", response);
          localStorage.setItem('token', response.token); // Lưu token

          const token = response.token;
          const decodedToken = this.decodeToken(token);
          const userId = decodedToken?.userId; // Lấy userId từ token

          if (userId) {
            localStorage.setItem('userId', userId); // ✅ Lưu userId vào localStorage

            this.userService.getUserById(userId).subscribe({
              next: (userInfo) => {
                console.log("Thông tin người dùng:", userInfo);
                localStorage.setItem('userInfor', JSON.stringify(userInfo)); // Lưu thông tin user
                this.router.navigate(['/user/searchtrip']); // Điều hướng đến trang tìm kiếm chuyến đi
              },
              error: (err) => {
                console.error("Lỗi khi lấy thông tin người dùng:", err);
                this.errorMessage = 'Không thể lấy thông tin người dùng.';
              }
            });
          } else {
            this.errorMessage = 'ID người dùng không hợp lệ.';
          }
        },
        error: (err) => {
          console.error("Lỗi đăng nhập:", err);
          this.errorMessage = err.error?.message || 'Tên đăng nhập hoặc mật khẩu không đúng!';
        }
      });
  }

  // Giải mã JWT để lấy thông tin từ token
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)); // Giải mã phần payload của token
    } catch (e) {
      console.error('Lỗi giải mã token:', e);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userInfor');
    this.router.navigate(['/login']); // Chuyển về trang đăng nhập
  }
}
