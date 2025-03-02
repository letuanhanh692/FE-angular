import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../service/booking.service';
import { CancellationService } from '../../../service/cancelltion.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderListComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  selectedStatus: string = 'All';
  userId!: number;

  // ✅ Biến lưu thông báo
  message: string = '';
  isSuccess: boolean = true;

  constructor(
    private bookingService: BookingService,
    private cancellationService: CancellationService,
    private router: Router // ✅ Thêm Router vào constructor
  ) {}

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

  // ✅ Load danh sách booking
  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (data) => {
        this.bookings = data;
        this.filterBookings(this.selectedStatus);
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

  // ✅ Lọc đơn hàng theo trạng thái
  filterBookings(status: string): void {
    this.selectedStatus = status;
    this.filteredBookings = status === 'All'
      ? this.bookings
      : this.bookings.filter(booking => booking.status === status);
  }

  // ✅ Hủy vé
  cancelBooking(bookingId: number): void {
    if (confirm('Bạn có chắc chắn muốn hủy vé này không?')) {
      this.cancellationService.createCancellation(bookingId).subscribe({
        next: () => {
          this.showMessage('Hủy vé thành công!', true);
          this.loadBookings(); // Làm mới danh sách
        },
        error: (err) => {
          this.showMessage('Hủy vé thất bại!', false);
          console.error('Lỗi khi hủy vé:', err);
        }
      });
    }
  }

  // ✅ Hiển thị thông báo (sẽ tự tắt sau 3 giây)
  showMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => this.message = '', 3000); // Ẩn thông báo sau 3 giây
  }

  // ✅ Chuyển sang trang xác nhận nếu booking có trạng thái "Booked"
    // ✅ Chuyển sang trang xác nhận nếu booking có trạng thái "Booked" và chưa quá thời gian khởi hành
    continueBooking(booking: any): void {
      const currentTime = new Date(); // Thời gian hiện tại
      const departureTime = new Date(booking.departureTime); // Giả sử `departureTime` có trong booking

      if (booking.status !== 'Booked') {
        alert('Chỉ có thể tiếp tục với đơn hàng có trạng thái "Booked".');
        return;
      }

      if (departureTime < currentTime) {
        alert('Chuyến đi này đã khởi hành. Bạn không thể tiếp tục xác nhận.');
        return;
      }

      this.router.navigate(['/user/confirmation'], { state: booking });
    }

}
