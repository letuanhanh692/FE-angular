import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,  // Đánh dấu component này là standalone
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  bookingData: any = {}; // Dữ liệu booking được nhận từ state
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra xem dữ liệu đã được truyền vào state chưa
    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation state:', navigation?.extras.state); // Kiểm tra dữ liệu trong state
    if (navigation?.extras.state) {
      this.bookingData = navigation.extras.state as any;
    } else {
      // Dùng history.state nếu không có dữ liệu trong navigation
      this.bookingData = history.state;
      if (!this.bookingData) {
        this.error = 'Không tìm thấy thông tin booking.';
      }
    }
  }
  goBack(): void {
    this.router.navigate(['/user/tripdetail', this.bookingData.scheduleId], {
      state: this.bookingData
    });
  }

}
