import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  constructor(private router: Router) {}

  continueBooking() {
    this.router.navigate(['/user/searchtrip']); // Điều hướng về trang tìm kiếm chuyến đi
  }
}
