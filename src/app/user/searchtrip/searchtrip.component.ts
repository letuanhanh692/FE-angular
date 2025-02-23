import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../service/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchtrip',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './searchtrip.component.html',
  styleUrls: ['./searchtrip.component.css']
})
export class SearchtripComponent implements OnInit {
  searchForm: FormGroup;
  minDate: string = ''; // ✅ Khai báo minDate

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      startingPlace: ['', Validators.required],
      destinationPlace: ['', Validators.required],
      departureDateTime: ['']
    });
  }

  ngOnInit(): void {
    // ✅ Đặt minDate thành ngày hiện tại theo định dạng YYYY-MM-DD
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  // Hàm chuẩn hóa dữ liệu: bỏ dấu, chữ thường và bỏ khoảng trắng thừa
  normalizeText(text: string): string {
    return text.normalize('NFD') // Tách dấu
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Thay đ -> d
      .replace(/\s+/g, ' ') // Bỏ khoảng trắng thừa
      .trim()
      .toLowerCase(); // Chữ thường
  }

  // Xử lý khi nhấn nút tìm kiếm
  onSubmit() {
    if (this.searchForm.valid) {
      const searchData = {
        startingPlace: this.normalizeText(this.searchForm.value.startingPlace),
        destinationPlace: this.normalizeText(this.searchForm.value.destinationPlace),
        departureDateTime: this.searchForm.value.departureDateTime
      };

      this.tripService.searchTrips(searchData).subscribe(
        (response: any[]) => {
          const currentTime = new Date();

          // Lọc các chuyến có thời gian khởi hành từ hiện tại trở đi
          const filteredTrips = response.filter(trip => {
            const tripDepartureTime = new Date(trip.departureDateTime);
            return tripDepartureTime >= currentTime;
          });

          // Điều hướng đến trang danh sách chuyến đi với dữ liệu đã lọc
          this.router.navigate(['user/triplist'], {
            queryParams: searchData,
            state: { trips: filteredTrips }
          });
        },
        (error) => {
          console.error('Error fetching trips', error);
        }
      );
    }
  }
}
