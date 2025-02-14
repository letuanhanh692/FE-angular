import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../service/trip.service';  // Sử dụng TripService thay vì SchedulesService

@Component({
  selector: 'app-searchtrip',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],  // Thêm các module cần thiết tại đây
  templateUrl: './searchtrip.component.html',
  styleUrls: ['./searchtrip.component.css']
})
export class SearchtripComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,  // Thay thế SchedulesService bằng TripService
    private router: Router
  ) {
    // Khởi tạo form tìm kiếm với các trường cần thiết
    this.searchForm = this.fb.group({
      startingPlace: ['', Validators.required],
      destinationPlace: ['', Validators.required],
      departureDateTime: ['']
    });
  }

  // Xử lý sự kiện khi người dùng nhấn nút tìm kiếm
  onSubmit() {
    if (this.searchForm.valid) {
      const searchData = this.searchForm.value;
      this.tripService.searchTrips(searchData).subscribe(
        (response) => {
          // Chuyển sang trang danh sách chuyến đi sau khi tìm kiếm
          this.router.navigate(['user/triplist'], { queryParams: searchData });
        },
        (error) => {
          console.error('Error fetching trips', error);
        }
      );
    }
  }
}
