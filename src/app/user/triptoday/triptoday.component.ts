import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ScheduleService } from './../../../service/schedule.service';

@Component({
  selector: 'app-triptoday',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './triptoday.component.html',
  styleUrls: ['./triptoday.component.css']
})
export class TripTodayComponent implements OnInit {
  trips: any[] = [];          // Danh sách tất cả chuyến đi trong ngày
  filteredTrips: any[] = [];  // Danh sách sau khi lọc
  errorMessage: string = '';

  searchFrom: string = ''; // Điểm đi
  searchTo: string = '';   // Điểm đến

  constructor(
    private scheduleService: ScheduleService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadTripsForToday();
  }

  // Load danh sách chuyến đi trong ngày
  loadTripsForToday(): void {
    this.scheduleService.getSchedulesForToday().subscribe({
      next: (data) => {
        console.log('🔍 API trả về:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.trips = data.map(trip => ({
            ...trip,
            id: trip.id ?? null
          }));

          this.filteredTrips = [...this.trips]; // Mặc định hiển thị toàn bộ chuyến đi
          console.log('✅ Danh sách chuyến đi đã xử lý:', this.filteredTrips);
        } else {
          this.trips = [];
          this.filteredTrips = [];
          this.errorMessage = 'Không có chuyến đi nào trong ngày hôm nay';
        }
      },
      error: (err) => {
        this.trips = [];
        this.filteredTrips = [];
        this.errorMessage = 'Lỗi khi tải dữ liệu chuyến đi';
        console.error(err);
      }
    });
  }

  // Tìm kiếm chuyến đi theo điểm đi và điểm đến
  searchTrips(): void {
    // Chuẩn hóa chuỗi nhập vào (loại bỏ khoảng trắng)
    const searchFrom = this.searchFrom.toLowerCase().replace(/\s+/g, '');
    const searchTo = this.searchTo.toLowerCase().replace(/\s+/g, '');

    this.filteredTrips = this.trips.filter(trip =>
      trip.startingPlace.toLowerCase().replace(/\s+/g, '').includes(searchFrom) &&
      trip.destinationPlace.toLowerCase().replace(/\s+/g, '').includes(searchTo)
    );

    console.log('🔍 Kết quả tìm kiếm:', this.filteredTrips);

    // Kiểm tra nếu không có kết quả
    if (this.filteredTrips.length === 0) {
      this.errorMessage = 'Không có chuyến đi nào phù hợp!';
    } else {
      this.errorMessage = '';
    }
  }


  // Xem chi tiết chuyến đi
  viewTripDetail(tripId: number | undefined): void {
    console.log('🛑 Kiểm tra tripId:', tripId);

    if (!tripId || isNaN(tripId)) {
      console.error('❌ Lỗi: tripId không hợp lệ', tripId);
      alert('Không thể xem chi tiết chuyến đi này!');
      return;
    }
    this.route.navigate([`/user/tripdetail/${tripId}`]);
  }
}
