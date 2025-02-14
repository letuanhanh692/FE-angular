import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editbooking',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css'
})
export class EditbookingComponent implements OnInit {
  booking = {
    id: 0,
    userId: 0,
    scheduleId: 0,
    name: '',
    age: 0,
    phone: '',
    email: '',
    status:'',
    seatNumber: 0
  };

  usersList: any[] = [];  
  schedulesList: any[] = []; 

  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lấy danh sách người dùng và lịch trình
    this.loadUsers();
    this.loadSchedules();

    // Lấy ID từ URL để lấy thông tin đặt chỗ cần chỉnh sửa
    const bookingId = this.activatedRoute.snapshot.paramMap.get('id');
    if (bookingId) {
      this.loadBookingData(bookingId);
    }
  }

  // Lấy danh sách người dùng
  loadUsers() {
    this.http.get<any>('https://localhost:44311/api/UserDTO').subscribe(
      (response) => {
        this.usersList = response;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách người dùng';
      }
    );
  }

  // Lấy danh sách lịch trình
  loadSchedules() {
    this.http.get<any>('https://localhost:44311/api/Schedules').subscribe(
      (response) => {
        this.schedulesList = response.schedules;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách lịch trình';
      }
    );
  }

  // Lấy thông tin đặt chỗ cần chỉnh sửa
  loadBookingData(id: string) {
    this.http.get<any>(`https://localhost:44311/api/Bookings/${id}`).subscribe(
      (response) => {
        this.booking = response;  // Gán thông tin đặt chỗ vào form
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin đặt chỗ';
      }
    );
  }

  // Xử lý khi người dùng nhấn nút Save hoặc Update
  onSubmit() {
    if (this.isValid()) {
      this.http.put<any>(`https://localhost:44311/api/Bookings/${this.booking.id}`, this.booking).subscribe(
        (response) => {
          alert('Cập nhật đặt chỗ thành công!');
          this.router.navigate(['/admin/listbooking']);  // Điều hướng về danh sách đặt chỗ
        },
        (error) => {
          this.errorMessage = 'Có lỗi xảy ra khi cập nhật đặt chỗ';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
    }
  }

  onCancel() {
    this.router.navigate(['/admin/listbooking']);  // Quay lại trang danh sách đặt chỗ
  }

  private isValid() {
    return this.booking.userId > 0 && this.booking.scheduleId > 0 && this.booking.name && this.booking.age > 0;
  }
}
