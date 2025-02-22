import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../service/booking.service';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderListComponent implements OnInit {
  bookings: any[] = [];
  userId!: number; // Sử dụng dấu "!" để báo rằng biến sẽ được gán sau

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId'); // ✅ Lấy userId từ localStorage
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.loadBookings();
    } else {
      console.warn('Người dùng chưa đăng nhập hoặc không tìm thấy userId.');
      this.bookings = []; // Đảm bảo không bị lỗi khi không có đơn hàng
    }
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Dữ liệu đơn hàng:', data);
        this.bookings = data;
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Không tìm thấy đơn hàng cho userId:', this.userId);
          this.bookings = []; // Hiển thị giao diện trống khi không có đơn hàng
        } else {
          console.error('Lỗi khi lấy đơn hàng:', err);
        }
      }
    });
  }
  
}
