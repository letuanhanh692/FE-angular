import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../service/trip.service';
import { BookingService } from '../../../service/booking.service';
import { AuthService } from '../../../service/auth.service';
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
  loggedInUserEmail: string = ''; // ✅ Lưu email người đang đăng nhập

  customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]], // ✅ Chỉ kiểm tra rỗng và định dạng email
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

    // ✅ Lấy email người dùng đang đăng nhập
    this.loggedInUserEmail = this.authService.getUserEmail() || '';
  }

  bookTrip(): void {
    if (this.customerForm.invalid) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục.');
      localStorage.setItem('redirectAfterLogin', this.tripId.toString());
      this.router.navigate(['/user/loginuser']);
      return;
    }

    const bookingData = {
      userId,
      scheduleId: this.tripId,
      ...this.customerForm.value
    };
    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/user/confirmation'], { state: response });
      },
      (error) => {
        alert('Có lỗi xảy ra khi đặt vé. Vui lòng thử lại.');
        console.error(error);
      }
    );
  }
}
