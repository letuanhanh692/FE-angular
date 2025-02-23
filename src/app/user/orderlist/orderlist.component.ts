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
  filteredBookings: any[] = [];
  selectedStatus: string = 'All'; // Mặc định hiển thị tất cả
  userId!: number;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.loadBookings();
    } else {
      console.warn('Người dùng chưa đăng nhập hoặc không tìm thấy userId.');
      this.bookings = [];
      this.filteredBookings = [];
    }
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (data) => {
        this.bookings = data;
        this.filterBookings(this.selectedStatus); // Áp dụng lọc ngay sau khi tải
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Không tìm thấy đơn hàng cho userId:', this.userId);
          this.bookings = [];
          this.filteredBookings = [];
        } else {
          console.error('Lỗi khi lấy đơn hàng:', err);
        }
      }
    });
  }

  filterBookings(status: string): void {
    this.selectedStatus = status;
    if (status === 'All') {
      this.filteredBookings = this.bookings;
    } else {
      this.filteredBookings = this.bookings.filter(booking => booking.status === status);
    }
  }
}
