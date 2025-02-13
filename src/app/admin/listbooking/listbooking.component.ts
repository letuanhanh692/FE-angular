import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookingService,  } from '../../../service/booking.service';
@Component({
  selector: 'app-listbooking',
  standalone: true,
  imports: [RouterModule,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './listbooking.component.html',
  styleUrl: './listbooking.component.css'
})
export class ListbookingComponent implements OnInit {
  bookings: any[] = []; 
  searchQuery: string = ''; 
  loading: boolean = false; 
  errorMessage: string | null = null; 
  currentPage: number = 1; 
  totalPages: number = 0; 

  constructor(private bookingService : BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.errorMessage = null;
    this.bookingService.getBookings(this.currentPage, this.searchQuery)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.bookings = data.bookings;
          this.totalPages = data.totalPages;
          this.loading = false;
        },
        (error: any) => {
          this.errorMessage = 'Có lỗi khi tải dữ liệu.';
          this.loading = false;
        }
      );
  }

  // Hàm tìm kiếm đặt vé
  searchBookings(): void {
    this.currentPage = 1; 
    this.loadBookings();
  }

  // Hàm xử lý thay đổi trang
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBookings();
    }
  }

  // Hàm xem chi tiết đặt vé
  detailBooking(bookingId: number): void {
    this.router.navigate([`/admin/bookingdetail/${bookingId}`]);
  }

  // Hàm cập nhật đặt vé
  updateBooking(bookingId: number): void {
    this.router.navigate([`/admin/editbooking/${bookingId}`]);
  }

  // Hàm xóa đặt vé
  deleteBooking(bookingId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa đặt vé này?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        () => {
          this.loadBookings(); // Tải lại danh sách sau khi xóa
        },
        (error: any) => {
          this.errorMessage = 'Có lỗi khi xóa đặt vé.';
        }
      );
    }
  }
}
