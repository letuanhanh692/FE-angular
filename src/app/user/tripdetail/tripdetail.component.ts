import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../service/trip.service';
import { BookingService } from '../../../service/booking.service';
import { AuthService } from '../../../service/auth.service';  // ✅ Thêm AuthService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tripdetail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tripdetail.component.html',
  styleUrls: ['./tripdetail.component.css']
})
export class TripdetailComponent implements OnInit {
  tripDetails: any = {};
  tripId: number = 0;
  price: number = 0;
  loading: boolean = false;
  error: string = '';

  customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private bookingService: BookingService,
    private authService: AuthService, // ✅ Inject AuthService
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      seatNumber: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.tripId = +params['id'];
        this.loading = true;
        return this.tripService.getTripDetails(this.tripId);
      })
    ).subscribe(
      (response) => {
        this.loading = false;
        this.tripDetails = response;
        this.price = this.tripDetails?.price || 0;
      },
      (error) => {
        this.loading = false;
        this.error = 'Không thể tải thông tin chuyến đi.';
      }
    );
  }
  // day them
  // duong them

  // ✅ Cập nhật hàm đặt vé để tự động lấy userId
  bookTrip(): void {
    if (this.customerForm.invalid) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const userId = this.authService.getUserId(); // ✅ Lấy userId từ token
    if (!userId) {
      alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để đặt vé.');
      this.router.navigate(['/user/loginuser']);
      return;
    }

    const bookingData = {
      userId,  // ✅ Thêm userId vào bookingData
      scheduleId: this.tripId,
      ...this.customerForm.value
    };

    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        this.router.navigate(['/user/confirmation'], { state: response });
      },
      (error) => {
        alert('Có lỗi xảy ra khi tạo booking');
        console.error(error);
      }
    );
  }
}
