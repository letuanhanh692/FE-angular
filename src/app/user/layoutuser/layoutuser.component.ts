import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service'; // Import AuthService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layoutuser',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layoutuser.component.html',
  styleUrl: './layoutuser.component.css'
})
export class LayoutuserComponent {
  isLoggedIn$: Observable<boolean>; // Lưu trạng thái đăng nhập dưới dạng Observable

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Lắng nghe trạng thái đăng nhập
  }

  logout() {
    this.authService.logout(); // Gọi hàm logout
  }
}
